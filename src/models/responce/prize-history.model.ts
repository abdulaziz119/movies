import {BaseModel} from "..";
import {PrizeHistoryEnum} from "../enums/prize-history.enum";

export interface PrizeHistoryModel extends BaseModel {
    prize_id: number,
    user_id: number,
    story_ssenariy_id: number | null,
    status: PrizeHistoryEnum
    level_id?: number | null
}