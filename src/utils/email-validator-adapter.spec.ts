import { EmailValidator } from '@presentation/interfaces/email-validator';
import validator from 'validator';
import { EmailValidatorAdapter } from './email-validator-adapter';

describe('EmailValidatorAdapter', () => {
	let sut: EmailValidator;

	beforeEach(() => {
		jest.spyOn(validator, 'isEmail').mockReturnValue(true);

		sut = new EmailValidatorAdapter();
	});

	describe('isValid', () => {
		it('Should return false if email is invalid', async () => {
			jest.spyOn(validator, 'isEmail').mockReturnValue(false);

			const isValid = sut.isValid('invalid@email.com');

			expect(isValid).toBe(false);
		});

		it('should pass parameter and return true when is valid', () => {
			const email = 'valid@email.com';

			const isValid = sut.isValid(email);

			expect(isValid).toBe(true);
			expect(validator.isEmail).toHaveBeenNthCalledWith(1, email);
		});
	});
});
