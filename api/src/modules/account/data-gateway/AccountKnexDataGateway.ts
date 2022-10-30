import { BrokerKnexDataGateway } from "../../broker/data-gateway";
import { CompanyKnexDataGateway } from "../../company/data-gateway";
import { KnexDatabase } from "../../database/knex";
import { InvestorIDType } from "../../investor/domain/id";
import { AccountDataGateway, AccountDataMap } from "./AccountDataGateway";

export class AccountKnexDataGateway
	extends KnexDatabase
	implements AccountDataGateway
{
	public static readonly accountTableName = "accounts";
	async getAllByInvestorID(
		investorID: InvestorIDType,
	): Promise<AccountDataMap[]> {
		const accounts = await this.database<AccountDataMap>(
			AccountKnexDataGateway.accountTableName,
		)
			.join(
				BrokerKnexDataGateway.brokerTableName,
				BrokerKnexDataGateway.brokerTableName + ".id",
				AccountKnexDataGateway.accountTableName + ".brokerID",
			)
			.join(
				CompanyKnexDataGateway.companyTableName,
				CompanyKnexDataGateway.companyTableName + ".id",
				BrokerKnexDataGateway.brokerTableName + ".id",
			)
			.where("investorID", investorID)
			.orderBy("tradingName", "asc")
			.select(
				this.database
					.ref("brokerID")
					.withSchema(AccountKnexDataGateway.accountTableName),
				this.database
					.ref("tradingName")
					.withSchema(CompanyKnexDataGateway.companyTableName),
				this.database
					.ref("thumbnail")
					.withSchema(CompanyKnexDataGateway.companyTableName),
				this.database
					.ref("BRLbalance")
					.withSchema(AccountKnexDataGateway.accountTableName),
				this.database
					.ref("USDbalance")
					.withSchema(AccountKnexDataGateway.accountTableName),
			);
		return accounts;
	}
}
