import mongoose from "mongoose";
import {
	TradingDoc,
	TradingMongoDataGateway,
} from "../../../trading/data-gateway";
import { tradingSchema } from "../migrations/tradings";

export const seedTradings = async (mongoConnection: mongoose.Connection) => {
	const TradingModel =
		mongoConnection.models[TradingMongoDataGateway.tradingCollectionName] ||
		mongoConnection.model<TradingDoc>(
			TradingMongoDataGateway.tradingCollectionName,
			new mongoose.Schema<TradingDoc>(tradingSchema, {
				collection: TradingMongoDataGateway.tradingCollectionName,
				strictQuery: "throw",
			}),
		);
	await TradingModel.insertMany([
		{
			_id: "df77bd9cb77d408485c4626c3b74d02b",
			account: {
				investorID: "7bce35a2cfa048dd93bba3029ab21903",
				broker: {
					id: "1fc9e8e93b2740719c7431d20d6aa2b2",
					companyName: "XP INVESTIMENTOS CCTVM S/A",
				},
			},
			asset: {
				id: "3eaa1cc211824ed1b3b66cc6167a1995",
				name: "ECOO11",
				type: "BRAZILIAN_ETF",
			},
			operation: "ACQUISITION",
			operationDate: new Date("2022-09-04T00:00:00"),
			settlementDate: new Date("2022-09-05T00:00:00"),
			quantity: 10,
			grossTotal: { amount: 951, currency: "BRL" },
			unitCost: 95.1,
			fee: {
				amount: 1,
				currency: "BRL",
				// _id: ObjectId("63583d6b45570517ec83e272"),
			},
			brokerageFee: {
				amount: 0.5,
				currency: "BRL",
				// _id: ObjectId("63583d6b45570517ec83e273"),
			},
			netTotal: 952.5,
		},
		{
			_id: "664f51285c89428b940a0c1ae5f57473",
			account: {
				investorID: "7bce35a2cfa048dd93bba3029ab21903",
				broker: {
					id: "1fc9e8e93b2740719c7431d20d6aa2b2",
					companyName: "XP INVESTIMENTOS CCTVM S/A",
				},
			},
			asset: {
				id: "a01408bf4ac241da8936f485e9ab3d6f",
				name: "CDB Banco Master 124% CDI",
				type: "CDB",
			},
			operation: "ACQUISITION",
			operationDate: new Date("2022-09-05T00:00:00"),
			settlementDate: new Date("2022-09-06T00:00:00"),
			quantity: 2,
			grossTotal: { amount: 2000, currency: "BRL" },
			unitCost: 1000,
			netTotal: 2000,
		},
		{
			_id: "9abd455d2f9947a18b6e02ff6cab1f21",
			account: {
				investorID: "7bce35a2cfa048dd93bba3029ab21903",
				broker: {
					id: "1fc9e8e93b2740719c7431d20d6aa2b2",
					companyName: "XP INVESTIMENTOS CCTVM S/A",
				},
			},
			asset: {
				id: "8a6d6d33120c4f8b9e6f647470356504",
				name: "TSLA34",
				type: "BRAZILIAN_DEPOSITARY_RECEIPT",
			},
			operation: "ACQUISITION",
			operationDate: new Date("2022-09-18T00:00:00"),
			settlementDate: new Date("2022-09-19T00:00:00"),
			quantity: 20,
			grossTotal: { amount: 668, currency: "BRL" },
			unitCost: 33.4,
			fee: {
				amount: 0.9,
				currency: "BRL",
				// _id: ObjectId("6358632f45570517ec83e2a0"),
			},
			brokerageFee: {
				amount: 0.35,
				currency: "BRL",
				// _id: ObjectId("6358632f45570517ec83e2a1"),
			},
			netTotal: 669.25,
		},
		{
			_id: "1595e9256ba54d41a317b3e8922ee50e",
			account: {
				investorID: "7bce35a2cfa048dd93bba3029ab21903",
				broker: {
					id: "1fc9e8e93b2740719c7431d20d6aa2b2",
					companyName: "XP INVESTIMENTOS CCTVM S/A",
				},
			},
			asset: {
				id: "dd1103c13100409ab1e78936b2914f88",
				name: "PETR3",
				type: "BRAZILIAN_STOCK",
			},
			operation: "ACQUISITION",
			operationDate: new Date("2022-10-02T00:00:00"),
			settlementDate: new Date("2022-10-03T00:00:00"),
			quantity: 32,
			grossTotal: { amount: 1200, currency: "BRL" },
			unitCost: 37.5,
			fee: {
				amount: 0.3,
				currency: "BRL",
				// _id: ObjectId("635864a045570517ec83e2ca"),
			},
			brokerageFee: {
				amount: 0.2,
				currency: "BRL",
				// _id: ObjectId("635864a045570517ec83e2cb"),
			},
			netTotal: 1200.5,
		},
		{
			_id: "bf830d4793104d19970f0659692a28cb",
			account: {
				investorID: "7bce35a2cfa048dd93bba3029ab21903",
				broker: {
					id: "1fc9e8e93b2740719c7431d20d6aa2b2",
					companyName: "XP INVESTIMENTOS CCTVM S/A",
				},
			},
			asset: {
				id: "333b9e551d8f492cabc9c0c23c467cbf",
				name: "BOVA11",
				type: "BRAZILIAN_ETF",
			},
			operation: "ACQUISITION",
			operationDate: new Date("2022-09-11T00:00:00"),
			settlementDate: new Date("2022-09-12T00:00:00"),
			quantity: 1,
			grossTotal: { amount: 100, currency: "BRL" },
			unitCost: 100,
			fee: {
				amount: 0.5,
				currency: "BRL",
				// _id: ObjectId("6358651745570517ec83e2d6"),
			},
			brokerageFee: {
				amount: 0.25,
				currency: "BRL",
				// _id: ObjectId("6358651745570517ec83e2d7"),
			},
			netTotal: 100.75,
		},
		{
			_id: "7ecc14ab9cc34f998680a7f5da658dee",
			account: {
				investorID: "7bce35a2cfa048dd93bba3029ab21903",
				broker: {
					id: "1fc9e8e93b2740719c7431d20d6aa2b2",
					companyName: "XP INVESTIMENTOS CCTVM S/A",
				},
			},
			asset: {
				id: "333b9e551d8f492cabc9c0c23c467cbf",
				name: "BOVA11",
				type: "BRAZILIAN_ETF",
			},
			operation: "DISPOSAL",
			operationDate: new Date("2022-10-18T00:00:00"),
			settlementDate: new Date("2022-10-19T00:00:00"),
			quantity: 1,
			grossTotal: { amount: 110, currency: "BRL" },
			unitCost: 110,
			fee: {
				amount: 0.5,
				currency: "BRL",
				// _id: ObjectId("6358655c45570517ec83e2de"),
			},
			brokerageFee: {
				amount: 0.5,
				currency: "BRL",
				// _id: ObjectId("6358655c45570517ec83e2df"),
			},
			netTotal: 109,
		},
	]);
};
