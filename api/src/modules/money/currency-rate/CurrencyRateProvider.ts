export class CurrencyRateProvider {
	public async getUSDtoBRL(): Promise<number> {
		try {
			const response = await fetch(
				"https://economia.awesomeapi.com.br/last/USD-BRL",
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				},
			);
			const data = await response.json();
			const result = data.USDBRL.bid ? parseFloat(data.USDBRL.bid) : 0;
			return result;
		} catch (error) {
			console.error("Currency Rate error", error);
			return 0;
		}
	}
}
