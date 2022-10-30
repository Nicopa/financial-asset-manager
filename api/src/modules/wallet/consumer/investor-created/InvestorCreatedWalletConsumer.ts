import { Consumer } from "../../../../core/application/event";
import { InvestorCreated } from "../../../investor/domain/event";
import { Wallet } from "../../domain";
import { WalletRepository } from "../../repository";

export class InvestorCreatedWalletConsumer implements Consumer {
	eventName = "InvestorCreated";
	constructor(private readonly walletRepository: WalletRepository) {}
	async handle(domainEvent: InvestorCreated): Promise<void> {
		const investorID = domainEvent.data.investor.id;
		const wallet = Wallet.create({ id: investorID });
		await this.walletRepository.add(wallet);
	}
}
