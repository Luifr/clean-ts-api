import { IHttpRequest, IHttpResponse } from '@interfaces/http';

export interface IController {
	handle(httpRequest: IHttpRequest): Promise<IHttpResponse>;
}
