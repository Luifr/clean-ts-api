
export interface IHttpResponse<T = any> {
	statusCode: number;
	body: T;
}

export interface IHttpRequest<T = any> {
	body?: T
}
