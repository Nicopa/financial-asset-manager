import { Earning } from "../domain/Earning";
import { EarningIDType } from "../domain/id";

export interface EarningRepository {
	add(earning: Earning): Promise<void>;
	getByID(id: EarningIDType): Promise<Earning>;
	delete(id: EarningIDType): Promise<void>;
}
