import {pgPoolQuery, PrizeHistoryModel, PrizeModel} from "..";

export class PrizeHistoryRepository {
    static async create(params: PrizeHistoryModel): Promise<PrizeHistoryModel> {
        const sql = `
            INSERT INTO prize_history
                (prize_id, story_ssenariy_id, user_id, status, level_id)
            VALUES ($1, $2, $3, $4, $5) RETURNING *;
        `;

        const result = await pgPoolQuery(sql, [
            params.prize_id,
            params.story_ssenariy_id,
            params.user_id,
            params.status,
            params.level_id ?? null
        ]);

        return result.rows[0];
    }


    static async getAll(params: { limit: number, page: number, user_id?: number }): Promise<PrizeModel[]> {
        let pagination = '';
        const parameters: any[] = [];

        if (params.limit && !isNaN(params.page)) {
            parameters.push(params.limit, (params.page - 1) * params.limit);
            pagination = 'LIMIT $1 OFFSET $2';
        }
        const userFilter = params.user_id ? 'WHERE prize_history.user_id = $3' : '';

        const sql = `
            SELECT prize_history.*,
                   JSON_BUILD_OBJECT(
                           'id', prizes.id,
                           'name', prizes.name,
                           'type', prizes.type,
                           'value', prizes.value
                   )       AS prize,
                   CASE
                       WHEN prize_history.story_ssenariy_id IS NOT NULL THEN JSON_BUILD_OBJECT(
                               'ssenariy_id', ssenariy.id,
                               'name', ssenariy.name,
                               'description', ssenariy.description,
                               'type_of_condition', ssenariy.type_of_condition,
                               'days', ssenariy.days,
                               'prize_id', ssenariy.prize_id,
                               'position', ssenariy.position,
                               'status', ssenariy.status
                                                                             )
                       ELSE NULL
                       END AS ssenariy,
                   CASE
                       WHEN prize_history.level_id IS NOT NULL THEN JSON_BUILD_OBJECT(
                               'id', levels.id,
                               'name', levels.name,
                               'position', levels.position,
                               'prize_id', levels.prize_id,
                               'limit', levels."limit",
                               'ssenariy_id', levels.ssenariy_id
                                                                    )
                       ELSE NULL
                       END AS level,
                   count(*)   OVER() AS count
            FROM public.prize_history
                LEFT JOIN public.prizes AS prizes
            ON prize_history.prize_id = prizes.id
                LEFT JOIN public.story_ssenariy AS story_ssenariy
                ON prize_history.story_ssenariy_id = story_ssenariy.id
                LEFT JOIN public.ssenariy AS ssenariy
                ON story_ssenariy.ssenariy_id = ssenariy.id
                LEFT JOIN public.levels AS levels
                ON prize_history.level_id = levels.id
                ${userFilter}
            ORDER BY prize_history.created_at DESC ${pagination};
        `;

        if (params.user_id) {
            parameters.push(params.user_id);
        }


        const result = await pgPoolQuery(sql, parameters);

        return result.rows;
    }


    static async deleteByStorySsenariyId(storySsenariyId: number) {
        const sql = `DELETE
                     FROM public.prize_history
                     WHERE story_ssenariy_id = $1`

        return await pgPoolQuery(sql, [storySsenariyId])
    }
}
