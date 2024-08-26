import {pgPoolQuery} from "../database";
import {UserDataModel} from "../models";
import {UserDataService} from "../utils";

export class UserDataRepository {

    static async checkPhoneExists(phone: number, month: string): Promise<boolean> {
        try {
            const query: string = 'SELECT 1 FROM public.user_data WHERE phone = $1 AND month = $2';
            const values: (number | string)[] = [phone, month];
            const result = await pgPoolQuery(query, values);
            return result.rows.length > 0;
        } catch (error) {
            console.error('Error checking phone existence:', error);
            throw new Error('Error checking phone existence');
        }
    }

    static async getUserDataByPhoneAndMonth(phone: number, month: string): Promise<UserDataModel> {
        try {
            const query: string = 'SELECT * FROM public.user_data WHERE phone = $1 AND month = $2';
            const values: (number | string)[] = [phone, month];
            const result = await pgPoolQuery(query, values);
            return result.rows[0] as UserDataModel;
        } catch (error) {
            console.error('Error retrieving user data by phone and month:', error);
            throw new Error('Error retrieving user data by phone and month');
        }
    }

    static async updateUserData(phone: number, amount: number, month: string, currentLevelId: number | null): Promise<void> {
        try {
            const query: string = `
                UPDATE public.user_data
                SET amount           = $2,
                    current_level_id = $4,
                    updated_at       = CURRENT_TIMESTAMP
                WHERE phone = $1 AND month = $3
            `;
            const values = [phone, amount, month, currentLevelId];
            await pgPoolQuery(query, values);
        } catch (error) {
            console.error('Error updating user data:', error);
            throw new Error('Error updating user data');
        }
    }

    static async insertUserData(phone: number, amount: number, month: string, currentLevelId: number | null): Promise<void> {
        try {
            const query: string = `
                INSERT INTO public.user_data (phone, amount, month, current_level_id, created_at, updated_at)
                VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
            `;
            const values = [phone, amount, month, currentLevelId];
            await pgPoolQuery(query, values);
        } catch (error) {
            console.error('Error inserting user data:', error);
            throw new Error('Error inserting user data');
        }
    }

    static async getRelevantData(phone: number): Promise<any> {
        const currentMonth = new UserDataService().getCurrentMonth();

        try {
            const ssenariyQuery = `
                SELECT days
                FROM public.ssenariy
                WHERE type_of_condition = 3
                ORDER BY id LIMIT 1
            `;
            const ssenariyResult = await pgPoolQuery(ssenariyQuery);
            const ssenariyData = ssenariyResult.rows[0];

            if (!ssenariyData) {
                throw new Error('No ssenariy record found with type_of_condition = 3');
            }

            const ssenariy = Number(ssenariyData.days);

            const [userDataResult, levelsResult, userLevelsResult, prizesResult] = await Promise.all([
                pgPoolQuery(`
                    SELECT amount
                    FROM public.user_data
                    WHERE phone = $1 AND month = $2
                `, [phone, currentMonth]),
                pgPoolQuery(`
                    SELECT id, name, prize_id, "limit" -- Correctly quoted 'limit'
                    FROM public.levels
                `),
                pgPoolQuery(`
                    SELECT level_id
                    FROM public.user_levels
                    WHERE phone = $1 AND month = $2
                `, [phone, currentMonth]),
                pgPoolQuery(`
                    SELECT id, name, type, value
                    FROM public.prizes
                `)
            ]);

            const userData = userDataResult.rows.reduce((total: number, record: {
                amount: number
            }) => total + record.amount, 0);

            const levelToPrizeMap = new Map<number, number>();
            levelsResult.rows.forEach((level: { id: string; prize_id: string }) => {
                levelToPrizeMap.set(Number(level.id), Number(level.prize_id));
            });

            const receivedPrizeIds = new Set<number>();
            userLevelsResult.rows.forEach((userLevel: { level_id: string }) => {
                const levelId = Number(userLevel.level_id);
                const prizeId = levelToPrizeMap.get(levelId);
                if (prizeId !== undefined) {
                    receivedPrizeIds.add(prizeId);
                }
            });

            const prizes = prizesResult.rows.map((prize: { id: string; name: any; type: number; value: number }) => {
                const prizeId = Number(prize.id);
                const received = receivedPrizeIds.has(prizeId);

                return {
                    id: prizeId,
                    name: prize.name,
                    type: prize.type,
                    received
                };
            });

            const levels = levelsResult.rows.map((level: { id: string; name: any; "limit": number }) => ({
                id: Number(level.id),
                name: level.name,
                limit: level["limit"],  // Access 'limit' using bracket notation
            }));

            return {
                ssenariy,
                userData,
                levels,
                prizes
            };
        } catch (error) {
            console.error('Error retrieving relevant data:', error);
            throw new Error('Error retrieving relevant data');
        }
    }

    static async getUserData(phone: number, month?: string, limit?: number, page?: number): Promise<UserDataModel[]> {
        let query: string = 'SELECT * FROM public.user_data WHERE phone = $1';
        const values: (number | string)[] = [phone];

        if (month) {
            query += ' AND month = $2';
            values.push(month);
        }

        query += ' ORDER BY month';

        if (typeof limit === 'number' && limit > 0 && typeof page === 'number' && page > 0) {
            const offset: number = (page - 1) * limit;
            query += ' LIMIT $' + (values.length + 1) + ' OFFSET $' + (values.length + 2);
            values.push(limit, offset);
        }

        try {
            const result = await pgPoolQuery(query, values);
            return result.rows.map((record: {
                id: string;
                phone: number;
                month: string;
                current_level_id: number;
            }) => ({
                id: Number(record.id),
                phone: record.phone,
                month: record.month,
                current_level_id: record.current_level_id,
            })) as UserDataModel[];
        } catch (error) {
            console.error('Error retrieving user data by phone and month:', error);
            throw new Error('Error retrieving user data by phone and month');
        }
    }
}
