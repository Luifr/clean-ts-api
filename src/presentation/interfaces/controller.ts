import { IHttpRequest, IHttpResponse } from '@presentation/interfaces/http';

export interface IController {
	handle(httpRequest: IHttpRequest): Promise<IHttpResponse>;
}
