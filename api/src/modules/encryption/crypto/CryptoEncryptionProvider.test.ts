import { CryptoEncryptionProvider } from "./CryptoEncryptionProvider";

describe("Encryption Provider", () => {
	test("It should encrypt a password", () => {
		const encryptionProvider = new CryptoEncryptionProvider();
		expect(encryptionProvider.encryptPassword("123456789")).toBe(
			"15e2b0d3c33891ebb0f1ef609ec419420c20e320ce94c65fbc8c3312448eb225",
		);
	});
});
