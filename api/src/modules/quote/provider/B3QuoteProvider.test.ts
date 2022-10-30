import { B3QuoteProvider } from "./B3QuoteProvider";
import axios from "axios";

jest.mock("axios");
describe("B3 Quote Provider", () => {
	(axios as jest.Mocked<typeof axios>).get.mockResolvedValue({
		data: {
			name: "ECOO11",
			friendlyName: "ECOO11",
			values: [
				["ECOO11", 4, 99.84, 20, "2022-10-11", "13:47:27"],
				["ECOO11", 2, 99.74, 10, "2022-10-11", "10:56:26"],
			],
		},
	});
	test("It should return an updated asset quote (1 day delayed at least).", () => {
		const currencyRateProvider = new B3QuoteProvider();
		return expect(currencyRateProvider.get("ECOO11")).resolves.toBeGreaterThan(
			0,
		);
	});
});
