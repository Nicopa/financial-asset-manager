import { KnexDatabase } from "../../database/knex";
import { Investor } from "../domain";
import { InvestorIDType } from "../domain/id";
import { InvestorNotFound } from "./error";
import { InvestorRepository } from "./InvestorRepository";

type InvestorDataMap = {
	id: InvestorIDType;
	username: string;
	fullname: string;
	password: string;
	cpf?: string;
};

export class InvestorKnexRepository
	extends KnexDatabase
	implements InvestorRepository
{
	public static readonly investorTableName = "investors";
	private toPersistence(investor: Investor): InvestorDataMap {
		return {
			id: investor.id.value,
			username: investor.state.username.value,
			fullname: investor.state.fullname.value,
			password: investor.state.password.value,
			cpf: investor.state.cpf?.value,
		};
	}
	private toDomain({
		id,
		username,
		fullname,
		password,
		cpf,
	}: InvestorDataMap): Investor {
		return Investor.load({
			id,
			username,
			fullname,
			password,
			cpf,
		});
	}
	async add(investor: Investor): Promise<void> {
		const data = this.toPersistence(investor);
		await this.database
			.insert(data)
			.into(InvestorKnexRepository.investorTableName);
	}
	async getByID(id: string): Promise<Investor> {
		const investor = await this.findBy("id", id);
		if (!investor) throw new InvestorNotFound();
		return investor;
	}
	private async findBy(property: string, value: string | number) {
		const investorData = await this.database
			.select("*")
			.from<InvestorDataMap>(InvestorKnexRepository.investorTableName)
			.where(property, value)
			.first();
		if (investorData === undefined) return undefined;
		return this.toDomain(investorData);
	}
	async findByID(id: string): Promise<Investor | undefined> {
		return await this.findBy("id", id);
	}
	async findByUsername(username: string): Promise<Investor | undefined> {
		return await this.findBy("username", username);
	}
	async findByCPF(cpf: string): Promise<Investor | undefined> {
		return await this.findBy("cpf", cpf);
	}
	async update(investor: Investor): Promise<void> {
		const { id, ...investorState } = this.toPersistence(investor);
		await this.database(InvestorKnexRepository.investorTableName)
			.where("id", id)
			.update(investorState);
	}
}
