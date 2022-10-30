import { Consumer } from "../../../../core/application/event";
import { AssetDataGateway } from "../../../asset/data-gateway";
import { AssetNameValue } from "../../../asset/domain/asset-name/AssetName";
import { AssetTypeValue } from "../../../asset/domain/asset-type/AssetType";
import { CompanyDataGateway } from "../../../company/data-gateway";
import { TradingDataGateway } from "../../data-gateway";
import { TradingCreated } from "../../domain/event";

export class TradingCreatedConsumer implements Consumer {
	eventName: string = "TradingCreated";
	constructor(
		private readonly tradingDataGateway: TradingDataGateway,
		private readonly companyDataGateway: CompanyDataGateway,
		private readonly assetDataGateway: AssetDataGateway,
	) {}
	async handle(event: TradingCreated): Promise<void> {
		try {
			const { companyName: brokerCompanyName } =
				await this.companyDataGateway.getByID(event.data.accountID.brokerID);
			const { name: assetName, type: assetType } =
				await this.assetDataGateway.getByID(event.data.assetID);
			await this.tradingDataGateway.add({
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
				operation: event.data.operation,
				operationDate: event.data.operationDate,
				settlementDate: event.data.settlementDate,
				quantity: event.data.quantity,
				grossTotal: event.data.grossTotal,
				unitCost: event.data.unitCost,
				fee: event.data.fee,
				brokerageFee: event.data.brokerageFee,
				netTotal: event.data.netTotal,
			});
		} catch (error) {
			console.error(error);
		}
	}
}
