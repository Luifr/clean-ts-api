import { AccountModel } from '@domain/usecases/account';
import { AddAccountModel } from '@domain/usecases/add-account';

export interface AddAccountRepository {
	add (accountData: AddAccountModel): Promise<AccountModel>;
}
