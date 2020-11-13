import { IHttpRequest, IHttpResponse } from './http';

export interface IController {
	handle(httpRequest: IHttpRequest): IHttpResponse;
}
