import { InvalidParamError } from '../errors/invalid-param';
import { MissingParamError } from '../errors/missing-param';
import { EmailValidator } from '../protocols/email-validator';
import { SignUpController } from './signup';

import fixtures from './signup.fixtures';

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
					...fixtures.signUpParams,
					name: undefined
				}
			};

			const httpResponse = sut.handle(httpRequest);

			expect(httpResponse.statusCode).toBe(400);
			expect(httpResponse.body).toEqual(new MissingParamError('name'));
		});

		it('Should return 400 if no email is provided', () => {
			const httpRequest = {
				body: {
					...fixtures.signUpParams,
					email: undefined
				}
			};

			const httpResponse = sut.handle(httpRequest);

			expect(httpResponse.statusCode).toBe(400);
			expect(httpResponse.body).toEqual(new MissingParamError('email'));
		});

		it('Should return 400 if no password is provided', () => {
			const httpRequest = {
				body: {
					...fixtures.signUpParams,
					password: undefined
				}
			};

			const httpResponse = sut.handle(httpRequest);

			expect(httpResponse.statusCode).toBe(400);
			expect(httpResponse.body).toEqual(new MissingParamError('password'));
		});

		it('Should return 400 if no passwordConfirmation is provided', () => {
			const httpRequest = {
				body: {
					...fixtures.signUpParams,
					passwordConfirmation: undefined
				}
			};

			const httpResponse = sut.handle(httpRequest);

			expect(httpResponse.statusCode).toBe(400);
			expect(httpResponse.body).toEqual(new MissingParamError('passwordConfirmation'));
		});

		it('Should return 400 if email is invalid', () => {
			jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false);

			const httpRequest = {
				body: fixtures.signUpParams
			};

			const httpResponse = sut.handle(httpRequest);

			expect(httpResponse.statusCode).toBe(400);
			expect(httpResponse.body).toEqual(new InvalidParamError('email'));
		});

		it('Should return 400 if passwords are different', () => {
			const httpRequest = {
				body: {
					...fixtures.signUpParams,
					passwordConfirmation: 'wrong-password'
				}
			};

			const httpResponse = sut.handle(httpRequest);

			expect(httpResponse.statusCode).toBe(400);
			expect(httpResponse.body).toEqual(new InvalidParamError('passwordConfirmation'));
		});

		it('Should return 200', () => {
			jest.spyOn(emailValidatorStub, 'isValid');

			const httpRequest = {
				body: fixtures.signUpParams
			};

			const httpResponse = sut.handle(httpRequest);

			expect(emailValidatorStub.isValid).toHaveBeenNthCalledWith(1, fixtures.signUpParams.email);
			expect(httpResponse.statusCode).toBe(200);
		});
	});
});
