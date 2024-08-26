import {BaseModel} from "..";

export interface UserDataModel extends BaseModel {
    phone: number;
    amount:number
    month: string;
    current_level_id:number
}