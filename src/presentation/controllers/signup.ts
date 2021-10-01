import { InvalidParamError } from '../errors/invalid-param';
import { MissingParamError } from '../errors/missing-param';
import { badRequest } from '../helpers/http-helper';
import { IController } from '../protocols/controller';
import { EmailValidator } from '../protocols/email-validator';
import { IHttpRequest, IHttpResponse } from '../protocols/http';

export class SignUpController implements IController{
	constructor(private readonly emailValidator: EmailValidator) { }

	handle(httpRequest: IHttpRequest): IHttpResponse {
		const requiredFields = ['name', 'email', 'password', 'passwordConfirmation'];

		for (const requiredField of requiredFields) {
			if (!httpRequest.body[requiredField]) {
				return badRequest(new MissingParamError(requiredField));
			}
		}

		const emailIsValid = this.emailValidator.isValid(httpRequest.body.email);
		if (!emailIsValid){
			return badRequest(new InvalidParamError('email'));
		}

		return {
			statusCode: 200,
			body: {}
		};
	}
}
