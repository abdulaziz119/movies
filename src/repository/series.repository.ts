import { SeriesModule} from "../models";
import {pgPoolQuery} from "../database";

export class SeriesRepository {
    static async create(params: SeriesModule): Promise<SeriesModule> {
        const sql = `
        INSERT INTO series (name, code, movies, state, year, genre, seen, create_admin_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *;
    `;

        const values = [
            JSON.stringify(params.name),
            params.code,
            params.movies,
            params.state,
            params.year,
            params.genre,
            params.seen ?? 0,
            params.create_admin_id
        ];

        try {
            const result = await pgPoolQuery(sql, values);
            return result.rows[0];
        } catch (error) {
            console.error('Error inserting series:', error);
            throw new Error('Failed to create series');
        }
    }


    static async getOne(params: { id: number }, language: string): Promise<SeriesModule | null> {
        const lang = language || 'uz';

        const sqlSeries = `
        SELECT
            id,
            name ->> $2 AS name,
            movies,
            state,
            year,
            code,
            genre,
            seen,
            create_admin_id,
            movies
        FROM
            series
        WHERE
            id = $1
            AND deleted_at IS NULL;
    `;

        try {
            const resultSeries = await pgPoolQuery(sqlSeries, [params.id, lang]);

            if (!resultSeries.rows || resultSeries.rows.length === 0) {
                return null;
            }

            const series = resultSeries.rows[0];

            const seriesResponse: SeriesModule = {
                id: series.id,
                name: series.name,
                state: series.state,
                year: series.year,
                code: series.code,
                genre: series.genre,
                seen: series.seen,
                create_admin_id: series.create_admin_id,
                movies: series.movies || [],
            };

            return seriesResponse;
        } catch (error) {
            console.error(`Error fetching series by ID: ${error instanceof Error ? error.message : 'Unknown error'}`);
            throw new Error('Error fetching series by ID');
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
                name ->> $3 AS name,
                create_admin_id,
                movies,
                seen,
                state,
                year,
                code,
                created_at,
                updated_at
            FROM public.series
            WHERE deleted_at IS NULL
            ORDER BY id ASC
                LIMIT $1 OFFSET $2;
        `;
        const offset: number = (params.page - 1) * params.limit;

        try {
            const result = await pgPoolQuery(sql, [params.limit, offset, lang]);

            if (!result.rows || result.rows.length === 0) {
                return [];
            }

            return result.rows;
        } catch (error) {
            console.error(`Error fetching series: ${error instanceof Error ? error.message : 'Unknown error'}`);
            throw new Error(`Error fetching series: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }

    static async delete(id: number): Promise<void> {
        try {
            const seriesQuery = 'SELECT movies FROM series WHERE id = $1 AND deleted_at IS NULL';
            const seriesResult = await pgPoolQuery(seriesQuery, [id]);

            if (!seriesResult.rows.length) {
                throw new Error('Series not found or already deleted');
            }

            const moviesArray = seriesResult.rows[0].movies;

            const updateSeriesQuery = `
            UPDATE series
            SET deleted_at = NOW()
            WHERE id = $1
              AND deleted_at IS NULL
        `;
            await pgPoolQuery(updateSeriesQuery, [id]);

            if (moviesArray && moviesArray.length > 0) {
                const markMoviesAsDeletedQuery = `
                UPDATE movies
                SET deleted_at = NOW()
                WHERE id = ANY($1::int[])
                  AND deleted_at IS NULL
            `;
                await pgPoolQuery(markMoviesAsDeletedQuery, [moviesArray]);
            }
        } catch (error) {
            console.error('Error deleting series and marking associated movies as deleted:', error);
            throw new Error('Failed to delete series and mark associated movies as deleted');
        }
    }

    static async update(params: SeriesModule): Promise<SeriesModule> {
        const code = parseInt(params.code as unknown as string, 10);
        if (isNaN(code)) {
            throw new Error('Invalid code value');
        }

        const sql = `
    UPDATE public.series
    SET name = $1,
        movies = $2,
        genre = $3,
        seen = $4,
        year = $5,
        state = $6,
        code = $7,
        create_admin_id = $8,
        updated_at = NOW()
    WHERE id = $9
    RETURNING id, name, movies, genre, seen, year, state, code, create_admin_id, created_at, updated_at, deleted_at;
    `;

        try {
            const result = await pgPoolQuery(sql, [
                params.name,
                params.movies,
                params.genre,
                params.seen,
                params.year,
                params.state,
                code,
                params.create_admin_id,
                params.id
            ]);

            if (!result.rows || result.rows.length === 0) {
                return result.rows[0] as SeriesModule;
            }

            return result.rows[0] as SeriesModule;
        } catch (error) {
            console.error('Error updating series:', error);
            throw new Error('Failed to update series');
        }
    }



    static async frontendGetAll(params: { limit: number, page: number },language:string): Promise<any[]> {
        if (params.limit <= 0 || params.page <= 0) {
            throw new Error('Invalid pagination parameters');
        }
        const lang=language||'uz';

        const sql = `
            SELECT
                id,
                name ->> $3 AS name,
                create_admin_id,
                movies,
                seen,
                state,
                year,
                code,
                created_at,
                updated_at
            FROM public.series
            WHERE deleted_at IS NULL
            ORDER BY id ASC
                LIMIT $1 OFFSET $2;
        `;
        const offset: number = (params.page - 1) * params.limit;

        try {
            const result = await pgPoolQuery(sql, [params.limit, offset, lang]);

            if (!result.rows || result.rows.length === 0) {
                return [];
            }

            return result.rows;
        } catch (error) {
            console.error(`Error fetching series: ${error instanceof Error ? error.message : 'Unknown error'}`);
            throw new Error(`Error fetching series: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }

    static async FrontendGetOne(params: { id: number }, language: string): Promise<SeriesModule | null> {
        const lang = language || 'uz';

        const sqlSeries = `
        SELECT
            id,
            name ->> $2 AS name,
            movies,
            state,
            year,
            code,
            genre,
            seen,
            create_admin_id,
            movies
        FROM
            series
        WHERE
            id = $1
            AND deleted_at IS NULL;
    `;

        try {
            const resultSeries = await pgPoolQuery(sqlSeries, [params.id, lang]);

            if (!resultSeries.rows || resultSeries.rows.length === 0) {
                return null;
            }

            const series = resultSeries.rows[0];

            const seriesResponse: SeriesModule = {
                id: series.id,
                name: series.name,
                state: series.state,
                year: series.year,
                code: series.code,
                genre: series.genre,
                seen: series.seen,
                create_admin_id: series.create_admin_id,
                movies: series.movies || [],
            };

            return seriesResponse;
        } catch (error) {
            console.error(`Error fetching series by ID: ${error instanceof Error ? error.message : 'Unknown error'}`);
            throw new Error('Error fetching series by ID');
        }
    }

    static async frontendGetAllMovies(params: { limit: number, page: number, movies_id: number[] }, language: string): Promise<any[]> {
        if (params.limit <= 0 || params.page <= 0) {
            throw new Error('Invalid pagination parameters');
        }

        const lang = language || 'uz'; // Default language is 'uz'
        const offset: number = (params.page - 1) * params.limit;

        const sql = `
        SELECT 
            id,
            name->>\$1 AS name,
            url->>\$1 AS url,
            quality,
            duration,
            state,
            year,
            genre,
            seen,
            movie_type,
            created_at,
            updated_at
        FROM movies
        WHERE id = ANY(\$2)
        AND movie_type = 'serie'
        AND deleted_at IS NULL
        LIMIT \$3
        OFFSET \$4;
    `;

        try {
            const result = await pgPoolQuery(sql, [lang, params.movies_id, params.limit, offset]);

            if (!result.rows || result.rows.length === 0) {
                return [];
            }

            return result.rows;
        } catch (error) {
            console.error(`Error fetching movies: ${error instanceof Error ? error.message : 'Unknown error'}`);
            throw new Error(`Error fetching movies: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }



}
