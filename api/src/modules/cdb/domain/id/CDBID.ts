import { ID } from "../../../../core/domain";
import { AssetIDType } from "../../../asset/domain/id";

export type CDBIDType = AssetIDType;
export class CDBID extends ID<CDBIDType> {
	static create(value: CDBIDType) {
		return new CDBID(value);
	}
	static load(value: CDBIDType) {
		return new CDBID(value);
	}
}
