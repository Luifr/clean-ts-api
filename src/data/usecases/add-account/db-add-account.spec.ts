import { Encrypter } from '@data/interfaces/encrypter';
import { DbAddAccount } from './db-add-account';

describe('DbAddAccount', () => {
	let sut: DbAddAccount;
	let encrypterStub: Encrypter;

	beforeEach(() => {
		class EncrypterStub implements Encrypter {
			async encrypt(value: string): Promise<string> {
				return value;
			}
		}

		encrypterStub = new EncrypterStub();
		sut = new DbAddAccount(encrypterStub);
	});

	describe('add', () => {
		it('smoke test', () => {
			const accountData = {
				name: 'any_name',
				email: 'name@email.com',
				password: 'any_password',
			};

			jest.spyOn(encrypterStub, 'encrypt');

			sut.add(accountData);

			expect(encrypterStub.encrypt).toHaveBeenNthCalledWith(1, accountData.password);
		});

		it('should throw if encrypter throws', async () => {
			const accountData = {
				name: 'any_name',
				email: 'name@email.com',
				password: 'any_password',
			};

			jest.spyOn(encrypterStub, 'encrypt').mockRejectedValueOnce(new Error());

			const promise = sut.add(accountData);

			await expect(promise).rejects.toThrow();
		});
	});
});
