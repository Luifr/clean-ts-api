import { MissingParamError } from '../errors/missing-param-name';
import { badRequest } from '../helpers/http-helper';
import { IHttpRequest, IHttpResponse } from '../protocols/http';

export class SignUpController {
	handle(httpRequest: IHttpRequest): IHttpResponse {
		const requiredFields = ['name', 'email'];

		for (const requiredField of requiredFields) {
			if (!httpRequest.body[requiredField]) {
				return badRequest(new MissingParamError(requiredField));
			}
		}

		return {
			statusCode: 200,
			body: {}
		};
	}
}
