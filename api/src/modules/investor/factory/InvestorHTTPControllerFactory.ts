import { EventBroker } from "../../../core/application/event";
import { UUIDProvider } from "../../../core/domain/service/uuid";
import { AuthProvider } from "../../auth";
import {
	CreateInvestor,
	CreateInvestorHTTPController,
} from "../command/create-investor";
import {
	CreateInvestorAuth,
	CreateInvestorAuthHTTPController,
} from "../command/create-investor-auth";
import {
	GetInvestorAuth,
	GetInvestorAuthHTTPController,
} from "../command/get-investor-auth";
import { InvestorDataGateway } from "../data-gateway";
import { Encryption } from "../domain/encryption";
import { GetInvestor, GetInvestorHTTPController } from "../query/get-investor";
import { InvestorRepository } from "../repository";
import { InvestorHTTPPresenterFactory } from "./InvestorHTTPPresenterFactory";

export class InvestorHTTPControllerFactory {
	private readonly httpPresenterFactory = new InvestorHTTPPresenterFactory();
	constructor(
		private readonly investorRepository: InvestorRepository,
		private readonly dataGateway: InvestorDataGateway,
		private readonly eventBroker: EventBroker,
		private readonly uUIDProvider: UUIDProvider,
		private readonly encryption: Encryption,
		private readonly authProvider: AuthProvider,
	) {}
	public makeCreateInvestorController() {
		return new CreateInvestorHTTPController(
			new CreateInvestor(
				this.investorRepository,
				this.uUIDProvider,
				this.encryption,
				this.eventBroker,
			),
			this.httpPresenterFactory.makeCreateInvestorPresenter(),
		);
	}
	public makeCreateInvestorAuthController() {
		return new CreateInvestorAuthHTTPController(
			new CreateInvestorAuth(
				this.investorRepository,
				this.encryption,
				this.authProvider,
			),
			this.httpPresenterFactory.makeCreateInvestorAuthPresenter(),
		);
	}
	public makeGetInvestorAuthController() {
		return new GetInvestorAuthHTTPController(
			new GetInvestorAuth(this.dataGateway, this.authProvider),
			this.httpPresenterFactory.makeGetInvestorAuthPresenter(),
		);
	}
	public makeGetInvestor() {
		return new GetInvestorHTTPController(
			new GetInvestor(this.dataGateway),
			this.httpPresenterFactory.makeGetInvestorPresenter(),
		);
	}
}
