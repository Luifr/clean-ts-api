import { MissingParamError } from '../errors/missing-param-name';
import { badRequest } from '../helpers/http-helper';
import { IController } from '../protocols/controller';
import { IHttpRequest, IHttpResponse } from '../protocols/http';

export class SignUpController implements IController{
	handle(httpRequest: IHttpRequest): IHttpResponse {
		const requiredFields = ['name', 'email', 'password', 'passwordConfirmation'];

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
