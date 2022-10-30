import { Wallet } from "../domain";
import { WalletIDType } from "../domain/id";

export interface WalletRepository {
	add(wallet: Wallet): Promise<void>;
	update(wallet: Wallet): Promise<void>;
	getByID(id: WalletIDType): Promise<Wallet>;
}
