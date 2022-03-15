import { MongoClient } from 'mongodb';
import { AccountMongoRepository } from './account-mongodb';

describe('AccountMongoRepository', () => {
	let client: MongoClient;
	let sut: AccountMongoRepository;

	beforeAll(async () => {
		client = await MongoClient.connect(process.env.MONGO_URL!);
	});

	afterAll(async () => {
		await client.close();
	});

	beforeEach(() => {
		sut = new AccountMongoRepository(client);
	});

	describe('add', () => {
		it('smoke test', async () => {
			const user = {
				name: 'any_name',
				email: 'asd@email.com',
				password: 'any_password',
			};

			const { id, ...otherUserData } = await sut.add(user);

			expect(id).toBeDefined();
			expect(otherUserData).toStrictEqual(user);
		});
	});
});
