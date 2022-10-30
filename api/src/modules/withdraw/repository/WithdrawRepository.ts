import { Withdraw } from "../domain";
import { WithdrawIDType } from "../domain/id";

export interface WithdrawRepository {
	add(withdraw: Withdraw): Promise<void>;
	getByID(id: WithdrawIDType): Promise<Withdraw>;
	delete(id: WithdrawIDType): Promise<void>;
}
