import {AdvertisingModule, pgPoolQuery} from '..';

export class AdvertisingRepository {

    static async create(params: AdvertisingModule): Promise<AdvertisingModule> {
        const sql = `
        INSERT INTO advertising (upload_id, finish, create_admin_id, deleted_at)
        VALUES ($1, $2, $3, $4)
        RETURNING *
    `;

        const values = [
            params.upload_id,
            params.finish,
            params.create_admin_id,
            params.deleted_at
        ];

        try {
            const result = await pgPoolQuery(sql, values);
            return result.rows[0] as AdvertisingModule;
        } catch (error) {
            console.error(`Error creating advertising record: ${error instanceof Error ? error.message : 'Unknown error'}`);
            throw new Error(`Error creating advertising record: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }

    static async getAll(params: { limit: number, page: number }): Promise<AdvertisingModule[] > {
        const sql = `
            SELECT * FROM public.advertising
            WHERE deleted_at IS NULL
            LIMIT $1 OFFSET $2;
        `;

        const offset = (params.page - 1) * params.limit;

        try {
            const result = await pgPoolQuery(sql, [params.limit, offset]);

            if (!result.rows || result.rows.length === 0) {
                throw new Error('No advertising found');
            }

            return result.rows;
        } catch (error) {
            console.error(`Error fetching advertising: ${error instanceof Error ? error.message : 'Unknown error'}`);
            throw new Error('Error fetching advertising');
        }
    }

    static async getOne(params:{id: number}): Promise<AdvertisingModule | null> {
        const sql = `
            SELECT * FROM public.advertising
            WHERE id = $1
              AND deleted_at IS NULL;
        `;

        try {
            const result = await pgPoolQuery(sql, [params.id]);

            if (!result.rows || result.rows.length === 0) {
                throw new Error('No roles found');
            }

            return result.rows[0];
        } catch (error) {
            console.error(`Error fetching advertising by ID: ${error}`);
            throw new Error('Error fetching advertising by ID');
        }
    }

    static async delete(id: number): Promise<void> {
        const sql: string = `UPDATE public.advertising
                             SET deleted_at = NOW()
                             WHERE id = $1
                               AND deleted_at IS NULL`;
        try {
            await pgPoolQuery(sql, [id]);
        } catch (error) {
            console.error('Error deleting advertising:', error);
            throw new Error('Failed to delete advertising');
        }
    }

}