import { AddAccount, AddAccountModel } from '@domain/usecases/add-account';
import { InvalidParamError } from '@errors/invalid-param';
import { MissingParamError } from '@errors/missing-param';
import { badRequest } from '@helpers/http-helper';
import { IController } from '@interfaces/controller';
import { EmailValidator } from '@interfaces/email-validator';
import { IHttpRequest, IHttpResponse } from '@interfaces/http';

export class SignUpController implements IController{
	constructor(
		private readonly emailValidator: EmailValidator,
		private readonly addAccount: AddAccount
	) { }

	handle(httpRequest: IHttpRequest): IHttpResponse {
		const requiredFields = ['name', 'email', 'password', 'passwordConfirmation'];

		const { body } = httpRequest;

		for (const requiredField of requiredFields) {
			if (!body[requiredField]) {
				return badRequest(new MissingParamError(requiredField));
			}
		}

		if (body.password !== body.passwordConfirmation) {
			return badRequest(new InvalidParamError('passwordConfirmation'));
		}

		const emailIsValid = this.emailValidator.isValid(body.email);
		if (!emailIsValid){
			return badRequest(new InvalidParamError('email'));
		}

		const newAccount: AddAccountModel = {
			email: body.email,
			name: body.name,
			password: body.password,
		};

		this.addAccount.add(newAccount);

		return {
			statusCode: 200,
			body: {}
		};
	}
}
