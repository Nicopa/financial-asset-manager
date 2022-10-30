import { KnexDatabase } from "../../database/knex";
import { CompanyIDType } from "../domain/id";
import { CompanyDataGateway, CompanyDataMap } from "./CompanyDataGateway";
import { IDNotFound } from "./error";

export class CompanyKnexDataGateway
	extends KnexDatabase
	implements CompanyDataGateway
{
	public static readonly companyTableName = "companies";
	async findByID(id: CompanyIDType): Promise<CompanyDataMap | undefined> {
		const companyData = await this.database
			.select("*")
			.from<CompanyDataMap>(CompanyKnexDataGateway.companyTableName)
			.where("id", id)
			.first();
		return companyData;
	}
	async getByID(id: string): Promise<CompanyDataMap> {
		const companyData = await this.findByID(id);
		if (!companyData) throw new IDNotFound();
		return companyData;
	}
}
