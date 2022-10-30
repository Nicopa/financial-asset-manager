import { ID } from "../../../../core/domain";
import { AssetIDType } from "../../../asset/domain/id";

export type BrazilianStockIDType = AssetIDType;
export class BrazilianStockID extends ID<BrazilianStockIDType> {
	static create(value: BrazilianStockIDType) {
		return new BrazilianStockID(value);
	}
	static load(value: BrazilianStockIDType) {
		return new BrazilianStockID(value);
	}
}
