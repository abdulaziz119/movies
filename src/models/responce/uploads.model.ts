import {BaseModel} from "..";

export interface UploadsModel extends BaseModel {
    id: number;
    url: string;
    movie_id: number;
}