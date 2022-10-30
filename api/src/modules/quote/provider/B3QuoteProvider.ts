import axios from "axios";
import { UnexpectedError } from "../../../core/base/error";
import { FailedResponse } from "./error";
import { QuoteProvider } from "./QuoteProvider";

export class B3QuoteProvider implements QuoteProvider {
	async get(name: string, date?: Date): Promise<number | null> {
		if (!date) date = new Date(Date.now() - 1000 * 60 * 60 * 24 * 2);
		while (date.getDay() >= 5) {
			date = new Date(date.getTime() - 1000 * 60 * 60 * 24);
		}
		try {
			const response = await axios.get(
				`https://arquivos.b3.com.br/apinegocios/ticker/${name}/${date
					.toISOString()
					.slice(0, 10)}`,
			);
			const data = response.data;
			if (!data.values)
				throw new UnexpectedError(
					"Something went wrong trying to get a quote.",
				);
			if (!data.values.length) return null;
			const result = data.values[0][2] as number;
			return result || null;
		} catch (error) {
			throw new FailedResponse(error);
		}
	}
}
