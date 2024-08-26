import { BaseModel } from ".";

export interface StatisticsModel extends BaseModel {
    watched: number;
    exits: number;
    not_exited: number;
    month: string;
    type: string;
}