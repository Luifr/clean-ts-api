import { EmailValidator } from '@interfaces/email-validator';
import { EmailValidatorAdapter } from './email-validator-adapter';

describe('EmailValidatorAdapter', () => {
	let sut: EmailValidator;

	beforeEach(() => {
		sut = new EmailValidatorAdapter();
	});

	describe('isValid', () => {
		it('Should return true if email is valid', async () => {
			const isValid = sut.isValid('valid@email.com');

			expect(isValid).toBe(true);
		});

		it('Should return false if email is invalid', async () => {
			const isValid = sut.isValid('invalid@email');

			expect(isValid).toBe(false);
		});
	});
});
