import {StatisticsModel} from "../models";
import {StatisticsRepository} from "../repository";


export class StatisticsService {
    static async incrementWatchedCount(params: { type: string }): Promise<StatisticsModel | null> {
        const now = new Date();
        const currentMonth = now.toISOString().slice(0, 7);
        const currentType = params.type;

        if (!['web', 'bot'].includes(currentType)) {
            throw new Error('Enter a valid type: web or bot');
        }

        try {
            const existingRecord = await StatisticsRepository.findLatestByMonthAndType(currentMonth, currentType);

            if (existingRecord) {
                return await StatisticsRepository.incrementWatchedCount(existingRecord.id);
            } else {
                return await StatisticsRepository.createStatistics(currentMonth, currentType);
            }
        } catch (error) {
            console.error('Error updating or creating watched count for current month and type:', error);
            throw new Error('Error updating or creating watched count for current month and type');
        }
    }
}
