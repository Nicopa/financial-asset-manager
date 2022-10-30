import { Encryption } from "../Encryption";

export const encryptionMock: Encryption = {
	encryptPassword(password: string): string {
		return "########";
	},
};
