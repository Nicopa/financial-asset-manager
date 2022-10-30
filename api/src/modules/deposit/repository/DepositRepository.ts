import { Deposit } from "../domain";
import { DepositIDType } from "../domain/id";

export interface DepositRepository {
	add(deposit: Deposit): Promise<void>;
	getByID(id: DepositIDType): Promise<Deposit>;
	delete(id: DepositIDType): Promise<void>;
}
