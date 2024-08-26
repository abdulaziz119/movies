import {BaseModel, PrizeModel} from ".";
import {TYPE_OF_CONDITION} from "..";

export interface SsenariyModel extends BaseModel {
    name: string;
    description: string;
    type_of_condition: TYPE_OF_CONDITION; //ENUM
    days: number;
    prize_id: number|null; //FOREIGN KEY
    position: number;
}

export interface SsenariyWithRelationModel extends SsenariyModel {
    prize: PrizeModel
}
