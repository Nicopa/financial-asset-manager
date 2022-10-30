import { Knex } from "knex";
import { TradingKnexRepository } from "../../../trading/repository";

export async function seed(knex: Knex): Promise<void> {
	// Deletes ALL existing entries
	await knex(TradingKnexRepository.tradingTableName).del();

	// Inserts seed entries
	await knex(TradingKnexRepository.tradingTableName).insert([
		{
			id: "1595e9256ba54d41a317b3e8922ee50e",
			investorID: "7bce35a2cfa048dd93bba3029ab21903",
			brokerID: "1fc9e8e93b2740719c7431d20d6aa2b2",
			assetID: "dd1103c13100409ab1e78936b2914f88",
			operation: "ACQUISITION",
			operationDate: new Date("2022-10-02T00:00:00"),
			settlementDate: new Date("2022-10-03T00:00:00"),
			quantity: 32,
			grossTotalCashFlowID: "412b68fbddce4bd09f2e4a5dc7cb781e",
			feeCashFlowID: "23a314eae6a643c6b415d766dce9dce4",
			brokerageFeeCashFlowID: "a81e82952163454faf7503bbda17391d",
		},
		{
			id: "664f51285c89428b940a0c1ae5f57473",
			investorID: "7bce35a2cfa048dd93bba3029ab21903",
			brokerID: "1fc9e8e93b2740719c7431d20d6aa2b2",
			assetID: "a01408bf4ac241da8936f485e9ab3d6f",
			operation: "ACQUISITION",
			operationDate: new Date("2022-09-05T00:00:00"),
			settlementDate: new Date("2022-09-06T00:00:00"),
			quantity: 2,
			grossTotalCashFlowID: "d13e04a0998846cb88d2354fc0210be3",
			feeCashFlowID: null,
			brokerageFeeCashFlowID: null,
		},
		{
			id: "7ecc14ab9cc34f998680a7f5da658dee",
			investorID: "7bce35a2cfa048dd93bba3029ab21903",
			brokerID: "1fc9e8e93b2740719c7431d20d6aa2b2",
			assetID: "333b9e551d8f492cabc9c0c23c467cbf",
			operation: "DISPOSAL",
			operationDate: new Date("2022-10-18T00:00:00"),
			settlementDate: new Date("2022-10-19T00:00:00"),
			quantity: 1,
			grossTotalCashFlowID: "3647a1dc1b9e49d980f854b0ea16a79e",
			feeCashFlowID: "033d07e3343046778a345bd208a94a28",
			brokerageFeeCashFlowID: "8cd25e2461ec4a65acd19868363ececb",
		},
		{
			id: "9abd455d2f9947a18b6e02ff6cab1f21",
			investorID: "7bce35a2cfa048dd93bba3029ab21903",
			brokerID: "1fc9e8e93b2740719c7431d20d6aa2b2",
			assetID: "8a6d6d33120c4f8b9e6f647470356504",
			operation: "ACQUISITION",
			operationDate: new Date("2022-09-18T00:00:00"),
			settlementDate: new Date("2022-09-19T00:00:00"),
			quantity: 20,
			grossTotalCashFlowID: "1e93f06f872c40b1872e0180578c45c1",
			feeCashFlowID: "93bc3281c65b4225a71a4fdd195a12dc",
			brokerageFeeCashFlowID: "5e0bb16be6d94708b892e2a9e21fc80b",
		},
		{
			id: "bf830d4793104d19970f0659692a28cb",
			investorID: "7bce35a2cfa048dd93bba3029ab21903",
			brokerID: "1fc9e8e93b2740719c7431d20d6aa2b2",
			assetID: "333b9e551d8f492cabc9c0c23c467cbf",
			operation: "ACQUISITION",
			operationDate: new Date("2022-09-11T00:00:00"),
			settlementDate: new Date("2022-09-12T00:00:00"),
			quantity: 1,
			grossTotalCashFlowID: "7da41c8b2452463c8e8621db63693b7a",
			feeCashFlowID: "2aa142ae835743558065a02c0c96aaad",
			brokerageFeeCashFlowID: "f174348ed8c04e708c878114d70f0653",
		},
		{
			id: "df77bd9cb77d408485c4626c3b74d02b",
			investorID: "7bce35a2cfa048dd93bba3029ab21903",
			brokerID: "1fc9e8e93b2740719c7431d20d6aa2b2",
			assetID: "3eaa1cc211824ed1b3b66cc6167a1995",
			operation: "ACQUISITION",
			operationDate: new Date("2022-09-04T00:00:00"),
			settlementDate: new Date("2022-09-05T00:00:00"),
			quantity: 10,
			grossTotalCashFlowID: "314c7367b62b42939fcd89919e41c4b4",
			feeCashFlowID: "7545499d016e4fe69c9e9a4b17dc4eeb",
			brokerageFeeCashFlowID: "c4e0834a4ae745258d98bb790341d4da",
		},
	]);
}
