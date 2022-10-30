import { InvestorIDType } from "../domain/id";

export type InvestorDataMap = {
	id: InvestorIDType;
	username: string;
	fullname: string;
	password: string;
	cpf?: string;
};
export interface InvestorDataGateway {
	getByID(id: InvestorIDType): Promise<InvestorDataMap>;
	findByID(id: InvestorIDType): Promise<InvestorDataMap | undefined>;
}
