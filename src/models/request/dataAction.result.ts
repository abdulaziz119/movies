export interface DataActionResult<T> {
    items: T | null;
    isSuccess: boolean;
    message?: any;
}

export interface ActionResult<T> {
    items: T[];
    isSuccess: boolean;
    message?: any;
}