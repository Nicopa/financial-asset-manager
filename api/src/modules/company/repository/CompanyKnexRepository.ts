import { CompanyRepository } from "./CompanyRepository";

export class CompanyKnexRepository implements CompanyRepository {
	public static readonly companyTableName = "companies";
}
