import { getWorkingDaysBetween } from "../../../utils/workingDaysBetween";
import { CDBReturnCalculator } from "./CDBReturnCalculator";

describe("[cdb] CDB Return Calculator", () => {
	test("It should calculate prefixed return.", () => {
		//get 126 days for calc
		const workingDays = getWorkingDaysBetween(
			new Date("2022-01-10"),
			new Date("2022-07-05"),
		);
		expect(
			CDBReturnCalculator.getPrefixedTotalReturn(1000, 0.21, workingDays),
		).toBe(1100);
	});
	test("It should calculate postfixed return.", () => {
		//get 126 days for calc
		const workingDays = getWorkingDaysBetween(
			new Date("2022-01-10"),
			new Date("2022-07-05"),
		);
		expect(
			CDBReturnCalculator.getPostfixedCDITotalReturn(
				1000,
				0.1,
				1.02,
				workingDays,
			).toFixed(2),
		).toBe("1049.76");
	});
});
