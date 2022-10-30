export interface QuoteProvider {
	get(name: string): Promise<number | null>;
}
