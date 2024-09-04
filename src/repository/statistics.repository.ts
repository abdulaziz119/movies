import {pgPoolQuery, StatisticsModel} from '..';

export class StatisticsRepository {

    static async checkSeriesCreate(params: { type: string }): Promise<StatisticsModel | null> {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.toISOString().slice(0, 10);
        const day = now.getDate();

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
                INSERT INTO statistics (month, type, year, day)
                VALUES ($1, $2, $3, $4)
                RETURNING *;
            `;
            const insertValues = [month, params.type, year, day];
            const insertResult = await pgPoolQuery(insertSql, insertValues);

            return insertResult.rows[0];
        } catch (error) {
            console.error('Error inserting statistics:', error);
            throw new Error('Failed to create statistics');
        }
    }
}