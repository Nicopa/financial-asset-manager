import { DomainClientError } from "../../../../core/domain";

export class InvalidSettlementDate extends DomainClientError {
	constructor(operationDate: Date, settlementDate: Date) {
		super(
			"INVALID_EARNING_SETTLEMENT_DATE",
			"The settlement date can't be before operation date.",
			{
				operationDate: operationDate.toISOString(),
				settlementDate: settlementDate.toISOString(),
			},
		);
	}
}
