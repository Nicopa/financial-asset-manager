export class CDBReturnCalculator {
	private static YEARLY_WORKING_DAYS = 252;
	public static getPrefixedTotalReturn(
		amount: number,
		interestRate: number,
		workingDays: number,
	): number {
		const fv =
			amount *
			Math.pow(
				1 + interestRate,
				workingDays / CDBReturnCalculator.YEARLY_WORKING_DAYS,
			);
		return fv;
	}
	public static getPostfixedCDITotalReturn(
		amount: number,
		yearCDI: number,
		rate: number,
		workingDays: number,
	): number {
		return CDBReturnCalculator.getPrefixedTotalReturn(
			amount,
			rate * yearCDI,
			workingDays,
		);
	}
}
