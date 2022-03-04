import { AccountModel } from './account';

export type AddAccountModel = Omit<AccountModel, 'id'>;

export interface AddAccount {
	add(account: AddAccountModel): AccountModel;
}