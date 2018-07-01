export class RestResponse<T> {
    code: number;
    msg: string;
    result: T;
}
