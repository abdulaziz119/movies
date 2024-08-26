import {pgPoolQuery} from "../database";
import {UserLevelModel} from "../models";

export class UserLevelsRepository {
    static async insertUserLevels(userLevels: UserLevelModel[]): Promise<void> {
        try {
            const query: string = `
                INSERT INTO public.user_levels (phone, level_id, month, created_at, updated_at)
                VALUES ${userLevels.map((_: UserLevelModel, index: number) =>
                        `($${index * 3 + 1}, $${index * 3 + 2}, $${index * 3 + 3}, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`
                ).join(', ')}
            `;
            const values: (number | string)[] = userLevels.reduce((acc: (number | string)[], userLevel: UserLevelModel) => {
                acc.push(userLevel.phone, userLevel.level_id, userLevel.month);
                return acc;
            }, []);

            await pgPoolQuery(query, values);
        } catch (error) {
            console.error('Error inserting user levels:', error);
            throw new Error('Error inserting user levels');
        }
    }

    static async getUserLevels(params: {
        month?: string;
        phone: number;
        limit?: number;
        page?: number
    }): Promise<UserLevelModel[]> {
        const {month, phone, limit, page} = params;
        let paginationClause: string = '';
        const queryParameters: any[] = [phone];

        if (month) {
            queryParameters.push(month);
        }

        if (typeof limit === 'number' && typeof page === 'number' && page > 0) {
            const offset: number = (page - 1) * limit;
            queryParameters.push(limit, offset);
            paginationClause = `LIMIT $${queryParameters.length - 1} OFFSET $${queryParameters.length}`;
        }

        const sql: string = `
            SELECT ul.*
            FROM public.user_levels ul
            WHERE ul.phone = $1
                ${month ? 'AND ul.month = $2' : ''}
            ORDER BY ul.month ${paginationClause};
        `;

        try {
            const result = await pgPoolQuery(sql, queryParameters);
            return result.rows as UserLevelModel[];
        } catch (error) {
            console.error('Error retrieving user levels:', error);
            throw new Error('Failed to retrieve user levels');
        }
    }
}
