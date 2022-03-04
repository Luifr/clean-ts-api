import { EmailValidator } from '@interfaces/email-validator';
import { AccountModel } from '@domain/usecases/account';
import { AddAccount, AddAccountModel } from '@domain/usecases/add-account';
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
			async add(user: AddAccountModel) {
				const fakeAccount: AccountModel = {
					...user,
					id: fixtures.userId,
				};

				return fakeAccount;
			}
		}

		emailValidatorStub = new EmailValidatorStub();
		addAccountStub = new AddAccountStub();
		sut = new SignUpController(emailValidatorStub, addAccountStub);
	});

	describe('handle', () => {
		it('Should return 400 if no name is provided', async () => {
			const httpRequest = {
				body: {
					...fixtures.signUpParams,
					name: undefined
				}
			};

			const httpResponse = await sut.handle(httpRequest);

			expect(httpResponse.statusCode).toBe(400);
			expect(httpResponse.body).toStrictEqual(new MissingParamError('name'));
		});

		it('Should return 400 if no email is provided', async () => {
			const httpRequest = {
				body: {
					...fixtures.signUpParams,
					email: undefined
				}
			};

			const httpResponse = await sut.handle(httpRequest);

			expect(httpResponse.statusCode).toBe(400);
			expect(httpResponse.body).toStrictEqual(new MissingParamError('email'));
		});

		it('Should return 400 if no password is provided', async () => {
			const httpRequest = {
				body: {
					...fixtures.signUpParams,
					password: undefined
				}
			};

			const httpResponse = await sut.handle(httpRequest);

			expect(httpResponse.statusCode).toBe(400);
			expect(httpResponse.body).toStrictEqual(new MissingParamError('password'));
		});

		it('Should return 400 if no passwordConfirmation is provided', async () => {
			const httpRequest = {
				body: {
					...fixtures.signUpParams,
					passwordConfirmation: undefined
				}
			};

			const httpResponse = await sut.handle(httpRequest);

			expect(httpResponse.statusCode).toBe(400);
			expect(httpResponse.body).toStrictEqual(new MissingParamError('passwordConfirmation'));
		});

		it('Should return 400 if email is invalid', async () => {
			jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false);

			const httpRequest = {
				body: fixtures.signUpParams
			};

			const httpResponse = await sut.handle(httpRequest);

			expect(httpResponse.statusCode).toBe(400);
			expect(httpResponse.body).toStrictEqual(new InvalidParamError('email'));
		});

		it('Should return 400 if passwords are different', async () => {
			const httpRequest = {
				body: {
					...fixtures.signUpParams,
					passwordConfirmation: 'wrong-password'
				}
			};

			const httpResponse = await sut.handle(httpRequest);

			expect(httpResponse.statusCode).toBe(400);
			expect(httpResponse.body).toStrictEqual(new InvalidParamError('passwordConfirmation'));
		});

		it('Should return 200 if all params are valid', async () => {
			const httpRequest = {
				body: fixtures.signUpParams
			};

			const newAccount = { ...fixtures.signUpParams } as any;
			delete newAccount.passwordConfirmation;

			jest.spyOn(emailValidatorStub, 'isValid');
			jest.spyOn(addAccountStub, 'add');

			const httpResponse = await sut.handle(httpRequest);

			expect(addAccountStub.add).toHaveBeenNthCalledWith(1, newAccount);
			expect(emailValidatorStub.isValid).toHaveBeenNthCalledWith(1, fixtures.signUpParams.email);
			expect(httpResponse.statusCode).toBe(200);
			expect(httpResponse.body).toStrictEqual({ ...newAccount, id: fixtures.userId });
		});
	});
});
