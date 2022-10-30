import { ID } from "../../../../core/domain";
import { AssetIDType } from "../../../asset/domain/id";

export type BDRIDType = AssetIDType;
export class BDRID extends ID<BDRIDType> {
	static create(value: BDRIDType) {
		return new BDRID(value);
	}
	static load(value: BDRIDType) {
		return new BDRID(value);
	}
}
