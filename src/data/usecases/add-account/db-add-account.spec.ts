import { AddAccountRepository } from '@data/interfaces/add-account-repository';
import { Encrypter } from '@data/interfaces/encrypter';
import { AccountModel } from '@domain/usecases/account';
import { AddAccountModel } from '@domain/usecases/add-account';
import { DbAddAccount } from './db-add-account';

describe('DbAddAccount', () => {
	let sut: DbAddAccount;
	let encrypterStub: Encrypter;
	let addAccountRepositoryStub: AddAccountRepository;

	beforeEach(() => {
		class EncrypterStub implements Encrypter {
			async encrypt(value: string): Promise<string> {
				return value;
			}
		}

		class AddAccountRepositoryStub implements AddAccountRepository {
			async add(_accountData: AddAccountModel): Promise<AccountModel> {
				return {
					mockedUserData: 'any_value',
				} as any;
			}
		}

		addAccountRepositoryStub = new AddAccountRepositoryStub();
		encrypterStub = new EncrypterStub();
		sut = new DbAddAccount(encrypterStub, addAccountRepositoryStub);
	});

	describe('add', () => {
		it('smoke test', async () => {
			const accountData = {
				name: 'any_name',
				email: 'name@email.com',
				password: 'any_password',
			};

			const encryptedPassword = 'asd';
			const addAccountMockData = { mockedUserData: 'any_value' } as any;

			jest.spyOn(encrypterStub, 'encrypt').mockResolvedValue(encryptedPassword);
			jest.spyOn(addAccountRepositoryStub, 'add').mockResolvedValue(addAccountMockData);

			const result = await sut.add(accountData);

			expect(encrypterStub.encrypt).toHaveBeenNthCalledWith(1, accountData.password);
			expect(addAccountRepositoryStub.add).toHaveBeenNthCalledWith(1,
				{ ...accountData, password: encryptedPassword }
			);
			expect(result).toStrictEqual(addAccountMockData);
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

		it('should throw if encrypter throws', async () => {
			const accountData = {
				name: 'any_name',
				email: 'name@email.com',
				password: 'any_password',
			};

			jest.spyOn(addAccountRepositoryStub, 'add').mockRejectedValueOnce(new Error());

			const promise = sut.add(accountData);

			await expect(promise).rejects.toThrow();
		});
	});
});
