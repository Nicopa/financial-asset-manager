import { CurrencyRateProvider } from "./CurrencyRateProvider";

global.fetch = jest.fn(() =>
	Promise.resolve({
		json: () =>
			Promise.resolve({
				USDBRL: {
					code: "USD",
					codein: "BRL",
					name: "Dólar Americano/Real Brasileiro",
					high: "5.2523",
					low: "5.1957",
					varBid: "-0.0142",
					pctChange: "-0.27",
					bid: "5.206",
					ask: "5.209",
					timestamp: "1665175839",
					create_date: "2022-10-07 17:50:39",
				},
			}),
	}),
) as jest.Mock;

describe("Currency Rate Provider", () => {
	test("It should return currency rate from USD to BRL.", async () => {
		const currencyRateProvider = new CurrencyRateProvider();
		await expect(currencyRateProvider.getUSDtoBRL()).resolves.toBeGreaterThan(
			0,
		);
	});
});
