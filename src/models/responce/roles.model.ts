import {BaseModel} from ".";

export interface RolesModel extends BaseModel {
    admin_id?: number;
    admin: {
        create: boolean,
        update: boolean,
        delete: boolean
    };
    roles: {
        create: boolean,
        update: boolean,
        delete: boolean
    };
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
    series: {
        create: boolean,
        update: boolean,
        delete: boolean
    };
    statistics: {
        create: boolean,
        update: boolean,
        delete: boolean
    };
    advertising: {
        create: boolean,
        update: boolean,
        delete: boolean
    };
    uploads: {
        create: boolean,
        update: boolean,
        delete: boolean
    };
}