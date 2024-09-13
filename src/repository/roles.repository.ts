import {pgPoolQuery} from "../database";
import {ErrorEnum, RolesModel} from "../models";
import {ValidationException} from "../exceptions/validation.exception";

export class RolesRepository {
    static async create(params: RolesModel ): Promise<RolesModel | null> {
        const adminCheckSql = `
            SELECT * FROM public.admin
            WHERE id = $1 AND boss_admin = TRUE;
        `;

        try {
            const adminResult = await pgPoolQuery(adminCheckSql, [params.admin_id]);

            if (!adminResult.rows || adminResult.rows.length === 0) {
                console.error('Admin not found or not authorized.', Error);
                throw new Error('Admin not found or not authorized.');
            }

            const roleInsertSql = `
                INSERT INTO public.roles (admin, roles, movies, series, statistics, advertising, uploads)
                VALUES ($1, $2, $3, $4, $5, $6, $7)
                RETURNING *;
            `;

            const values = [
                params.admin,
                params.roles,
                params.movies,
                params.series,
                params.statistics,
                params.advertising,
                params.uploads
            ];

            const result = await pgPoolQuery(roleInsertSql, values);

            if (!result.rows || result.rows.length === 0) {
                console.log("Role creation failed.");
                return null;
            }

            return result.rows[0];
        } catch (error) {
            console.error('Error creating role:', Error);
            throw new Error('Error creating role:');
        }
    }

    static async getOne(params:{id: number}): Promise<RolesModel | null> {
        const sql = `
            SELECT * FROM public.roles
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
            console.error(`Error fetching role by ID: ${error}`);
            throw new Error('Error fetching role by ID');
        }
    }

    static async getAll(params: { limit: number, page: number }): Promise<RolesModel[] > {
        const sql = `
            SELECT * FROM public.roles
            WHERE deleted_at IS NULL
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
            console.error(`Error fetching roles: ${error instanceof Error ? error.message : String(error)}`);
            throw new Error('Error fetching roles');
        }
    }

    static async delete(id: number): Promise<void> {
        const sql: string = `UPDATE roles
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

    static async checkGetOne(id: number): Promise<RolesModel | null> {
        const sql = `
        SELECT * FROM public.roles
        WHERE id = $1;
    `;

        try {
            const result = await pgPoolQuery(sql, [id]);

            if (!result.rows || result.rows.length === 0) {
                throw new ValidationException(ErrorEnum.RoleId);
            }

            return result.rows[0];
        } catch (error) {
            console.error(`Error fetching role by ID ${id}:`, error);
            throw new Error('Error fetching role by ID');
        }
    }
}
