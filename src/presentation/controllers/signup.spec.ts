import { MissingParamError } from '../errors/missing-param-name';
import { SignUpController } from './signup';

describe('SignUp Controller', () => {
	test('Should return 400 if no name is provided', () => {
		// sut === System under test
		const sut = new SignUpController();
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

	test('Should return 400 if no email is provided', () => {

		const sut = new SignUpController();
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
});
