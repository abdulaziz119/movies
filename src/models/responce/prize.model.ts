import {BaseModel, PrizeTypeEnum} from "..";

export interface PrizeModel extends BaseModel {
    name: {
        ru: string,
        uz: string,
        en: string
    },
    type: PrizeTypeEnum,
    /**
     * package_id or coin amount
     */
    value: number
}