import {pgPoolQuery} from "../database";
import { MoviesModel} from "../models";
import {StatisticsRepository} from "./statistics.repository";

export class MoviesRepository {

    static async create(params: MoviesModel): Promise<MoviesModel> {
        const sql = `
            INSERT INTO movies (code, name, url, quality, duration, state, year, genre, create_admin_id)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING *;
        `;

        const values = [
            params.code,
            params.name,
            params.url,
            params.quality,
            params.duration,
            params.state,
            params.year,
            params.genre,
            params.create_admin_id
        ];

        const result = await pgPoolQuery(sql, values);
        return result.rows[0];
    }

    static async getOne(params: { id: number }, language: string): Promise<MoviesModel | null> {
        const lang = language || 'uz';

        const sql = `
            SELECT
                id,
                code,
                name ->> $2 AS name,
                url ->> $2 AS url,
                quality,
                duration,
                state,
                year,
                genre,
                create_admin_id,
                seen,
                created_at,
                updated_at,
                deleted_at
            FROM public.movies
            WHERE id = $1
              AND deleted_at IS NULL;
        `;

        try {
            const result = await pgPoolQuery(sql, [params.id, lang]);

            if (!result.rows || result.rows.length === 0) {
                return null;
            }

            return result.rows[0] as MoviesModel;
        } catch (error) {
            console.error(`Error fetching movie by ID: ${error instanceof Error ? error.message : 'Unknown error'}`);
            throw new Error('Error fetching movie by ID');
        }
    }

    static async getAll(params: { limit: number, page: number },language:string): Promise<any[]> {
        if (params.limit <= 0 || params.page <= 0) {
            throw new Error('Invalid pagination parameters');
        }
        const lang=language||'uz';

        const sql = `
            SELECT
                id,
                code,
                name ->> $3 AS name,
                url ->> $3 AS url,
                quality,
                duration,
                state,
                year,
                genre,
                create_admin_id,
                seen,
                created_at,
                updated_at,
                deleted_at
            FROM public.movies
            WHERE deleted_at IS NULL
            ORDER BY seen ASC, id ASC
                LIMIT $1 OFFSET $2;
        `;

        const offset: number = (params.page - 1) * params.limit;
        await StatisticsRepository.checkSeriesCreate({type: 'movie'});

        try {
            const result = await pgPoolQuery(sql, [params.limit, offset, lang]);

            if (!result.rows || result.rows.length === 0) {
                return [];
            }
            return result.rows as MoviesModel[];
        } catch (error) {
            console.error(`Error fetching movies: ${error instanceof Error ? error.message : 'Unknown error'}`);
            throw new Error(`Error fetching movies: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }


    static async queryGet(params: { limit: number, page: number, query: string }): Promise<any[]> {
        if (params.limit <= 0 || params.page <= 0) {
            throw new Error('Invalid pagination parameters');
        }

        const searchQuery = params.query.trim().toLowerCase();
        const offset: number = (params.page - 1) * params.limit;
        const sql = `
        SELECT
            id,
            code,
            CASE
                WHEN LOWER(name ->> 'uz') LIKE '%' || $1 || '%' THEN name ->> 'uz'
                WHEN LOWER(name ->> 'ru') LIKE '%' || $1 || '%' THEN name ->> 'ru'
                WHEN LOWER(name ->> 'en') LIKE '%' || $1 || '%' THEN name ->> 'en'
                ELSE NULL
            END AS name,
            CASE
                WHEN LOWER(name ->> 'uz') LIKE '%' || $1 || '%' THEN url ->> 'uz'
                WHEN LOWER(name ->> 'ru') LIKE '%' || $1 || '%' THEN url ->> 'ru'
                WHEN LOWER(name ->> 'en') LIKE '%' || $1 || '%' THEN url ->> 'en'
                ELSE NULL
            END AS url,
            quality,
            duration,
            state,
            year,
            genre,
            create_admin_id,
            seen,
            created_at,
            updated_at,
            deleted_at
        FROM public.movies
        WHERE deleted_at IS NULL
        AND (
            LOWER(name ->> 'uz') LIKE '%' || $1 || '%' OR
            LOWER(name ->> 'ru') LIKE '%' || $1 || '%' OR
            LOWER(name ->> 'en') LIKE '%' || $1 || '%'
        )
        ORDER BY seen ASC, id ASC
        LIMIT $2 OFFSET $3;
    `;

        try {
            const result = await pgPoolQuery(sql, [searchQuery, params.limit, offset]);

            if (!result.rows || result.rows.length === 0) {
                return [];
            }

            return result.rows as MoviesModel[];
        } catch (error) {
            console.error(`Error fetching movies: ${error instanceof Error ? error.message : 'Unknown error'}`);
            throw new Error(`Error fetching movies: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }

    static async delete(id: number): Promise<void> {
        const sql: string = `UPDATE movies
                             SET deleted_at = NOW()
                             WHERE id = $1
                               AND deleted_at IS NULL`;
        try {
            await pgPoolQuery(sql, [id]);
        } catch (error) {
            console.error('Error deleting movie:', error);
            throw new Error('Failed to delete movie');
        }
    }
}
