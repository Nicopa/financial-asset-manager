import { CreateInvestorHTTPPresenter } from "../command/create-investor";
import { CreateInvestorAuthHTTPPresenter } from "../command/create-investor-auth";
import { GetInvestorAuthHTTPPresenter } from "../command/get-investor-auth";
import { GetInvestorHTTPPresenter } from "../query/get-investor";

export class InvestorHTTPPresenterFactory {
	public makeCreateInvestorPresenter() {
		return new CreateInvestorHTTPPresenter();
	}
	public makeCreateInvestorAuthPresenter() {
		return new CreateInvestorAuthHTTPPresenter();
	}
	public makeGetInvestorAuthPresenter() {
		return new GetInvestorAuthHTTPPresenter();
	}
	public makeGetInvestorPresenter() {
		return new GetInvestorHTTPPresenter();
	}
}
