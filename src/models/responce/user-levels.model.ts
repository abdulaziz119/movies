import {BaseModel} from "..";

export interface UserLevelModel extends BaseModel {
    phone: number;
    level_id: number
    month: string
}