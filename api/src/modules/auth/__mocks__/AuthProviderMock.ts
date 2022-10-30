import { AuthProvider } from "../AuthProvider";

export const authProviderMock: AuthProvider = {
	getToken(payload) {
		return "token";
	},
	getPayload(token) {
		return "payload";
	},
	isEqualPassword: function (password1: string, password2: string): boolean {
		return password1 === password2;
	},
};
