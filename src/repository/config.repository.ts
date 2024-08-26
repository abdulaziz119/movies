import {pgPoolQuery} from "../database";
import {ConfigModel} from "../models";

export class ConfigRepository {
    static async create(params: ConfigModel): Promise<ConfigModel | null> {
        params.updated_at= new Date()
        const sql = `
            INSERT INTO public.config (content)
            VALUES ($1)
            RETURNING *;
        `;

        const result = await pgPoolQuery(
            sql,
          [params.content]
        );

        if (!result.rows || result.rows.length === 0) {
            return null as any;
        }

        return result.rows[0];
    }

    static async getOne(): Promise<ConfigModel | null> {
        const sql = `
            SELECT * FROM public.config
            LIMIT 1; 
        `;
        const result = await pgPoolQuery(sql);

        if (!result.rows || result.rows.length === 0) {
            return null;
        }

        return result.rows[0] as ConfigModel;
    }

    static async update(params: ConfigModel): Promise<ConfigModel | null> {
        params.updated_at= new Date()
        const sql = `
            UPDATE public.config
            SET content = $1
            WHERE id = $2
            RETURNING *;
        `;

        const result = await pgPoolQuery(
            sql,
          [params.content, params.id]
        );

        if (!result.rows || result.rows.length === 0) {
            return null;
        }

        return result.rows[0] as ConfigModel;
    }
}
