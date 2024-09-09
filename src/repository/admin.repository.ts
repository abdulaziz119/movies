import {AdminModel, ErrorEnum, pgPoolQuery} from '..';
import {ValidationException} from "../exceptions/validation.exception";


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
        if (!result.rows || result.rows.length === 0){
            throw new ValidationException(ErrorEnum.EmailUsed)
        }

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
            WHERE id = $1
              AND deleted_at IS NULL;
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
            WHERE deleted_at IS NULL
            LIMIT $1 OFFSET $2;
        `;

        const offset:number = (params.page - 1) * params.limit;

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

    static async checkGetOne(id: number): Promise<any> {
        const sql = `
            SELECT * FROM public.admin
            WHERE id = $1;
        `;

        try {
            const result = await pgPoolQuery(sql, [id]);
            if (!result.rows || result.rows.length === 0) {
                if (!result) throw new ValidationException(ErrorEnum.RoleId)
            }
            return result.rows[0].role_id;
        } catch (error) {
            console.error(`Error fetching role by ID: ${error}`);
            throw new Error('Error fetching role by ID');
        }
    }

    static async delete(id: number): Promise<void> {
        const sql: string = `UPDATE admin
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

}
