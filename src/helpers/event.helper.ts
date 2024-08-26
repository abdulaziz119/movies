import {HunterProvider} from "../providers/hunter.provider";
import {StatusCodes} from "http-status-codes";
import {NotificationProvider} from "../providers/notification.provider";
import {SmsProvider} from "../providers/sms.provider";
import env from "../utils/env";
import {LEVEL_COMPLETED_TEMPLATE, LEVEL_HALF_TEMPLATE, NEW_STARTER_TEMPLATE} from "../enums/notification";
import {LevelModel, PrizeModel, UserModel} from "../models";

function getService() {
    return env('MERCHANT_ID', 1) == 1 ? 'level-al' : 'level-gf';
}

export class EventHelper {

    async newStarter(user: UserModel): Promise<void> {
        const userEvent = await Promise.all([
            HunterProvider.createUserEvent(user.id, getService(), StatusCodes.OK, 'Streak Started', {}),
            NotificationProvider.send(user.id, NEW_STARTER_TEMPLATE.notification, []),
            SmsProvider.sendMessage(user.phone, user.language, NEW_STARTER_TEMPLATE.sms, [])
        ])
        console.log(userEvent, 'userEvent')
    }

    async levelHalf(user: UserModel, level: LevelModel): Promise<void> {
        await NotificationProvider.send(user.id, LEVEL_HALF_TEMPLATE.notification, [level.name[user.language]])
        await SmsProvider.sendMessage(user.phone, user.language, LEVEL_HALF_TEMPLATE.sms, [level.name[user.language]])
    }

    async levelCompleted(user: UserModel, level: LevelModel, prize: PrizeModel): Promise<void> {
        await Promise.all([
            HunterProvider.createUserEvent(user.id, getService(), StatusCodes.OK, 'Streak Level Completed', {
                level: level.name.ru,
                prize: prize.name.ru
            }),
            NotificationProvider.send(user.id, LEVEL_COMPLETED_TEMPLATE.notification, [level.name[user.language], prize.name[user.language]]),
            SmsProvider.sendMessage(user.phone, user.language, LEVEL_COMPLETED_TEMPLATE.sms, [level.name[user.language], prize.name[user.language]])
        ])
    }
}
