import {BaseModel} from "..";

export interface MoviesModel extends BaseModel {
    code: number,
    name: {
        uz: string,
        ru: string,
        en: string
    },
    language: {
        uz: string,
        ru: string,
        en: string
    }
    quality: string,
    duration: string,
    state: string,
    year: string,
    genre: string,
    create_admin_id: number,
    seen: number,
}