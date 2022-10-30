export abstract class AuthProvider {
	public abstract getToken(payload: string | object): string;
	public abstract getPayload(token: string): string | object;
	isEqualPassword(password1: string, password2: string): boolean {
		return password1 === password2;
	}
}
