import { AddAccount } from '@domain/usecases/add-account';
import { InvalidParamError } from '@errors/invalid-param';
import { MissingParamError } from '@errors/missing-param';
import { badRequest, okResponse } from '@helpers/http-helper';
import { IController } from '@interfaces/controller';
import { EmailValidator } from '@interfaces/email-validator';
import { IHttpRequest, IHttpResponse } from '@interfaces/http';

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

		// TODO: what if this throws an error? Add test for it
		const account = await this.addAccount.add({
			email: body.email,
			name: body.name,
			password: body.password,
		});

		return okResponse(account);
	}
}
