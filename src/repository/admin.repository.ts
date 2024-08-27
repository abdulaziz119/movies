import {AdminModel, pgPoolQuery} from '..';
import {params_joi} from "../validation/other.validation";


export class AdminsRepository {

    static async create(params: AdminModel): Promise<AdminModel> {
        const sql = `
            INSERT INTO public.admin (first_name, last_name, role_id, boss_admin, email, password)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *;
        `;

        const bossAdmin = params.boss_admin !== undefined ? params.boss_admin : false;

        const values = [
            params.first_name,
            params.last_name,
            params.role_id,
            bossAdmin,
            params.email,
            params.password
        ];

        const result = await pgPoolQuery(sql, values);

        if (!result.rows || result.rows.length === 0)
            throw new Error('Could not create administrator');

        return result.rows[0];
    }


    static async login(params: { email: string, password: string }): Promise<AdminModel | null> {
        const sql = `
            SELECT * FROM public.admin
            WHERE email = $1;
        `;

        const result = await pgPoolQuery(sql, [params.email]);

        if (!result.rows || result.rows.length === 0) {
            throw new Error('No admins found');
        }

        return result.rows[0];
    }


    static async getOne(params: { id: number }): Promise<AdminModel | null> {
        const sql = `
            SELECT * FROM public.admin
            WHERE id = $1;
        `;

        try {
            const result = await pgPoolQuery(sql, [params.id]);

            if (!result.rows || result.rows.length === 0) {
                throw new Error('No admins found');
            }

            return result.rows[0];
        } catch (error) {
            console.error(`Error fetching admin by ID: ${error}`);
            throw new Error('Error fetching admin by ID');
        }
    }

    static async getAll(params: { limit: number, page: number }): Promise<AdminModel[] > {
        const sql = `
            SELECT * FROM public.admin
            LIMIT $1 OFFSET $2;
        `;

        const offset = (params.page - 1) * params.limit;

        try {
            const result = await pgPoolQuery(sql, [params.limit, offset]);

            if (!result.rows || result.rows.length === 0) {
                throw new Error('No admins found');
            }

            return result.rows;
        } catch (error) {
            console.error(`Error fetching admins: ${error instanceof Error ? error.message : 'Unknown error'}`);
            throw new Error('Error fetching admins');
        }
    }

}
