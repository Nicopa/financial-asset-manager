import { ThirdPartyError } from "../../../../core/base/error";

export class FailedResponse extends ThirdPartyError {
	constructor(value: any) {
		super(
			"API_RESPONSE_ERROR",
			"Something went wrong fetching the API service",
		);
		console.error(value);
	}
}
