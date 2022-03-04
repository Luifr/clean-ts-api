import { InvalidParamError } from '../errors/invalid-param';
import { MissingParamError } from '../errors/missing-param';
import { EmailValidator } from '../protocols/email-validator';
import { SignUpController } from './signup';

describe('SignUpController', () => {

	// sut === System under test
	let sut: SignUpController;
	let emailValidatorStub: EmailValidator;

	beforeEach(() => {
		jest.restoreAllMocks();
		class EmailValidatorStub implements EmailValidator {
			isValid (_email: string): boolean {
				return true;
			}
		}

		emailValidatorStub = new EmailValidatorStub();
		sut = new SignUpController(emailValidatorStub);
	});

	describe('handle', () => {
		it('Should return 400 if no name is provided', () => {
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
});
