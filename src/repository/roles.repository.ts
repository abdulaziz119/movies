import {pgPoolQuery} from "../database";
import { RolesModel} from "../models";
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
    // static async create(params: RolesModel): Promise<RolesModel> {
    //     const sql = `
    //         INSERT INTO public.roles (admin, roles, movies, series, statistics, advertising, uploads)
    //         VALUES ($1, $2, $3, $4, $5, $6, $7)
    //         RETURNING *;
    //     `;
    //     const AdminModelSql = `
    //         SELECT * FROM public.admin.id = $1;
    //         WHERE id = $1;
    //     `;
    //
    //     const AdminResult = await pgPoolQuery(sql, [
    //         params.admin_id,
    //     ]);
    //
    //     const values = [
    //         params.admin,
    //         params.roles,
    //         params.movies,
    //         params.series,
    //         params.statistics,
    //         params.advertising,
    //         params.uploads
    //     ];
    //
    //     const result = await pgPoolQuery(sql, values);
    //
    //     if (!result.rows || result.rows.length === 0)
    //         return null as any;
    //
    //     return result.rows[0];
    // }

}
