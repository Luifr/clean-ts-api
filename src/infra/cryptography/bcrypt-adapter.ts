import { Encrypter } from '@data/interfaces/encrypter';
import bcrypt from 'bcrypt';

export class BcryptAdapter implements Encrypter {
	constructor(private readonly salt: number) {}

	async encrypt(value: string): Promise<string> {
		return bcrypt.hash(value, this.salt);
	}
}
