import { AccountKnexRepository } from "../../account/repository";
import { CompanyKnexDataGateway } from "../../company/data-gateway";
import { KnexDatabase } from "../../database/knex";
import { InvestorIDType } from "../../investor/domain/id";
import { BrokerIDType } from "../domain/id/BrokerID";
import { BrokerDataGateway } from "./BrokerDataGateway";
import { IDNotFound } from "./error";

export class BrokerKnexDataGateway
	extends KnexDatabase
	implements BrokerDataGateway
{
	public static readonly brokerTableName = "brokers";
	async findByID<T extends {}>(id: BrokerIDType): Promise<T | undefined> {
		const brokerData = await this.database
			.select("*")
			.from<T>(BrokerKnexDataGateway.brokerTableName)
			.where("id", id)
			.first();
		return brokerData as T;
	}
	async getByID<T extends {}>(id: string): Promise<T> {
		const brokerData = await this.findByID<T>(id);
		if (!brokerData) throw new IDNotFound();
		return brokerData;
	}
	async getAllAvailableForInvestorAccount<T extends {}>(
		investorID: InvestorIDType,
	): Promise<T[]> {
		const brokers = await this.database<T>(
			BrokerKnexDataGateway.brokerTableName,
		)
			.join(
				CompanyKnexDataGateway.companyTableName,
				CompanyKnexDataGateway.companyTableName + ".id",
				BrokerKnexDataGateway.brokerTableName + ".id",
			)
			.whereNotExists(
				this.database<{ brokerID: BrokerIDType }>(
					AccountKnexRepository.accountTableName,
				)
					.where("investorID", investorID)
					.whereRaw(`brokerID = ${BrokerKnexDataGateway.brokerTableName}.id`),
			)
			.select(
				this.database
					.ref("id")
					.withSchema(BrokerKnexDataGateway.brokerTableName),
				this.database
					.ref("tradingName")
					.withSchema(CompanyKnexDataGateway.companyTableName),
			);

		return brokers as T[];
	}
}
