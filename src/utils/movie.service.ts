import {
    ErrorEnum,
} from '..';
import { MoviesRepository, StatisticsRepository} from "../repository";
import {ValidationException} from "../exceptions/validation.exception";


export class MovieService {

    static async getOne(params: { id: number }, language: string): Promise<any> {
        try {
            const result = await MoviesRepository.getOne(params,language)
            await StatisticsRepository.checkSeriesCreate({type: 'weep'});
            return result
        }catch (error) {
            throw new ValidationException(ErrorEnum.FailedToCreateStatistics)
        }
    }
}
