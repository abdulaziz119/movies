import {BaseStatusEnum, NotificaitionSsenariyModel, pgPoolQuery, QueryParams} from '..';

export class NotificaitionSsenariyRepository {

    static async getAll(params: QueryParams): Promise<NotificaitionSsenariyModel[]> {

        const parameters: any = [];
        let pagination = '';
        let filter = '';

        if (params.limit && !isNaN(params.page)) {
            parameters.push(params.limit, (params.page - 1) * params.limit);
            pagination = ` LIMIT $1 OFFSET $2`;
        }

        const sql = `SELECT ns.id,
                            ns.ssenariy_id,
                            ns.content,
                            ns.template_id,
                            ns.day,
                            ns.created_at,
                            ns.updated_at,
                            ns.status,
                            count(*) over () as count
                     FROM public.notificaition_ssenariy as ns
                     WHERE 1 = 1
                       AND status = ${BaseStatusEnum.ACTIVE} ${filter}
                     order by ns.created_at desc ${pagination};`

        const result = await pgPoolQuery(sql, parameters);

        return result.rows
    }

    static async getById(id: number): Promise<NotificaitionSsenariyModel> {
        const sql = `SELECT ns.id,
                            ns.ssenariy_id,
                            ns.content,
                            ns.template_id,
                            ns.day,
                            ns.created_at,
                            ns.updated_at,
                            ns.status
                    FROM public.notificaition_ssenariy as ns
                     WHERE ns.id = $1
                       AND status = ${BaseStatusEnum.ACTIVE}`
        const result = await pgPoolQuery(sql, [id]);

        if (!result.rows || result.rows.length === 0)
            return null as any;

        return result.rows[0]
    }

    static async create(params: NotificaitionSsenariyModel): Promise<NotificaitionSsenariyModel> {

        const sql = `
            INSERT INTO public.notificaition_ssenariy (ssenariy_id, content, template_id, day)
            VALUES ($1, $2, $3, $4)
            RETURNING *;`
        const result = await pgPoolQuery(sql, [params.ssenariy_id, params.content, params.template_id, params.day]);

        if (!result.rows || result.rows.length === 0)
            return null as any;

        return result.rows[0];
    }

    static async update(params: NotificaitionSsenariyModel): Promise<NotificaitionSsenariyModel> {
        const sql = `update public.notificaition_ssenariy
                     set ssenariy_id = $1,
                            content = $2,
                         template_id = $3,
                         day         = $4
                     WHERE id = $5
                     RETURNING *;`

        const result = await pgPoolQuery(sql,
          [params.ssenariy_id, params.content, params.template_id, params.day, params.id]);

        if (!result.rows || result.rows.length === 0)
            return null as any;

        return result.rows[0];
    }

    static async updateStatus(id: number, status: number): Promise<void> {
        const sql = `UPDATE public.notificaition_ssenariy SET status = $2 WHERE id = $1`;
        await pgPoolQuery(sql, [id, status]);
    }

}
