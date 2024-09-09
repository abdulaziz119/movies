import {pgPoolQuery, StatisticsModel} from '..';

export class StatisticsRepository {

    static async checkSeriesCreate(params: { type: string }): Promise<any> {
        const now = new Date();
        const month = now.toISOString().slice(0, 7);

        const checkSql = `
        SELECT * FROM statistics
        WHERE month = $1 AND type = $2;
    `;
        const checkValues = [month, params.type];

        try {
            const checkResult = await pgPoolQuery(checkSql, checkValues);

            if (checkResult.rows.length > 0) {
                return checkResult.rows[0];
            }

            const insertSql = `
            INSERT INTO statistics (month, type)
            VALUES ($1, $2)
            RETURNING *;
        `;
            const insertValues = [month, params.type];
            const insertResult = await pgPoolQuery(insertSql, insertValues);

            return insertResult.rows[0];
        } catch (error) {
            console.error('Error inserting statistics:', error);
            throw new Error('Failed to create statistics');
        }
    }

    static async IncrementWatchedCount(): Promise<StatisticsModel | null> {
        const sql = `
            UPDATE statistics
            SET watched = watched + 1, updated_at = CURRENT_TIMESTAMP
            WHERE id = (
                SELECT id FROM statistics
                ORDER BY created_at DESC
                LIMIT 1
            )
            RETURNING *;
        `;

        try {
            const result = await pgPoolQuery(sql);

            if (result.rows.length === 0) {
                return null;
            }

            return result.rows[0];
        } catch (error) {
            console.error('Error updating record:', error);
            throw new Error('Error updating record');
        }
    }

    static async getOne(id: number): Promise<StatisticsModel | null> {
        const sql = `SELECT * FROM statistics WHERE id = $1 AND deleted_at IS NULL;`;

        try {
            const result = await pgPoolQuery(sql, [id]);

            if (result.rows.length === 0) {
                return null;
            }

            return result.rows[0];
        } catch (error) {
            console.error('Error fetching record:', error);
            throw new Error('Error fetching record');
        }
    }

    static async getAll(params: { limit: number, page: number }): Promise<StatisticsModel[]> {
        if (params.limit <= 0 || params.page <= 0) {
            throw new Error('Invalid pagination parameters');
        }

        const sql = `
        SELECT *
        FROM statistics
        ORDER BY created_at DESC
        LIMIT $1 OFFSET $2
    `;

        const offset: number = (params.page - 1) * params.limit;

        try {
            const result = await pgPoolQuery(sql, [params.limit, offset]);
            return result.rows as StatisticsModel[];
        } catch (error) {
            console.error(`Error fetching statistics: ${error instanceof Error ? error.message : 'Unknown error'}`);
            throw new Error(`Error fetching statistics: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }

    static async delete(id: number): Promise<void> {
        const sql: string = `UPDATE statistics
                             SET deleted_at = NOW()
                             WHERE id = $1
                               AND deleted_at IS NULL`;
        try {
            await pgPoolQuery(sql, [id]);
        } catch (error) {
            console.error('Error deleting roles:', error);
            throw new Error('Failed to delete roles');
        }
    }
}