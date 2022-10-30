import jwt, { TokenExpiredError } from "jsonwebtoken";
import { UnexpectedError } from "../../../core/base/error";
import { AuthProvider } from "../AuthProvider";
import config from "./config/jwt-auth.json";
import {
	BadFormatted,
	ExpiredToken,
	NoTokenProvided,
	TokenError,
} from "./error";

export class JWTAuthProvider extends AuthProvider {
	getToken(payload: string | object): string {
		return jwt.sign({ payload }, config.secret, {
			algorithm: "HS256",
			expiresIn: "7d",
		});
	}
	private getCode(token: string): string {
		if (!token) throw new NoTokenProvided("No token provided.");
		const parts = token.split(" ");
		if (parts.length !== 2) throw new BadFormatted("token bad formatted.");
		const [scheme, code] = parts;
		if (!/^Bearer$/i.test(scheme))
			throw new BadFormatted("token bad formatted.");
		return code;
	}
	getPayload(token: string): string | object {
		const code = this.getCode(token);
		try {
			const decoded = jwt.verify(code, config.secret);
			return (decoded as { payload: string | object }).payload;
		} catch (error) {
			if (error instanceof TokenExpiredError)
				throw new ExpiredToken(
					"The token is expired.",
					error.expiredAt.toISOString(),
				);
			throw new TokenError("Wrong token");
		}
	}
}
