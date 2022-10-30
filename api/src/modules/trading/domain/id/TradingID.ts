import { ID } from "../../../../core/domain";
import { UUIDProvider } from "../../../../core/domain/service/uuid";

export type TradingIDType = string;
export class TradingID extends ID<TradingIDType> {
	static create(uUIDProvider: UUIDProvider) {
		return new TradingID(uUIDProvider.generate());
	}
	static load(value: TradingIDType) {
		return new TradingID(value);
	}
}
