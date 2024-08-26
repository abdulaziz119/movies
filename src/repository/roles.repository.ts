import {pgPoolQuery} from "../database";
import { RolesModel} from "../models";
export class RolesRepository {
    static async create(params: RolesModel): Promise<RolesModel | null> {
        const sql = `
            INSERT INTO public.roles (roles, movies, admin, statistics, advertising, series, uploads)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *;
        `;

        const values = [
            params.roles,
            params.movies,
            params.admin,
            params.statistics,
            params.advertising,
            params.series,
            params.uploads
        ];

        try {
            const result = await pgPoolQuery(sql, values);

            if (!result.rows || result.rows.length === 0)
                return null;

            return result.rows[0];
        } catch (error) {
            console.error('Error creating role:', error);
            throw error;
        }
    }

}
