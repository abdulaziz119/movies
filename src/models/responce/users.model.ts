import { BaseModel } from ".";

export interface UsersModel extends BaseModel {
    user_id: number;
    language: string;
    activate_date: Date;
}
