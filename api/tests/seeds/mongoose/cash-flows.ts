import mongoose from "mongoose";
import {
	CashFlowDoc,
	CashFlowMongoDataGateway,
} from "../../../src/modules/cash-flow/data-gateway";
import { cashFlowSchema } from "../../../src/modules/database/mongoose/migrations/cash-flows";

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
			_id: "cashflowid1",
			account: {
				investorID: "7bce35a2cfa048dd93bba3029ab21903",
				broker: {
					id: "1fc9e8e93b2740719c7431d20d6aa2b2",
					companyName: "Company Name",
				},
			},
			source: "DEPOSIT",
			value: {
				amount: 1100.5,
				currency: "BRL",
			},
			operation: "IN",
			operationDate: new Date("2022-02-01T16:00:00"),
			settlementDate: new Date("2022-02-01T16:00:00"),
			createdAt: new Date("2022-01-11T10:00:00.001"),
		},
		{
			_id: "cashflowid2",
			account: {
				investorID: "7bce35a2cfa048dd93bba3029ab21903",
				broker: {
					id: "1fc9e8e93b2740719c7431d20d6aa2b2",
					companyName: "Company Name",
				},
			},
			source: "WITHDRAW",
			value: {
				amount: 100,
				currency: "BRL",
			},
			operation: "OUT",
			operationDate: new Date("2022-03-01T16:00:00"),
			settlementDate: new Date("2022-03-01T16:00:00"),
			createdAt: new Date("2022-03-01T16:00:00.002"),
		},
		{
			_id: "cashflowid3",
			account: {
				investorID: "7bce35a2cfa048dd93bba3029ab21903",
				broker: {
					id: "1fc9e8e93b2740719c7431d20d6aa2b2",
					companyName: "Company Name",
				},
			},
			source: "TRADING",
			value: {
				amount: 200,
				currency: "BRL",
			},
			operation: "OUT",
			operationDate: new Date("2022-03-01T16:00:00"),
			settlementDate: new Date("2022-03-01T16:00:00"),
			createdAt: new Date("2022-03-01T16:00:00.003"),
		},
		{
			_id: "cashflowid4",
			account: {
				investorID: "7bce35a2cfa048dd93bba3029ab21903",
				broker: {
					id: "1fc9e8e93b2740719c7431d20d6aa2b2",
					companyName: "Company Name",
				},
			},
			source: "FEE",
			value: {
				amount: 0.5,
				currency: "BRL",
			},
			operation: "OUT",
			operationDate: new Date("2022-03-01T16:00:00"),
			settlementDate: new Date("2022-03-01T16:00:00"),
			createdAt: new Date("2022-03-01T16:00:00.004"),
		},
		{
			_id: "cashflowid5",
			account: {
				investorID: "7bce35a2cfa048dd93bba3029ab21903",
				broker: {
					id: "1fc9e8e93b2740719c7431d20d6aa2b2",
					companyName: "Company Name",
				},
			},
			source: "BROKERAGE_FEE",
			value: {
				amount: 0.25,
				currency: "BRL",
			},
			operation: "OUT",
			operationDate: new Date("2022-03-01T16:00:00"),
			settlementDate: new Date("2022-03-01T16:00:00"),
			createdAt: new Date("2022-03-01T16:00:00.005"),
		},
		{
			_id: "cashflowid6",
			account: {
				investorID: "7bce35a2cfa048dd93bba3029ab21903",
				broker: {
					id: "1fc9e8e93b2740719c7431d20d6aa2b2",
					companyName: "Company Name",
				},
			},
			source: "TRADING",
			value: {
				amount: 100,
				currency: "BRL",
			},
			operation: "IN",
			operationDate: new Date("2022-04-01T16:00:00"),
			settlementDate: new Date("2022-04-01T16:00:00"),
			createdAt: new Date("2022-04-01T16:00:00.006"),
		},
		{
			_id: "cashflowid7",
			account: {
				investorID: "7bce35a2cfa048dd93bba3029ab21903",
				broker: {
					id: "1fc9e8e93b2740719c7431d20d6aa2b2",
					companyName: "Company Name",
				},
			},
			source: "FEE",
			value: {
				amount: 0.4,
				currency: "BRL",
			},
			operation: "OUT",
			operationDate: new Date("2022-04-01T16:00:00"),
			settlementDate: new Date("2022-04-01T16:00:00"),
			createdAt: new Date("2022-04-01T16:00:00.007"),
		},
		{
			_id: "cashflowid8",
			account: {
				investorID: "7bce35a2cfa048dd93bba3029ab21903",
				broker: {
					id: "1fc9e8e93b2740719c7431d20d6aa2b2",
					companyName: "Company Name",
				},
			},
			source: "BROKERAGE_FEE",
			value: {
				amount: 0.29,
				currency: "BRL",
			},
			operation: "OUT",
			operationDate: new Date("2022-04-01T16:00:00"),
			settlementDate: new Date("2022-04-01T16:00:00"),
			createdAt: new Date("2022-04-01T16:00:00.008"),
		},
	]);
};
