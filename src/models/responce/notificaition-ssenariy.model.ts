import {BaseModel, BaseStatusEnum} from "..";

export interface NotificaitionSsenariyModel extends BaseModel {
    ssenariy_id: number;
    content: { ru: string, uz: string, en: string } | null,
    template_id: number | null,
    day: number,
    status: BaseStatusEnum
}
