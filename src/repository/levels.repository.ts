import {LevelModel, PaginationParams, pgPoolQuery} from "..";

export class LevelRepository {
    static async create(params: LevelModel): Promise<LevelModel> {
        try {
            const sql: string = `
                INSERT INTO levels (name, position, prize_id, "limit", ssenariy_id, created_at, updated_at)
                VALUES ($1, $2, $3, $4, $5, NOW(), NOW()) RETURNING *
            `;
            const result = await pgPoolQuery(sql, [params.name, params.position, params.prize_id, params.limit, params.ssenariy_id]);
            return result.rows[0];
        } catch (error) {
            console.error('Error creating level:', error);
            throw new Error('Failed to create level');
        }
    }

    static async update(params: LevelModel): Promise<LevelModel> {
        const sql: string = `
            UPDATE levels
            SET name        = $1,
                position    = $2,
                prize_id    = $3,
                "limit"     = $4,
                ssenariy_id = $5,
                updated_at  = NOW()
            WHERE id = $6
              AND deleted_at IS NULL RETURNING *
        `;

        try {
            const result = await pgPoolQuery(sql, [params.name, params.position, params.prize_id, params.limit, params.ssenariy_id, params.id]);
            if (result.rows.length === 0) {
                throw new Error('Level not found or has been deleted');
            }
            return result.rows[0];
        } catch (error) {
            console.error('Error updating level:', error);
            throw new Error('Failed to update level');
        }
    }

    static async delete(id: number): Promise<void> {
        const sql: string = `UPDATE levels
                             SET deleted_at = NOW()
                             WHERE id = $1
                               AND deleted_at IS NULL`;
        try {
            await pgPoolQuery(sql, [id]);
        } catch (error) {
            console.error('Error deleting level:', error);
            throw new Error('Failed to delete level');
        }
    }

    static async getAll(params: PaginationParams): Promise<LevelModel[]> {
        const parameters: any = [];
        let pagination: string = '';

        if (params.limit && !isNaN(params.page) && params.limit > 0 && params.page > 0) {
            parameters.push(params.limit, (params.page - 1) * params.limit);
            pagination = ` LIMIT $1 OFFSET $2`;
        }

        const sql: string = `SELECT *
                             FROM levels
                             WHERE deleted_at IS NULL${pagination}`;

        try {
            const result = await pgPoolQuery(sql, parameters);
            return result.rows.map((record: { id: string, ssenariy_id: string, prize_id: string }) => ({
                ...record,
                id: Number(record.id),
                ssenariy_id: Number(record.ssenariy_id),
                prize_id: +record.prize_id
            }));
        } catch (error) {
            console.error('Error retrieving levels:', error);
            throw new Error('Failed to retrieve levels');
        }
    }

    static async getAllLevels(): Promise<LevelModel[]> {
        const sql: string = `SELECT *
                             FROM levels
                             WHERE deleted_at IS NULL`;

        try {
            const result = await pgPoolQuery(sql);
            return result.rows.map((record: { id: string, ssenariy_id: string, prize_id: string }) => ({
                ...record,
                id: Number(record.id),
                ssenariy_id: Number(record.ssenariy_id),
                prize_id: +record.prize_id
            }));
        } catch (error) {
            console.error('Error retrieving levels:', error);
            throw new Error('Failed to retrieve levels');
        }
    }


    static async getLevelsByUserData({amount, oldAmount}): Promise<LevelModel[]> {
        const sql: string = `
            SELECT l.*
            FROM public.levels l
            WHERE l."limit" > $1
              AND l."limit" <= $2
            ORDER BY l.position;
        `;
        const parameters: any[] = [oldAmount, amount];

        try {
            const result = await pgPoolQuery(sql, parameters);
            const levels = result.rows.map((level: any) => {
                if (level.prize_id) {
                    level.prize_id = parseInt(level.prize_id, 10);
                }
                return level;
            }) as LevelModel[];
            return levels;
        } catch (error) {
            console.error('Error retrieving levels:', error.message);
            throw new Error('Failed to retrieve levels');
        }
    }
    

    static async getOne(id: null | number): Promise<LevelModel> {
        const sql: string = `SELECT *
                             FROM levels
                             WHERE id = $1
                               AND deleted_at IS NULL`;

        const result = await pgPoolQuery(sql, [id]);
        return result.rows[0];
    }

}
