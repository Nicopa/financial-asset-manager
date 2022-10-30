import { AssetDataMap } from "../../asset/data-gateway";
import { BrazilianCompanyIDType } from "../../brazilian-company/domain/id";
import { Index } from "../../indexes/Index";
import { CDBTypeValue } from "../domain/CDBType/CDBType";
import { CDBIDType } from "../domain/id";

export type CDBDataMap = Omit<AssetDataMap, "type"> & {
	brazilianCompanyID: BrazilianCompanyIDType;
	type: CDBTypeValue;
	index?: Index;
	interestRate?: number;
};
export interface CDBDataGateway {
	getByID(id: CDBIDType): Promise<CDBDataMap>;
}
