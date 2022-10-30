export interface BDRDataGateway {
	getAll<T extends {}>(): Promise<T[]>;
}
