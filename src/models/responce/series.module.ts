import {BaseModel} from "..";

export interface SeriesModule extends BaseModel {
    name: {
        uz: string,
        ru: string,
        en: string
    },
    movies: number[],
    create_admin_id:number
}