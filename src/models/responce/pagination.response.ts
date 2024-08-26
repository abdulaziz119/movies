export interface Pagination {
    current: number;
    previous: number;
    next: number;
    perPage: number;
    totalPage: number
    totalItem: number
}


export interface PaginationResponse<T> {
    pagination: Pagination
    result: T;
}

// export const emptyData: PaginationResponse<any> = {
//     pagination: {
//         current: 1,
//         previous: 0,
//         next: 0,
//         perPage: 10,
//         totalPage: 1,
//         totalItem: 0,
//     },
//     result: []
// }