type ParsedQueries = {
	[key: string]:
		| undefined
		| string
		| string[]
		| ParsedQueries
		| ParsedQueries[];
};
export type HTTPRequest = {
	params: {
		[key: string]: string;
	};
	query: ParsedQueries;
	body?: any;
	headers?: any;
	locals?: {
		[key: string]: string;
	};
};
