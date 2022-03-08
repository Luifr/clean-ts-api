import { Encrypter } from '@data/interfaces/encrypter';
import bcrypt from 'bcrypt';
import { BcryptAdapter } from './bcrypt-adapter';

describe('BcryptAdapter', () => {
	const salt = 12;
	let sut: Encrypter;

	beforeEach(() => {
		sut = new BcryptAdapter(salt);
	});

	describe('encrypt', () => {
		it('smoke test', async () => {
			const value = 'any_value';
			const hashedValue = 'example';

			jest.spyOn(bcrypt, 'hash').mockImplementationOnce(async () => hashedValue);

			const response = await sut.encrypt(value);

			expect(bcrypt.hash).toHaveBeenNthCalledWith(1, value, salt);
			expect(response).toEqual(hashedValue);
		});

		it('should throw if bcrypt throws', async () => {
			jest.spyOn(bcrypt, 'hash').mockImplementationOnce(async () => {
				throw new Error();
			});

			const promise = sut.encrypt('any_value');

			await expect(promise).rejects.toThrowError();
		});
	});
});
