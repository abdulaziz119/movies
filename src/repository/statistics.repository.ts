import {pgPoolQuery, StatisticsModel} from '..';

export class StatisticsRepository {
    static async findLatestByMonthAndType(month: string, type: string): Promise<any> {
        const selectSql = `
            SELECT id
            FROM statistics
            WHERE month = $1 AND type = $2
            ORDER BY created_at DESC
            LIMIT 1;
        `;
        try {
            const result = await pgPoolQuery(selectSql, [month, type]);
            return result.rows.length > 0 ? result.rows[0] : null;
        } catch (error) {
            console.error('Error finding latest statistics by month and type:', error);
            throw new Error('Error finding latest statistics by month and type');
        }
    }

    static async createStatistics(month: string, type: string): Promise<StatisticsModel> {
        const insertSql = `
            INSERT INTO statistics (month, type, watched)
            VALUES ($1, $2, 1)
            RETURNING *;
        `;
        try {
            const result = await pgPoolQuery(insertSql, [month, type]);
            return result.rows[0];
        } catch (error) {
            console.error('Error creating statistics:', error);
            throw new Error('Error creating statistics');
        }
    }

    static async incrementWatchedCount(id: number): Promise<StatisticsModel> {
        const updateSql = `
            UPDATE statistics
            SET watched = watched + 1,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $1
            RETURNING *;
        `;
        try {
            const result = await pgPoolQuery(updateSql, [id]);
            return result.rows[0];
        } catch (error) {
            console.error('Error updating watched count:', error);
            throw new Error('Error updating watched count');
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