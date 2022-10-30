import { AssetDataGateway } from "../../asset/data-gateway";
import { CompanyDataGateway } from "../../company/data-gateway";
import { EarningCreatedConsumer } from "../consumer/earning-created";
import { EarningDeletedConsumer } from "../consumer/earning-deleted";
import { EarningDataGateway } from "../data-gateway";

export class EarningConsumerFactory {
	constructor(
		private readonly earningDataGateway: EarningDataGateway,
		private readonly companyDataGateway: CompanyDataGateway,
		private readonly assetDataGateway: AssetDataGateway,
	) {}
	public makeEarningCreatedConsumer() {
		return new EarningCreatedConsumer(
			this.earningDataGateway,
			this.companyDataGateway,
			this.assetDataGateway,
		);
	}
	public makeEarningDeletedConsumer() {
		return new EarningDeletedConsumer(this.earningDataGateway);
	}
}
