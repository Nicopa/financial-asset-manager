import { DepositIDType } from "../domain/id";
import { DepositDataMap } from "./DepositMongoDataGateway";

export interface DepositDataGateway {
	add(data: DepositDataMap): Promise<void>;
	delete(id: DepositIDType): Promise<void>;
}
