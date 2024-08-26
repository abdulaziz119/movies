import {BaseStatusEnum, pgPoolQuery, QueryParams, SsenariyModel, TYPE_OF_CONDITION_ENUM} from '..';

export class SsenariyRepository {

  static async getCalendarSsenaries() {
    const sql = `select *
                 from ssenariy
                 where type_of_condition = $1
                   and status = $2
                 order by position`;

    const result = await pgPoolQuery(sql, [TYPE_OF_CONDITION_ENUM.CALENDAR, BaseStatusEnum.ACTIVE])

    return result.rows
  }

  static async getAll(params: QueryParams): Promise<SsenariyModel[]> {

    const parameters: any = [];
    let pagination = '';
    let filter = '';

    if (params.limit && !isNaN(params.page)) {
      parameters.push(params.limit, (params.page - 1) * params.limit);
      pagination = ` LIMIT $1 OFFSET $2`;
    }

    if (params.status) {
      parameters.push(params.status);
      filter += ` and s.status = $${parameters.length}`;
    }

    const sql = `SELECT s.id,
                        s.name,
                        s.description,
                        s.type_of_condition,
                        s.days,
                        s.prize_id,
                        s.position,
                        s.created_at,
                        s.updated_at,
                        s.status,
                        count(*) over() as count,
       CASE WHEN p.id IS NOT NULL THEN
                JSON_BUILD_OBJECT('id', p.id, 'name', p.name)
            ELSE
                NULL
           END as prize
                 FROM public.ssenariy as s
                     LEFT JOIN public.prizes p
                 ON p.id = s.prize_id
                 WHERE 1=1 ${filter}
                   and status = ${BaseStatusEnum.ACTIVE}
                 order by s.created_at desc ${pagination};`

    const result = await pgPoolQuery(sql, parameters);

    return result.rows
  }

  static async getById(id: number): Promise<SsenariyModel> {
    const sql = `SELECT s.id,
                        s.name,
                        s.description,
                        s.type_of_condition,
                        s.days,
                        s.prize_id,
                        s.created_at,
                        s.updated_at,
                        s.status,
                        s.position,
       CASE WHEN p.id IS NOT NULL THEN
                JSON_BUILD_OBJECT('id', p.id, 'name', p.name)
            ELSE
                NULL
           END as prize
                 FROM public.ssenariy as s
                          LEFT JOIN public.prizes p ON p.id = s.prize_id
                 WHERE s.id = $1
                   and status = ${BaseStatusEnum.ACTIVE}`
    const result = await pgPoolQuery(sql, [id]);

    if (!result.rows || result.rows.length === 0)
      return null as any;

    return result.rows[0]
  }

  static async getByName(name: string): Promise<SsenariyModel> {
    const sql = `SELECT s.id,
                        s.name,
                        s.description,
                        s.type_of_condition,
                        s.days,
                        s.prize_id,
                        s.created_at,
                        s.updated_at,
                        s.status,
                        s.position,
                        CASE
                            WHEN p.id IS NOT NULL THEN
                                JSON_BUILD_OBJECT('id', p.id, 'name', p.name)
                            ELSE
                                NULL
                            END as prize
                 FROM public.ssenariy as s
                          LEFT JOIN public.prizes p ON p.id = s.prize_id
                 WHERE s.name = $1`
    const result = await pgPoolQuery(sql, [name]);

    if (!result.rows || result.rows.length === 0)
      return null as any;

    return result.rows[0]
  }

  static async create(params: SsenariyModel): Promise<SsenariyModel> {

    const sql = `
        INSERT INTO public.ssenariy (name, description, type_of_condition, days, prize_id, position)
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`
    const result = await pgPoolQuery(sql, [params.name, params.description, params.type_of_condition, params.days, params.prize_id, params.position]);

    if (!result.rows || result.rows.length === 0)
      return null as any;

    return result.rows[0];
  }

  static async update(params: SsenariyModel): Promise<SsenariyModel> {
    const sql = `update public.ssenariy
                 set name              = $1,
                     description       = $2,
                     type_of_condition = $3,
                     days              = $4,
                     prize_id          = $5,
                     status            = $6,
                     position = $7,
                     updated_at        = NOW()
                 WHERE id = $8 RETURNING *;`

    const result = await pgPoolQuery(sql,
      [params.name, params.description, params.type_of_condition, params.days,
        params.prize_id, params.status ? params.status : BaseStatusEnum.ACTIVE, params.position, params.id]);

    if (!result.rows || result.rows.length === 0)
      return null as any;

    return result.rows[0];
  }

  static async updateStatus(id: number, status: number): Promise<void> {
    const sql = `UPDATE public.ssenariy
                 SET status = $2
                 WHERE id = $1`;
    await pgPoolQuery(sql, [id, status]);
  }

}