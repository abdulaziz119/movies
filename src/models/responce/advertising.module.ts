import {BaseModel} from "..";

export interface AdvertisingModule extends BaseModel {
    upload_id: number,
    seen: number,
    finish:number
    create_admin_id: number,
}