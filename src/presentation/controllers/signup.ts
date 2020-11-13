import { MissingParamError } from '../errors/missing-param-name';
import { badRequest } from '../helpers/http-helper';
import { IHttpRequest, IHttpResponse } from '../protocols/http';

export class SignUpController {
	handle(httpRequest: IHttpRequest): IHttpResponse {
		if (!httpRequest.body.name) {
			return badRequest(new MissingParamError('name'));
		}
		else if (!httpRequest.body.email) {
			return badRequest(new MissingParamError('email'));
		}
		return {
			statusCode: 200,
			body: {}
		};
	}
}
