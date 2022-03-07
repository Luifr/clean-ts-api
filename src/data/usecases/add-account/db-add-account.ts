import { Encrypter } from '@data/interfaces/encrypter';
import { AccountModel } from '@domain/usecases/account';
import { AddAccount, AddAccountModel } from '@domain/usecases/add-account';

export class DbAddAccount implements AddAccount{
	constructor (private readonly encrypter: Encrypter) {}

	async add(account: AddAccountModel): Promise<AccountModel> {
		const { name, email, password } = account;

		const encryptedPassword = await this.encrypter.encrypt(password);

		return {
			id: 'valid_id',
			name,
			email,
			password: encryptedPassword,
		};

	}
}
