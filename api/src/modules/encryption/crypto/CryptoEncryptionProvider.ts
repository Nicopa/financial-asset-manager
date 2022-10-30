import { createHash, Hash } from "node:crypto";
import { Encryption } from "../../investor/domain/encryption";

export class CryptoEncryptionProvider implements Encryption {
	encryptPassword(password: string): string {
		return createHash("sha256").update(password).digest("hex");
	}
}
