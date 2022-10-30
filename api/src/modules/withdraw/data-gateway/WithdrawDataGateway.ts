import { WithdrawIDType } from "../domain/id";
import { WithdrawDataMap } from "./WithdrawMongoDataGateway";

export interface WithdrawDataGateway {
	add(data: WithdrawDataMap): Promise<void>;
	delete(id: WithdrawIDType): Promise<void>;
}
