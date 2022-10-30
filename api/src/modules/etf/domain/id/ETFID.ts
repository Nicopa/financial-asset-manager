import { ID } from "../../../../core/domain";
import { AssetIDType } from "../../../asset/domain/id";

export type ETFIDType = AssetIDType;
export class ETFID extends ID<ETFIDType> {
	static create(value: ETFIDType) {
		return new ETFID(value);
	}
	static load(value: ETFIDType) {
		return new ETFID(value);
	}
}
