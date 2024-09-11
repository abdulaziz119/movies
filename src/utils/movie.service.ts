import {
    ErrorEnum, MoviesModel, StatisticsService,
} from '..';
import { MoviesRepository} from "../repository";
import {ValidationException} from "../exceptions/validation.exception";


export class MovieService {

    static async frontendGetOne(params: { id: number }, language: string): Promise<any> {
        try {
            const result = await MoviesRepository.frontendGetOne(params,language)
            await StatisticsService.incrementWatchedCount({type: 'web'})
            return result
        }catch (error) {
            throw new ValidationException(ErrorEnum.FailedToCreateStatistics)
        }
    }

    static async getFilteredMovies(params: { page: number, limit: number, year?: string, genre?: string, name?: string }): Promise<MoviesModel[]> {
        if (params.limit <= 0 || params.page <= 0) {
            throw new Error('Invalid pagination parameters');
        }

        let sql = `
        SELECT *,
            CASE
                WHEN name->>'en' ILIKE $1 THEN 'en'
                WHEN name->>'ru' ILIKE $1 THEN 'ru'
                WHEN name->>'uz' ILIKE $1 THEN 'uz'
                ELSE NULL
            END AS detected_language,
            CASE
                WHEN name->>'en' ILIKE $1 THEN name->>'en'
                WHEN name->>'ru' ILIKE $1 THEN name->>'ru'
                WHEN name->>'uz' ILIKE $1 THEN name->>'uz'
                ELSE NULL
            END AS detected_name,
            CASE
                WHEN name->>'en' ILIKE $1 THEN url->>'en'
                WHEN name->>'ru' ILIKE $1 THEN url->>'ru'
                WHEN name->>'uz' ILIKE $1 THEN url->>'uz'
                ELSE NULL
            END AS detected_url
        FROM movies 
        WHERE movie_type = 'movie' 
        AND deleted_at IS NULL
    `;

        const queryParams: (string | number)[] = [];
        const nameParam = params.name ? `%${params.name}%` : '%';
        queryParams.push(nameParam);

        if (params.year) {
            sql += ` AND year = $${queryParams.length + 1}`;
            queryParams.push(params.year);
        }

        if (params.genre) {
            sql += ` AND genre = $${queryParams.length + 1}`;
            queryParams.push(params.genre);
        }

        if (params.name) {
            sql += ` AND (
            name->>'en' ILIKE $${queryParams.length + 1} OR 
            name->>'ru' ILIKE $${queryParams.length + 1} OR 
            name->>'uz' ILIKE $${queryParams.length + 1}
        )`;
            queryParams.push(nameParam);
        }

        const offset: number = (params.page - 1) * params.limit;
        if (!params.year && !params.genre && !params.name) {
            sql += `
            ORDER BY seen DESC
            LIMIT $${queryParams.length + 1} OFFSET $${queryParams.length + 2}
        `;
        } else {
            sql += `
            ORDER BY created_at DESC
            LIMIT $${queryParams.length + 1} OFFSET $${queryParams.length + 2}
        `;
        }
        queryParams.push(params.limit, offset);

        try {
            const movies = await MoviesRepository.getFilteredMovies(sql, queryParams);

            return movies.map(row => ({
                ...row,
                name: row.detected_name,
                url: row.detected_url
            })) as MoviesModel[];
        } catch (error) {
            console.error(`Error fetching filtered movies: ${error instanceof Error ? error.message : 'Unknown error'}`);
            throw new Error(`Error fetching filtered movies: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }


}
