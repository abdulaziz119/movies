import {PaginationParams, pgPoolQuery, PrizeModel} from "..";

export class PrizeRepository {
    static async getAll(params: PaginationParams): Promise<PrizeModel[]> {
        const parameters: any = [];
        let pagination = ''

        if (params.limit && !isNaN(params.page)) {
            parameters.push(params.limit, (params.page - 1) * params.limit);
            pagination = ` limit $1 offset $2`;
        }

        const sql = `select id,
                            name,
                            type,
                            value,
                            created_at,
                            updated_at,
                            count(*) over () as count
                     from public.prizes
                     where deleted_at is null
                     order by id desc ${pagination}`

        const result = await pgPoolQuery(sql, [...parameters])

        return result.rows
    }

    static async getOne(id: number): Promise<PrizeModel> {
        const sql = `select id,
                            name,
                            type,
                            value,
                            created_at,
                            updated_at
                     from prizes
                     where id = $1
                       and deleted_at is null`

        const result = await pgPoolQuery(sql, [id])

        return result.rows[0]
    }

    static async create(params: PrizeModel): Promise<PrizeModel> {
        const sql = 'insert into prizes (name, type, value) values ($1, $2, $3) returning *'

        const result = await pgPoolQuery(sql, [params.name, params.type, params.value])

        return result.rows[0]
    }

    static async update(params: PrizeModel): Promise<PrizeModel> {
        const sql = `update prizes
                     set name       = $2,
                         value      = $3,
                         updated_at = now()
                     where id = $1
                       and deleted_at is null returning *`

        const result = await pgPoolQuery(sql, [params.id, params.name, params.value])

        return result.rows[0]
    }

    static async delete(id: number) {
        const sql = 'update prizes set deleted_at = now() where id = $1 and deleted_at is null'

        await pgPoolQuery(sql, [id])
    }

    static async getWhereIdInArray(ids: number[]): Promise<PrizeModel[]> {
        if (ids.length === 0) {
            return [];
        }

        const placeholders = ids.map((_, index) => `$${index + 1}`).join(", ");
        const sql = `SELECT *
                     FROM prizes
                     WHERE id IN (${placeholders})`;

        try {
            const result = await pgPoolQuery(sql, ids);
            return result.rows as PrizeModel[];
        } catch (error) {
            console.error('Error retrieving prizes:', error.message);
            throw new Error('Failed to retrieve prizes');
        }
    }
}
