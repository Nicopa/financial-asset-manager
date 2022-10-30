export interface BrazilianStockDataGateway {
	getAll<T extends {}>(): Promise<T[]>;
}
