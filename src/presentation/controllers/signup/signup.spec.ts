import { EmailValidator } from '@interfaces/email-validator';
import { AccountModel } from '@domain/usecases/account';
import { AddAccount } from '@domain/usecases/add-account';
import { InvalidParamError } from '@errors/invalid-param';
import { MissingParamError } from '@errors/missing-param';
import { SignUpController } from './signup';

import fixtures from './signup.fixtures';

describe('SignUpController', () => {

	// sut === System under test
	let sut: SignUpController;
	let addAccountStub: AddAccount;
	let emailValidatorStub: EmailValidator;

	beforeEach(() => {
		jest.restoreAllMocks();
		class EmailValidatorStub implements EmailValidator {
			isValid (_email: string): boolean {
				return true;
			}
		}

		class AddAccountStub implements AddAccount {
			add() {
				const fakeAccount: AccountModel = {
					id: 'valid_id',
					name: 'valid_name',
					email: 'valid@email.com',
					password: 'valid_password'
				};

				return fakeAccount;
			}
		}

		emailValidatorStub = new EmailValidatorStub();
		addAccountStub = new AddAccountStub();
		sut = new SignUpController(emailValidatorStub, addAccountStub);
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
			const httpRequest = {
				body: fixtures.signUpParams
			};

			jest.spyOn(emailValidatorStub, 'isValid');
			jest.spyOn(addAccountStub, 'add');

			const httpResponse = sut.handle(httpRequest);

			expect(addAccountStub.add).toHaveBeenNthCalledWith(1, {
				...fixtures.signUpParams,
				passwordConfirmation: undefined
			});
			expect(emailValidatorStub.isValid).toHaveBeenNthCalledWith(1, fixtures.signUpParams.email);
			expect(httpResponse.statusCode).toBe(200);
		});
	});
});
