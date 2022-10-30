import dotenv from "dotenv";
import { Knex } from "knex";
import {
	createKnexDatabase,
	getKnexConnection,
} from "../../../../tests/api/utils/utils";
import { UUIDProviderMock } from "../../../core/domain/service/uuid/__mocks__/UUIDMock";
import { CashFlowKnexRepository } from "../../cash-flow/repository";
import { TradingKnexRepository } from "../../trading/repository";
import { Wallet } from "../domain";
import { WalletKnexRepository } from "./WalletKnexRepository";

describe("[wallet] Wallet Knex Repository", () => {
	const inputs = {
		investorID: "7bce35a2cfa048dd93bba3029ab21903",
		assetID1: "c85f32b3d9da40bc82a6e98509e1b5ea",
		assetID2: "c5c2bbdc1c464e0dbad477b21efc625a",
		brokerID: "1fc9e8e93b2740719c7431d20d6aa2b2",
	};
	dotenv.config();
	let database: Knex<any, unknown[]>;
	const databaseName = `${process.env.DATABASE}_test_${process.env.JEST_WORKER_ID}`;
	const uUIDProviderMock = new UUIDProviderMock();
	beforeAll(async () => {
		await createKnexDatabase(databaseName);
		database = getKnexConnection(databaseName);
		for (let i = 1; i <= 8; i++) {
			await database(CashFlowKnexRepository.cashFlowTableName).insert({
				id: "cashflow" + i,
				investorID: inputs.investorID,
				brokerID: inputs.brokerID,
				valueAmount: 1,
				valueCurrency: "BRL",
				operation: "OUT",
				operationDate: new Date(),
				settlementDate: new Date(),
				createdAt: new Date(),
			});
			await database(TradingKnexRepository.tradingTableName).insert({
				id: "trading" + i,
				investorID: inputs.investorID,
				brokerID: inputs.brokerID,
				assetID: inputs.assetID1,
				operation: "ACQUISITION",
				operationDate: new Date(),
				settlementDate: new Date(),
				quantity: 1,
				grossTotalCashFlowID: "cashflow" + i,
			});
		}
	});
	afterAll(async () => {
		await database.raw(`DROP DATABASE ${databaseName}`);
		await database.destroy();
	});
	test("It should update wallet.", async () => {
		const walletKnexRepository = new WalletKnexRepository(database);
		const fakeWallet = Wallet.create({ id: inputs.investorID });
		fakeWallet.add(
			{
				assetID: inputs.assetID1,
				sourceTradingID: "trading1",
				quantity: 1,
				operationDate: new Date(),
				currency: "BRL",
				acquisitionTotalAmount: 1,
			},
			uUIDProviderMock,
		);
		fakeWallet.add(
			{
				assetID: inputs.assetID2,
				sourceTradingID: "trading2",
				quantity: 2,
				operationDate: new Date(),
				currency: "BRL",
				acquisitionTotalAmount: 2,
			},
			uUIDProviderMock,
		);
		expect(
			Number(
				(
					await database(WalletKnexRepository.walletAssetTableName)
						.where("walletID", fakeWallet.id.value)
						.count({ count: "walletID" })
						.first()
				)?.count,
			),
		).toBe(0);
		await walletKnexRepository.update(fakeWallet);
		expect(
			Number(
				(
					await database(WalletKnexRepository.walletAssetTableName)
						.where("walletID", fakeWallet.id.value)
						.count({ count: "walletID" })
						.first()
				)?.count,
			),
		).toBe(2);
		fakeWallet.add(
			{
				assetID: inputs.assetID1,
				sourceTradingID: "trading3",
				quantity: 1,
				operationDate: new Date(),
				currency: "BRL",
				acquisitionTotalAmount: 1,
			},
			uUIDProviderMock,
		);
		fakeWallet.add(
			{
				assetID: inputs.assetID2,
				sourceTradingID: "trading4",
				quantity: -2,
				operationDate: new Date(),
				currency: "BRL",
				acquisitionTotalAmount: 2,
			},
			uUIDProviderMock,
		);
		await walletKnexRepository.update(fakeWallet);
		expect(
			Number(
				(
					await database(WalletKnexRepository.walletAssetTableName)
						.where("walletID", fakeWallet.id.value)
						.count({ count: "walletID" })
						.first()
				)?.count,
			),
		).toBe(2);
		fakeWallet.add(
			{
				assetID: inputs.assetID1,
				sourceTradingID: "trading5",
				quantity: -2,
				operationDate: new Date(),
				currency: "BRL",
				acquisitionTotalAmount: 1,
			},
			uUIDProviderMock,
		);
		await walletKnexRepository.update(fakeWallet);
		expect(
			Number(
				(
					await database(WalletKnexRepository.walletAssetTableName)
						.where("walletID", fakeWallet.id.value)
						.count({ count: "walletID" })
						.first()
				)?.count,
			),
		).toBe(0);
	});
	test("It should return investor wallet.", async () => {
		const walletKnexRepository = new WalletKnexRepository(database);
		const fakeWallet = Wallet.create({ id: inputs.investorID });
		fakeWallet.add(
			{
				assetID: inputs.assetID1,
				sourceTradingID: "trading6",
				quantity: 1,
				operationDate: new Date(),
				currency: "BRL",
				acquisitionTotalAmount: 1,
			},
			uUIDProviderMock,
		);
		await walletKnexRepository.update(fakeWallet);
		const wallet = await walletKnexRepository.getByID(inputs.investorID);
		expect(wallet.state.assets).toHaveLength(1);
	});
	test("It should delete wallet asset if it is not in the array.", async () => {
		const walletKnexRepository = new WalletKnexRepository(database);
		await database(WalletKnexRepository.walletAssetTableName).truncate();
		const fakeWallet = Wallet.create({ id: inputs.investorID });
		fakeWallet.add(
			{
				assetID: inputs.assetID1,
				sourceTradingID: "trading7",
				quantity: 1,
				operationDate: new Date(),
				currency: "BRL",
				acquisitionTotalAmount: 1,
			},
			uUIDProviderMock,
		);
		fakeWallet.add(
			{
				assetID: inputs.assetID1,
				sourceTradingID: "trading8",
				quantity: 1,
				operationDate: new Date(),
				currency: "BRL",
				acquisitionTotalAmount: 1,
			},
			uUIDProviderMock,
		);
		await walletKnexRepository.update(fakeWallet);
		fakeWallet.delete("trading7");
		await walletKnexRepository.update(fakeWallet);
		const wallet = await walletKnexRepository.getByID(inputs.investorID);
		expect(wallet.state.assets).toHaveLength(1);
	});
});
