import {BaseModel} from ".";

export interface RolesModel extends BaseModel {
    admin_id?: number;
    admin: {
        create: boolean,
        getOne: boolean,
        getAll: boolean,
        update: boolean,
        delete: boolean
    };
    roles: {
        create: boolean,
        getOne: boolean,
        getAll: boolean,
        update: boolean,
        delete: boolean
    };
    movies: {
        create: boolean,
        getOne: boolean,
        getAll: boolean,
        update: boolean,
        delete: boolean
    };
    users: {
        create: boolean,
        getOne: boolean,
        getAll: boolean,
        update: boolean,
        delete: boolean
    };
    series: {
        create: boolean,
        getOne: boolean,
        getAll: boolean,
        update: boolean,
        delete: boolean
    };
    statistics: {
        create: boolean,
        getOne: boolean,
        getAll: boolean,
        update: boolean,
        delete: boolean
    };
    advertising: {
        create: boolean,
        getOne: boolean,
        getAll: boolean,
        update: boolean,
        delete: boolean
    };
    uploads: {
        create: boolean,
        getOne: boolean,
        getAll: boolean,
        update: boolean,
        delete: boolean
    };
}