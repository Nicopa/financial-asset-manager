import { Knex } from "knex";
import { AssetKnexRepository } from "../../../asset/repository";

export async function seed(knex: Knex): Promise<void> {
	// Deletes ALL existing entries
	await knex(AssetKnexRepository.assetTableName).del();

	// Inserts seed entries
	await knex(AssetKnexRepository.assetTableName).insert([
		{
			id: "c85f32b3d9da40bc82a6e98509e1b5ea",
			name: "AERI3",
			type: "BRAZILIAN_STOCK",
			lastPrice: 2.06,
		},
		{
			id: "c5c2bbdc1c464e0dbad477b21efc625a",
			name: "ALUP3",
			type: "BRAZILIAN_STOCK",
			lastPrice: 9.25,
		},
		{
			id: "3bf0e3c3a7ad4aafab845a8ea0cd2313",
			name: "AZUL4",
			type: "BRAZILIAN_STOCK",
			lastPrice: 17.38,
		},
		{
			id: "8211aa3ab9564d5a8fd30f70637b0dfc",
			name: "B3SA3",
			type: "BRAZILIAN_STOCK",
			lastPrice: 14.93,
		},
		{
			id: "098d31de45e84cdfa760ae239c238a60",
			name: "CYRE3",
			type: "BRAZILIAN_STOCK",
			lastPrice: 19.1,
		},
		{
			id: "e864b2c53c5a4fc4a5f385b29b0131b8",
			name: "EGIE3",
			type: "BRAZILIAN_STOCK",
			lastPrice: 38.97,
		},
		{
			id: "9234991cf4694a498033dd031389da05",
			name: "MGLU3",
			type: "BRAZILIAN_STOCK",
			lastPrice: 5.32,
		},
		{
			id: "08e25ec11c834ea1bbe5134b6ce5c272",
			name: "NTCO3",
			type: "BRAZILIAN_STOCK",
			lastPrice: 13.16,
		},
		{
			id: "dd1103c13100409ab1e78936b2914f88",
			name: "PETR3",
			type: "BRAZILIAN_STOCK",
			lastPrice: 37.11,
		},
		{
			id: "c18030864d844e15a0b6d062108fc536",
			name: "PETR4",
			type: "BRAZILIAN_STOCK",
			lastPrice: 33.3,
		},
		{
			id: "13770066eac241338b7c793efadd0302",
			name: "TRXF11",
			type: "BRAZILIAN_REAL_ESTATE",
			lastPrice: 108.56,
		},
		{
			id: "feb28ecaa77a4e51940bf96b5b5183db",
			name: "SDIL11",
			type: "BRAZILIAN_REAL_ESTATE",
			lastPrice: 98,
		},
		{
			id: "5b0c0cdd57e1401eaf2dd7edd229d6c3",
			name: "ALZR11",
			type: "BRAZILIAN_REAL_ESTATE",
			lastPrice: 118.71,
		},
		{
			id: "eb9b3abca1794f67aedda4c2ea57ccc7",
			name: "BCFF11",
			type: "BRAZILIAN_REAL_ESTATE",
			lastPrice: 71.48,
		},
		{
			id: "c97226ed270a4ca09da8999f8f2415fe",
			name: "BRCR11",
			type: "BRAZILIAN_REAL_ESTATE",
			lastPrice: 66.69,
		},
		{
			id: "89540adaf09b4ba8820686604463999a",
			name: "FIIP11B",
			type: "BRAZILIAN_REAL_ESTATE",
			lastPrice: 162.5,
		},
		{
			id: "e25ea5adfcec49319a9001b9cb80d697",
			name: "HFOF11",
			type: "BRAZILIAN_REAL_ESTATE",
			lastPrice: 79.09,
		},
		{
			id: "446ab3b81eb24177a63e27d4e95907d2",
			name: "RECT11",
			type: "BRAZILIAN_REAL_ESTATE",
			lastPrice: 60,
		},
		{
			id: "f121ebd0e089437185daf7f25f83a440",
			name: "A1LK34",
			type: "BRAZILIAN_DEPOSITARY_RECEIPT",
			lastPrice: 207,
		},
		{
			id: "5b01c4bafe8f4a9b88769d0622039ac8",
			name: "NFLX34",
			type: "BRAZILIAN_DEPOSITARY_RECEIPT",
			lastPrice: 23.96,
		},
		{
			id: "333b9e551d8f492cabc9c0c23c467cbf",
			name: "BOVA11",
			type: "BRAZILIAN_ETF",
			lastPrice: 111.83,
		},
		{
			id: "3eaa1cc211824ed1b3b66cc6167a1995",
			name: "ECOO11",
			type: "BRAZILIAN_ETF",
			lastPrice: 99,
		},
		{
			id: "859497d98ca9435c8c749d9cc5854ce9",
			name: "CDB Banco Master 12%",
			type: "CDB",
			lastPrice: 1,
		},
		{
			id: "673bd1dcd831445490b1e06529a19cae",
			name: "CDB Banco Master IPCA+8,21%",
			type: "CDB",
			lastPrice: 1,
		},
		{
			id: "2ca3864c19064281aa7b774e9665e94d",
			name: "CDB Banco Master 125% CDI",
			type: "CDB",
			lastPrice: 1,
		},
		{
			id: "8a6d6d33120c4f8b9e6f647470356504",
			name: "TSLA34",
			type: "BRAZILIAN_DEPOSITARY_RECEIPT",
			lastPrice: 34.5,
		},
		{
			id: "a01408bf4ac241da8936f485e9ab3d6f",
			name: "CDB Banco Master 124% CDI",
			type: "CDB",
			lastPrice: 1000,
		},
	]);
}
