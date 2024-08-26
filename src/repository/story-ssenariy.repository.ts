import {pgPoolQuery} from "../database";
import {StorySsenariyModel} from "..";

export class StorySsenariyRepository {

  static async getOrderBySsenariyPosition(
    params: {
      ssenariy_ids: number[],
      user_id: number
    }
  ): Promise<StorySsenariyModel> {

    let ids = params.ssenariy_ids.join(', ')

    const sql = `select ss.*, s.position
                 from story_ssenariy as ss
                          left join public.ssenariy s on s.id = ss.ssenariy_id
                 where user_id = $1
                   and ss.ssenariy_id in (${ids})
--                    and (completed_at is null or completed_at::date = $2)
                 order by s.position desc`

    const result = await pgPoolQuery(sql, [params.user_id])

    return result.rows[0]
  }

  static async getOne(user_id: number, ssenariy_id: number): Promise<StorySsenariyModel> {
    const sql = `SELECT s.id,
                        s.user_id,
                        s.ssenariy_id,
                        s.date_start,
                        s.days,
                        s.completed_at,
                        s.created_at,
                        s.updated_at
                 FROM story_ssenariy as s
                 where user_id = $1
                   and ssenariy_id = $2`
    const result = await pgPoolQuery(sql, [user_id, ssenariy_id])

    if (!result.rows || result.rows.length === 0)
      return null as any;

    return result.rows[0]
  }

  static async create(params: StorySsenariyModel): Promise<StorySsenariyModel> {
    const sql = `INSERT INTO public.story_ssenariy (user_id, ssenariy_id, days)
                 VALUES ($1, $2, $3)
                 RETURNING *;`
    const result = await pgPoolQuery(sql, [params.user_id, params.ssenariy_id, JSON.stringify(params.days)]);

    if (!result.rows || result.rows.length === 0)
      return null as any;

    return result.rows[0];
  }

  static async update(params: StorySsenariyModel): Promise<StorySsenariyModel> {
    const sql = 'UPDATE public.story_ssenariy SET days = $1, date_start = $2, completed_at = $3, updated_at = NOW() WHERE id = $4 RETURNING *'
    const result = await pgPoolQuery(sql, [JSON.stringify(params.days), params.date_start, params.completed_at, params.id])

    if (!result.rows || result.rows.length === 0)
      return null as any;

    return result.rows[0];
  }

  static async delete(id: number) {
    const sql = `DELETE
                 FROM public.story_ssenariy
                 WHERE id = $1`
    return await pgPoolQuery(sql, [id])
  }
}
