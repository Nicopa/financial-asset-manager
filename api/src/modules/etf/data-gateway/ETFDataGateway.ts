export interface ETFDataGateway {
	getAll<T extends {}>(): Promise<T[]>;
}
