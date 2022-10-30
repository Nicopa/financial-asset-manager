import { CompanyIDType } from "../domain/id";

export type CompanyDataMap = {
	id: CompanyIDType;
	companyName: string;
	tradingName: string;
	thumbnail?: string;
};
export interface CompanyDataGateway {
	getByID(id: CompanyIDType): Promise<CompanyDataMap>;
	findByID(id: CompanyIDType): Promise<CompanyDataMap | undefined>;
}
