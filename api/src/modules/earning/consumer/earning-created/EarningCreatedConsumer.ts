import { Consumer } from "../../../../core/application/event";
import { AssetDataGateway } from "../../../asset/data-gateway";
import { CompanyDataGateway } from "../../../company/data-gateway";
import { EarningDataGateway } from "../../data-gateway";
import { EarningCreated } from "../../domain/event";

export class EarningCreatedConsumer implements Consumer {
	eventName: string = "EarningCreated";
	constructor(
		private readonly earningDataGateway: EarningDataGateway,
		private readonly companyDataGateway: CompanyDataGateway,
		private readonly assetDataGateway: AssetDataGateway,
	) {}
	async handle(event: EarningCreated): Promise<void> {
		try {
			const { companyName: brokerCompanyName } =
				await this.companyDataGateway.getByID(event.data.accountID.brokerID);
			const { name: assetName, type: assetType } =
				await this.assetDataGateway.getByID(event.data.assetID);
			await this.earningDataGateway.add({
				id: event.data.id,
				account: {
					investorID: event.data.accountID.investorID,
					broker: {
						id: event.data.accountID.brokerID,
						companyName: brokerCompanyName,
					},
				},
				asset: {
					id: event.data.assetID,
					name: assetName,
					type: assetType,
				},
				type: event.data.type,
				value: event.data.value,
				quantity: event.data.quantity,
				operationDate: event.data.operationDate,
				settlementDate: event.data.settlementDate,
				createdAt: event.data.createdAt,
			});
		} catch (error) {
			console.error(error);
		}
	}
}
