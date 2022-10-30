import { NegativeAmount } from "./error";
import { Money, MoneyValue } from "./Money";

describe("[money] Money", () => {
	const validMoneyCreateParams: MoneyValue = {
		amount: 1000,
		currency: "BRL",
	};
	test("It should throw error if amount is negative.", () => {
		expect(() => Money.create({ amount: -10, currency: "USD" })).toThrowError(
			NegativeAmount,
		);
	});
	test("It should return a money object if created with valid data.", () => {
		expect(Money.create(validMoneyCreateParams)).toBeInstanceOf(Money);
	});
	test("It should convert currency for a given ratio.", () => {
		const brlMoney = Money.create({ currency: "BRL", amount: 1 });
		expect(brlMoney.value.amount).toBe(1);
		const usdMoney = brlMoney.toUSD(5);
		expect(usdMoney.value.amount).toBe(5);
		expect(usdMoney.toBRL(5).value.amount).toBe(1);
	});
});
