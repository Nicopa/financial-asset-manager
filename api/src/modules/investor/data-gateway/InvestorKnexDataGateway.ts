import { KnexDatabase } from "../../database/knex";
import { InvestorIDType } from "../domain/id";
import { IDNotFound } from "./error";
import { InvestorDataGateway, InvestorDataMap } from "./InvestorDataGateway";

export class InvestorKnexDataGateway
	extends KnexDatabase
	implements InvestorDataGateway
{
	public static readonly investorTableName = "investors";
	async getByID(id: InvestorIDType): Promise<InvestorDataMap> {
		const investorData = await this.findByID(id);
		if (!investorData) throw new IDNotFound();
		return investorData;
	}
	async findByID(id: InvestorIDType): Promise<InvestorDataMap | undefined> {
		const investorData = await this.database
			.select("*")
			.from<InvestorDataMap>(InvestorKnexDataGateway.investorTableName)
			.where("id", id)
			.first();
		return investorData;
	}
}
