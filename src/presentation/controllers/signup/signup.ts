import { AddAccount } from '@domain/usecases/add-account';
import { InvalidParamError } from '@presentation/errors/invalid-param';
import { MissingParamError } from '@presentation/errors/missing-param';
import { badRequest, okResponse, serverError } from '@presentation/helpers/http-helper';
import { IController } from '@presentation/interfaces/controller';
import { EmailValidator } from '@presentation/interfaces/email-validator';
import { IHttpRequest, IHttpResponse } from '@presentation/interfaces/http';

export class SignUpController implements IController{
	constructor(
		private readonly emailValidator: EmailValidator,
		private readonly addAccount: AddAccount
	) { }

	async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
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

		try {
			const account = await this.addAccount.add({
				email: body.email,
				name: body.name,
				password: body.password,
			});

			return okResponse(account);
		}
		catch(e) {
			return serverError();
		}

	}
}
