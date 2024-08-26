import { PaginationParams } from ".";

export interface QueryParams extends PaginationParams {
    search: string | undefined;
    date: any | undefined;
    status: number | undefined;
}