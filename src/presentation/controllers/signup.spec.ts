import { InvalidParamError } from '../errors/invalid-param';
import { MissingParamError } from '../errors/missing-param';
import { EmailValidator } from '../protocols/email-validator';
import { SignUpController } from './signup';

interface SutTypes {
	sut: SignUpController;
	emailValidatorStub: EmailValidator;
}

// sut === System under test
const makeSut = (): SutTypes => {
	class EmailValidatorStub implements EmailValidator {
		isValid (_email: string): boolean {
			return true;
		}
	}
	const emailValidatorStub = new EmailValidatorStub();
	const sut = new SignUpController(emailValidatorStub);
	return {
		sut,
		emailValidatorStub,
	};
};

describe('SignUp Controller', () => {
	it('Should return 400 if no name is provided', () => {
		const { sut } = makeSut();
		const httpRequest = {
			body: {
				// name: 'anyName',
				email: 'any@any.com',
				password: 'anyPassword',
				passwordConfirmation: 'anyPassword'
			}
		};

		const httpResponse = sut.handle(httpRequest);
		expect(httpResponse.statusCode).toBe(400);
		expect(httpResponse.body).toEqual(new MissingParamError('name'));
	});

	it('Should return 400 if no email is provided', () => {
		const { sut } = makeSut();
		const httpRequest = {
			body: {
				name: 'anyName',
				// email: 'any@any.com',
				password: 'anyPassword',
				passwordConfirmation: 'anyPassword'
			}
		};

		const httpResponse = sut.handle(httpRequest);
		expect(httpResponse.statusCode).toBe(400);
		expect(httpResponse.body).toEqual(new MissingParamError('email'));
	});

	it('Should return 400 if no password is provided', () => {
		const { sut } = makeSut();
		const httpRequest = {
			body: {
				name: 'anyName',
				email: 'any@any.com',
				// password: 'anyPassword',
				passwordConfirmation: 'anyPassword'
			}
		};

		const httpResponse = sut.handle(httpRequest);
		expect(httpResponse.statusCode).toBe(400);
		expect(httpResponse.body).toEqual(new MissingParamError('password'));
	});

	it('Should return 400 if no passwordConfirmation is provided', () => {
		const { sut } = makeSut();
		const httpRequest = {
			body: {
				name: 'anyName',
				email: 'any@any.com',
				password: 'anyPassword',
				// passwordConfirmation: 'anyPassword'
			}
		};

		const httpResponse = sut.handle(httpRequest);
		expect(httpResponse.statusCode).toBe(400);
		expect(httpResponse.body).toEqual(new MissingParamError('passwordConfirmation'));
	});

	it('Should return 400 if email is invalid', () => {
		const { sut, emailValidatorStub } = makeSut();
		jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false);
		const httpRequest = {
			body: {
				name: 'anyName',
				email: 'invalid@any.com',
				password: 'anyPassword',
				passwordConfirmation: 'anyPassword'
			}
		};

		const httpResponse = sut.handle(httpRequest);
		expect(httpResponse.statusCode).toBe(400);
		expect(httpResponse.body).toEqual(new InvalidParamError('email'));
	});

	it('Should return 200', () => {
		const { sut } = makeSut();
		const httpRequest = {
			body: {
				name: 'anyName',
				email: 'any@any.com',
				password: 'anyPassword',
				passwordConfirmation: 'anyPassword'
			}
		};

		const httpResponse = sut.handle(httpRequest);
		expect(httpResponse.statusCode).toBe(200);
	});

});
