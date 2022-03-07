import { AddAccountRepository } from '@data/interfaces/add-account-repository';
import { Encrypter } from '@data/interfaces/encrypter';
import { AccountModel } from '@domain/usecases/account';
import { AddAccount, AddAccountModel } from '@domain/usecases/add-account';

export class DbAddAccount implements AddAccount{
	constructor (
		private readonly encrypter: Encrypter,
		private readonly addAccountRepository: AddAccountRepository
	) {}

	async add(accountToAdd: AddAccountModel): Promise<AccountModel> {
		const encryptedPassword = await this.encrypter.encrypt(accountToAdd.password);

		const account = await this.addAccountRepository.add(
			{ ...accountToAdd, password: encryptedPassword }
		);

		return account;
	}
}
