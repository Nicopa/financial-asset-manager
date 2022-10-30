import mongoose from "mongoose";
import {
	CashFlowDoc,
	CashFlowMongoDataGateway,
} from "../../../cash-flow/data-gateway";
import { cashFlowSchema } from "../migrations/cash-flows";

export const seedCashFlows = async (mongoConnection: mongoose.Connection) => {
	const CashFlowModel =
		mongoConnection.models[CashFlowMongoDataGateway.cashFlowCollectionName] ||
		mongoConnection.model<CashFlowDoc>(
			CashFlowMongoDataGateway.cashFlowCollectionName,
			new mongoose.Schema<CashFlowDoc>(cashFlowSchema, {
				collection: CashFlowMongoDataGateway.cashFlowCollectionName,
				strictQuery: "throw",
			}),
		);
	await CashFlowModel.insertMany([
		{
			_id: "d9ce0396607e408fa925fc691ab9360f",
			account: {
				investorID: "7bce35a2cfa048dd93bba3029ab21903",
				broker: {
					id: "1fc9e8e93b2740719c7431d20d6aa2b2",
					companyName: "XP INVESTIMENTOS CCTVM S/A",
				},
			},
			source: "DEPOSIT",
			value: { amount: 10000, currency: "BRL" },
			operation: "IN",
			operationDate: new Date("2022-10-01T00:00:00"),
			settlementDate: new Date("2022-10-01T00:00:00"),
			createdAt: new Date(),
		},
		{
			_id: "314c7367b62b42939fcd89919e41c4b4",
			account: {
				investorID: "7bce35a2cfa048dd93bba3029ab21903",
				broker: {
					id: "1fc9e8e93b2740719c7431d20d6aa2b2",
					companyName: "XP INVESTIMENTOS CCTVM S/A",
				},
			},
			source: "TRADING",
			value: { amount: 951, currency: "BRL" },
			operation: "OUT",
			operationDate: new Date("2022-09-04T00:00:00"),
			settlementDate: new Date("2022-09-05T00:00:00"),
			createdAt: new Date(),
		},
		{
			_id: "7545499d016e4fe69c9e9a4b17dc4eeb",
			account: {
				investorID: "7bce35a2cfa048dd93bba3029ab21903",
				broker: {
					id: "1fc9e8e93b2740719c7431d20d6aa2b2",
					companyName: "XP INVESTIMENTOS CCTVM S/A",
				},
			},
			source: "FEE",
			value: { amount: 1, currency: "BRL" },
			operation: "OUT",
			operationDate: new Date("2022-09-04T00:00:00"),
			settlementDate: new Date("2022-09-05T00:00:00"),
			createdAt: new Date(),
		},
		{
			_id: "c4e0834a4ae745258d98bb790341d4da",
			account: {
				investorID: "7bce35a2cfa048dd93bba3029ab21903",
				broker: {
					id: "1fc9e8e93b2740719c7431d20d6aa2b2",
					companyName: "XP INVESTIMENTOS CCTVM S/A",
				},
			},
			source: "BROKERAGE_FEE",
			value: { amount: 0.5, currency: "BRL" },
			operation: "OUT",
			operationDate: new Date("2022-09-04T00:00:00"),
			settlementDate: new Date("2022-09-05T00:00:00"),
			createdAt: new Date(),
		},
		{
			_id: "d13e04a0998846cb88d2354fc0210be3",
			account: {
				investorID: "7bce35a2cfa048dd93bba3029ab21903",
				broker: {
					id: "1fc9e8e93b2740719c7431d20d6aa2b2",
					companyName: "XP INVESTIMENTOS CCTVM S/A",
				},
			},
			source: "TRADING",
			value: { amount: 2000, currency: "BRL" },
			operation: "OUT",
			operationDate: new Date("2022-09-05T00:00:00"),
			settlementDate: new Date("2022-09-06T00:00:00"),
			createdAt: new Date(),
		},
		{
			_id: "1e93f06f872c40b1872e0180578c45c1",
			account: {
				investorID: "7bce35a2cfa048dd93bba3029ab21903",
				broker: {
					id: "1fc9e8e93b2740719c7431d20d6aa2b2",
					companyName: "XP INVESTIMENTOS CCTVM S/A",
				},
			},
			source: "TRADING",
			value: { amount: 668, currency: "BRL" },
			operation: "OUT",
			operationDate: new Date("2022-09-18T00:00:00"),
			settlementDate: new Date("2022-09-19T00:00:00"),
			createdAt: new Date(),
		},
		{
			_id: "93bc3281c65b4225a71a4fdd195a12dc",
			account: {
				investorID: "7bce35a2cfa048dd93bba3029ab21903",
				broker: {
					id: "1fc9e8e93b2740719c7431d20d6aa2b2",
					companyName: "XP INVESTIMENTOS CCTVM S/A",
				},
			},
			source: "FEE",
			value: { amount: 0.9, currency: "BRL" },
			operation: "OUT",
			operationDate: new Date("2022-09-18T00:00:00"),
			settlementDate: new Date("2022-09-19T00:00:00"),
			createdAt: new Date(),
		},
		{
			_id: "5e0bb16be6d94708b892e2a9e21fc80b",
			account: {
				investorID: "7bce35a2cfa048dd93bba3029ab21903",
				broker: {
					id: "1fc9e8e93b2740719c7431d20d6aa2b2",
					companyName: "XP INVESTIMENTOS CCTVM S/A",
				},
			},
			source: "BROKERAGE_FEE",
			value: { amount: 0.35, currency: "BRL" },
			operation: "OUT",
			operationDate: new Date("2022-09-18T00:00:00"),
			settlementDate: new Date("2022-09-19T00:00:00"),
			createdAt: new Date(),
		},
		{
			_id: "412b68fbddce4bd09f2e4a5dc7cb781e",
			account: {
				investorID: "7bce35a2cfa048dd93bba3029ab21903",
				broker: {
					id: "1fc9e8e93b2740719c7431d20d6aa2b2",
					companyName: "XP INVESTIMENTOS CCTVM S/A",
				},
			},
			source: "TRADING",
			value: { amount: 1200, currency: "BRL" },
			operation: "OUT",
			operationDate: new Date("2022-10-02T00:00:00"),
			settlementDate: new Date("2022-10-02T00:00:00"),
			createdAt: new Date(),
		},
		{
			_id: "23a314eae6a643c6b415d766dce9dce4",
			account: {
				investorID: "7bce35a2cfa048dd93bba3029ab21903",
				broker: {
					id: "1fc9e8e93b2740719c7431d20d6aa2b2",
					companyName: "XP INVESTIMENTOS CCTVM S/A",
				},
			},
			source: "FEE",
			value: { amount: 0.3, currency: "BRL" },
			operation: "OUT",
			operationDate: new Date("2022-10-02T00:00:00"),
			settlementDate: new Date("2022-10-03T00:00:00"),
			createdAt: new Date(),
		},
		{
			_id: "a81e82952163454faf7503bbda17391d",
			account: {
				investorID: "7bce35a2cfa048dd93bba3029ab21903",
				broker: {
					id: "1fc9e8e93b2740719c7431d20d6aa2b2",
					companyName: "XP INVESTIMENTOS CCTVM S/A",
				},
			},
			source: "BROKERAGE_FEE",
			value: { amount: 0.2, currency: "BRL" },
			operation: "OUT",
			operationDate: new Date("2022-10-02T00:00:00"),
			settlementDate: new Date("2022-10-03T00:00:00"),
			createdAt: new Date(),
		},
		{
			_id: "7da41c8b2452463c8e8621db63693b7a",
			account: {
				investorID: "7bce35a2cfa048dd93bba3029ab21903",
				broker: {
					id: "1fc9e8e93b2740719c7431d20d6aa2b2",
					companyName: "XP INVESTIMENTOS CCTVM S/A",
				},
			},
			source: "TRADING",
			value: { amount: 100, currency: "BRL" },
			operation: "OUT",
			operationDate: new Date("2022-09-11T00:00:00"),
			settlementDate: new Date("2022-09-12T00:00:00"),
			createdAt: new Date(),
		},
		{
			_id: "2aa142ae835743558065a02c0c96aaad",
			account: {
				investorID: "7bce35a2cfa048dd93bba3029ab21903",
				broker: {
					id: "1fc9e8e93b2740719c7431d20d6aa2b2",
					companyName: "XP INVESTIMENTOS CCTVM S/A",
				},
			},
			source: "FEE",
			value: { amount: 0.5, currency: "BRL" },
			operation: "OUT",
			operationDate: new Date("2022-09-12T00:00:00.000Z"),
			settlementDate: new Date("2022-09-13T00:00:00.000Z"),
			createdAt: new Date(),
		},
		{
			_id: "f174348ed8c04e708c878114d70f0653",
			account: {
				investorID: "7bce35a2cfa048dd93bba3029ab21903",
				broker: {
					id: "1fc9e8e93b2740719c7431d20d6aa2b2",
					companyName: "XP INVESTIMENTOS CCTVM S/A",
				},
			},
			source: "BROKERAGE_FEE",
			value: { amount: 0.25, currency: "BRL" },
			operation: "OUT",
			operationDate: new Date("2022-09-12T00:00:00.000Z"),
			settlementDate: new Date("2022-09-13T00:00:00.000Z"),
			createdAt: new Date(),
		},
		{
			_id: "3647a1dc1b9e49d980f854b0ea16a79e",
			account: {
				investorID: "7bce35a2cfa048dd93bba3029ab21903",
				broker: {
					id: "1fc9e8e93b2740719c7431d20d6aa2b2",
					companyName: "XP INVESTIMENTOS CCTVM S/A",
				},
			},
			source: "TRADING",
			value: { amount: 110, currency: "BRL" },
			operation: "IN",
			operationDate: new Date("2022-10-18T00:00:00"),
			settlementDate: new Date("2022-10-19T00:00:00"),
			createdAt: new Date(),
		},
		{
			_id: "033d07e3343046778a345bd208a94a28",
			account: {
				investorID: "7bce35a2cfa048dd93bba3029ab21903",
				broker: {
					id: "1fc9e8e93b2740719c7431d20d6aa2b2",
					companyName: "XP INVESTIMENTOS CCTVM S/A",
				},
			},
			source: "FEE",
			value: { amount: 0.5, currency: "BRL" },
			operation: "OUT",
			operationDate: new Date("2022-10-19T00:00:00.000Z"),
			settlementDate: new Date("2022-10-20T00:00:00.000Z"),
			createdAt: new Date(),
		},
		{
			_id: "8cd25e2461ec4a65acd19868363ececb",
			account: {
				investorID: "7bce35a2cfa048dd93bba3029ab21903",
				broker: {
					id: "1fc9e8e93b2740719c7431d20d6aa2b2",
					companyName: "XP INVESTIMENTOS CCTVM S/A",
				},
			},
			source: "BROKERAGE_FEE",
			value: { amount: 0.5, currency: "BRL" },
			operation: "OUT",
			operationDate: new Date("2022-10-18T00:00:00"),
			settlementDate: new Date("2022-10-19T00:00:00"),
			createdAt: new Date(),
		},
	]);
};
