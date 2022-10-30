import { Trading } from "../domain";
import { TradingIDType } from "../domain/id";

export interface TradingRepository {
	add(trading: Trading): Promise<void>;
	getByID(id: TradingIDType): Promise<Trading>;
	delete(id: TradingIDType): Promise<void>;
}
