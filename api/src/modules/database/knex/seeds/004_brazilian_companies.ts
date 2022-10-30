import { Knex } from "knex";
import { BrazilianCompanyKnexRepository } from "../../../brazilian-company/repository";

export async function seed(knex: Knex): Promise<void> {
	// Deletes ALL existing entries
	await knex(BrazilianCompanyKnexRepository.brazilianCompanyTableName).del();

	// Inserts seed entries
	await knex(BrazilianCompanyKnexRepository.brazilianCompanyTableName).insert([
		{
			id: "d614144858454f16a4974f9ec53ffafe",
			cnpj: "12.528.708/0001-07",
		},
		{
			id: "4df406ecc3244b6e8943fd56670c4395",
			cnpj: "08.364.948/0001-38",
		},
		{
			id: "e877a129243942f382ef545fd96887c9",
			cnpj: "09.305.994/0001-29",
		},
		{
			id: "86132e401b2b4d1cbb9c4bb0cfbc0dbd",
			cnpj: "09.346.601/0001-25",
		},
		{
			id: "1000b651e74f40218a484f94b0f728e1",
			cnpj: "73.178.600/0001-18",
		},
		{
			id: "d4de9d12936847869e0ca0c2d54ac7fb",
			cnpj: "02.474.103/0001-19",
		},
		{
			id: "761704d895f643928da0088cd4312577",
			cnpj: "47.960.950/0001-21",
		},
		{
			id: "9577a48436274c9bb4d6728cb6357fca",
			cnpj: "32.785.497/0001-97",
		},
		{
			id: "0f3798cf6c444757bcf56a498f85f0eb",
			cnpj: "33.000.167/0001-01",
		},
		{
			id: "f3b28181f00f499c86a4d6a87a13a1ed",
			cnpj: "28.548.288/0001-52",
		},
		{
			id: "538a6fc768664ac789f6b707eecd8eb4",
			cnpj: "11.026.627/0001-38",
		},
		{
			id: "357b76758a2242e08cb95bb873e0dd05",
			cnpj: "08.924.783/0001-01",
		},
		{
			id: "759466daa1594fd685dc5708747ed9b1",
			cnpj: "08.696.175/0001-97",
		},
		{
			id: "50006d1d5f1642dcb9b976ab7a421e53",
			cnpj: "18.307.582/0001-19",
		},
		{
			id: "e7d27026e3a24551abf9ae159a738a62",
			cnpj: "32.274.163/0001-59",
		},
		{
			id: "5524c73873e84a4580a730be47e48b96",
			cnpj: "16.671.412/0001-93",
		},
		{
			id: "3aafe1da200a48018079ebc7f05ae0bf",
			cnpj: "28.737.771/0001-85",
		},
		{
			id: "1fc9e8e93b2740719c7431d20d6aa2b2",
			cnpj: "02.332.886/0001-04",
		},
		{
			id: "a3e06e2a608e4e179092a3d8491c3d03",
			cnpj: "62.169.875/0001-79",
		},
		{
			id: "cb910b2694f845af9431d68a491d876f",
			cnpj: "10.406.511/0001-61",
		},
		{
			id: "c73a6c2c6fdc44d3b3ae0f2fa603bc40",
			cnpj: "15.562.377/0001-01",
		},
		{
			id: "98e9c3039a37400da375d3449a7260a0",
			cnpj: "33.923.798/0002-83",
		},
	]);
}
