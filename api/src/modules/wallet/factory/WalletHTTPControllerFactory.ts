import { AccountDataGateway } from "../../account/data-gateway";
import { CDBDataGateway } from "../../cdb/data-gateway";
import { WalletDataGateway } from "../data-gateway/WalletDataGateway";
import { GetWallet, GetWalletHTTPController } from "../query/get-wallet";
import {
	GetWalletPieData,
	GetWalletPieDataHTTPController,
} from "../query/get-wallet-pie-data";
import { WalletHTTPPresenterFactory } from "./WalletHTTPPresenterFactory";

export class WalletHTTPControllerFactory {
	private readonly httpPresenterFactory = new WalletHTTPPresenterFactory();
	constructor(
		private readonly walletDataGateway: WalletDataGateway,
		private readonly cdbDataGateway: CDBDataGateway,
		private readonly accountDataGateway: AccountDataGateway,
	) {}
	public makeGetWalletController() {
		return new GetWalletHTTPController(
			new GetWallet(
				this.walletDataGateway,
				this.accountDataGateway,
				this.cdbDataGateway,
			),
			this.httpPresenterFactory.makeGetWalletPresenter(),
		);
	}
	public makeGetWalletPieDataController() {
		return new GetWalletPieDataHTTPController(
			new GetWalletPieData(
				this.walletDataGateway,
				this.accountDataGateway,
				this.cdbDataGateway,
			),
			this.httpPresenterFactory.makeGetWalletPieDataPresenter(),
		);
	}
}
