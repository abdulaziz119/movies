import {BaseModel} from "..";

export interface LevelModel extends BaseModel {
    id: number;
    phone: bigint;
    name: {
        ru: string,
        uz: string,
        en: string
    },
    position: number;
    limit: number;
    prize_id: number;
    ssenariy_id: number;
}