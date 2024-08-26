import {BaseModel} from ".";

export interface RolesModel extends BaseModel {
    movies: {
        create: boolean,
        update: boolean,
        delete: boolean
    };
    users: {
        create: boolean,
        update: boolean,
        delete: boolean
    };
    admin: {
        create: boolean,
        update: boolean,
        delete: boolean
    };
}