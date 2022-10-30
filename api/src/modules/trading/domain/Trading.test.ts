import { UUIDProviderMock } from "../../../core/domain/service/uuid/__mocks__/UUIDMock";
import { NotEqualCurrencies } from "./error";
import { Trading, TradingCreateParams } from "./Trading";

describe("[trading] Trading", () => {
	const validTradingCreateParams: TradingCreateParams = {
		accountID: { investorID: "investorid1", brokerID: "brokerid1" },
		assetID: "assetid1",
		operation: "ACQUISITION",
		operationDate: new Date("2022-02-01T12:00:00"),
		settlementDate: new Date("2022-02-01T12:10:00"),
		quantity: 100,
		grossTotal: {
			amount: 1000,
			currency: "USD",
		},
		fee: {
			amount: 0.25,
			currency: "USD",
		},
		brokerageFee: {
			amount: 0.1,
			currency: "USD",
		},
	};
	const uUIDProvider = new UUIDProviderMock();
	test("It should throw error if currencies are not the same.", () => {
		expect(() =>
			Trading.create(
				{ ...validTradingCreateParams, fee: { amount: 0.25, currency: "BRL" } },
				uUIDProvider,
			),
		).toThrowError(NotEqualCurrencies);
		expect(() =>
			Trading.create(
				{
					...validTradingCreateParams,
					brokerageFee: { amount: 0.25, currency: "BRL" },
				},
				uUIDProvider,
			),
		).toThrowError(NotEqualCurrencies);
	});
	test("It should return a trading object if created with valid data.", () => {
		expect(
			Trading.create(validTradingCreateParams, uUIDProvider),
		).toBeInstanceOf(Trading);
	});
	test("It should not save any fee if the amount is zero.", () => {
		const trading = Trading.create(
			{
				...validTradingCreateParams,
				fee: { amount: 0, currency: "USD" },
				brokerageFee: { amount: 0, currency: "USD" },
			},
			uUIDProvider,
		);
		expect(trading.state.fee).toBeUndefined();
		expect(trading.state.brokerageFee).toBeUndefined();
	});
	test("It should create a domain event when created.", () => {
		const trading = Trading.create(validTradingCreateParams, uUIDProvider);
		expect(trading.dispatchEvents().length).toBe(1);
	});
	test("It should calculate the unit cost without fees.", () => {
		const trading1 = Trading.create(validTradingCreateParams, uUIDProvider);
		expect(trading1.unitCost.amount).toBe(10);
		const trading2 = Trading.create(
			{
				...validTradingCreateParams,
				quantity: 64,
			},
			uUIDProvider,
		);
		expect(trading2.unitCost.amount).toBe(15.63);
	});
	test("It should calculate the net total.", () => {
		const trading1 = Trading.create(validTradingCreateParams, uUIDProvider);
		expect(trading1.netTotal.amount).toBe(1000.35);
		const trading2 = Trading.create(
			{
				...validTradingCreateParams,
				operation: "DISPOSAL",
			},
			uUIDProvider,
		);
		expect(trading2.netTotal.amount).toBe(999.65);
	});
});
