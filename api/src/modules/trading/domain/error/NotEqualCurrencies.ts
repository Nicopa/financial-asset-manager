import { DomainClientError } from "../../../../core/domain";
import { Currency } from "../../../money/domain";

export class NotEqualCurrencies extends DomainClientError {
	constructor(
		grossTotalCurrency: Currency,
		feeCurrency?: Currency,
		brokerageFeeCurrency?: Currency,
	) {
		super(
			"NOT_EQUAL_CURRENCIES_IN_TRADING",
			"A trading cannot have different currencies on gross total, fee and brokerage fee.",
			{
				grossTotalCurrency,
				feeCurrency,
				brokerageFeeCurrency,
			},
		);
	}
}
