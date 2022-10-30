export abstract class BaseError {
	constructor(
		public readonly code: string,
		public readonly message: string,
		public readonly value?: any,
	) {}
}
