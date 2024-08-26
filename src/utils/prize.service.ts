import {
    AuthProvider,
    CoinProvider,
    PackageProvider,
    PrizeHistoryModel,
    PrizeHistoryRepository,
    PrizeModel,
    PrizeTypeEnum,
    StorySsenariyWithRelationModel,
    UserModel
} from "..";
import {PrizeHistoryEnum} from "../models/enums/prize-history.enum";
import {sendAssignPrizeNotification} from "./notification.service";
import {HunterProvider} from "../providers/hunter.provider";

export class PrizeService {

    static async assignByStorySsenariy(storySsenariy: StorySsenariyWithRelationModel): Promise<PrizeHistoryModel> {
        let status: PrizeHistoryEnum

        let user: UserModel = await AuthProvider.getUserById(storySsenariy.user_id)

        status = await this.assign(storySsenariy.ssenariy.prize, user);

        try {
            await sendAssignPrizeNotification(user, storySsenariy)
            await HunterProvider.createUserEvent(storySsenariy.user_id, 'script', 200, 'Script prize assigned', {
                prize: storySsenariy.ssenariy.prize.name['ru'],
                ssenariy: storySsenariy.ssenariy.name
            })
        } catch (error) {
            console.log(error)
        }

        return await PrizeHistoryRepository.create({
            prize_id: storySsenariy.ssenariy.prize_id ?? 0,
            story_ssenariy_id: storySsenariy.id ?? 0,
            user_id: storySsenariy.user_id,
            status: status
        })
    }

    static async assign(prize: PrizeModel, user: UserModel): Promise<PrizeHistoryEnum> {
        let status: PrizeHistoryEnum = PrizeHistoryEnum.completed

        try {
            if (prize.type === PrizeTypeEnum.coin) {
                await CoinProvider.createTransaction(user.id, prize.value)
            } else if (prize.type === PrizeTypeEnum.package) {
                await PackageProvider.createTransaction(user.phone, prize.value)
            }
        } catch (error) {
            status = PrizeHistoryEnum.failed
            console.log('FAILED to assign prize - ' + JSON.stringify(prize) + ', user - ' + JSON.stringify(user))
            console.log(error)
        }

        return status
    }

    static async assignByLevels(prize: PrizeModel, user: UserModel, level_id): Promise<void> {
        let status: PrizeHistoryEnum = await PrizeService.assign(prize, user)
        await PrizeHistoryRepository.create({
            story_ssenariy_id: null,
            prize_id: prize.id || 0,
            user_id: user.id,
            status: status,
            level_id: level_id
        })
    }
}
