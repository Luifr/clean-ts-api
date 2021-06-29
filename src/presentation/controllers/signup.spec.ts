import { MissingParamError } from '../errors/missing-param-name';
import { SignUpController } from './signup';

// sut === System under test
const makeSut = () => {
	return new SignUpController();
};

describe('SignUp Controller', () => {
	it('Should return 400 if no name is provided', () => {
		const sut = makeSut();
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
		const sut = makeSut();
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
		const sut = makeSut();
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
		const sut = makeSut();
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

	it('Should return 200', () => {
		const sut = makeSut();
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
