import { AddAccountRepository } from '@data/interfaces/add-account-repository';
import { AccountModel } from '@domain/usecases/account';
import { AddAccountModel } from '@domain/usecases/add-account';
import { MongoClient } from 'mongodb';

export class AccountMongoRepository implements AddAccountRepository {
	constructor(private readonly mongoClient: MongoClient) {}

	async add(accountData: AddAccountModel): Promise<AccountModel> {

		const { insertedId } =
			await this.mongoClient.db().collection('accounts').insertOne(accountData);

		return {
			...accountData,
			id: insertedId.toString()
		};
	}
}
