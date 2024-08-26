
import { pgPoolQuery, QueryParams, StatisticsModel } from '..';

export class AdvertisingRepository {

    // static async getAll(params: QueryParams): Promise<StatisticsModel[]> {
    //
    //     const parameters: any = [];
    //     let pagination = '';
    //     let filter = '';
    //
    //     if (params.limit && !isNaN(params.page)) {
    //         parameters.push(params.limit, (params.page - 1) * params.limit);
    //         pagination = ` LIMIT $1 OFFSET $2`;
    //     }
    //
    //     if (params.status) {
    //         parameters.push(params.status);
    //         filter += ` and u.status = $${parameters.length}`;
    //     }
    //
    //     const sql = `SELECT u.user_id,
    //                         u.language,
    //                         u.activate_date,
    //                         u.status,
    //                         count(*) over() as count
    //                 FROM public.users as u
    //                     WHERE 1=1 ${filter}
    //                     order by u.user_id desc ${pagination};`
    //
    //     const result = await pgPoolQuery(sql, parameters);
    //
    //     return result.rows
    // }
    //
    // static async getById(id: number): Promise<StatisticsModel> {
    //     const sql = `SELECT u.user_id,
    //                         u.language,
    //                         u.activate_date,
    //                         u.status
    //                 FROM public.users as u
    //                     WHERE u.user_id = $1`
    //     const result = await pgPoolQuery(sql, [id]);
    //
    //     if (!result.rows || result.rows.length === 0)
    //         return null as any;
    //
    //     return result.rows[0]
    // }
    //
    // static async create(params: StatisticsModel): Promise<StatisticsModel> {
    //
    //     const sql = `
    //             INSERT INTO public.users (user_id, language, activate_date)
    //             VALUES ($1, $2, $3) RETURNING *;`
    //     const result = await pgPoolQuery(sql, [params.user_id, params.language, params.activate_date]);
    //
    //     if (!result.rows || result.rows.length === 0)
    //         return null as any;
    //
    //     return result.rows[0];
    // }
    //
    // static async updateStatus(id: number, status: number): Promise<void> {
    //     const sql = `UPDATE public.users SET status = $2 WHERE user_id = $1`;
    //     await pgPoolQuery(sql, [id, status]);
    // }

}