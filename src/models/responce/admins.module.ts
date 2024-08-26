import {BaseModel} from "..";

export interface AdminModel extends BaseModel {
    first_name: string,
    last_name: string,
    language:string
    role_id: number,
    boss_admin: boolean,
    email: string,
    password: string
}