import { BrazilianCompanyRepository } from "./BrazilianCompanyRepository";

export class BrazilianCompanyKnexRepository
	implements BrazilianCompanyRepository
{
	public static readonly brazilianCompanyTableName = "brazilian-companies";
}
