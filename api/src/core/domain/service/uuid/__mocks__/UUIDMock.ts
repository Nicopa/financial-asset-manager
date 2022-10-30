import { UUIDProvider } from "../UUID";

export class UUIDProviderMock implements UUIDProvider {
	private _counter = 0;

	generate(): string {
		this._counter++;
		return this._counter.toString();
	}
}
