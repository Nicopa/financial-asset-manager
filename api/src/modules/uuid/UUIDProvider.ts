import { v4 as uuidv4 } from "uuid";
import { UUIDProvider as UUIDProviderInterface } from "../../core/domain/service/uuid";

export class UUIDProvider implements UUIDProviderInterface {
	generate(): string {
		return uuidv4().replace(/-/g, "");
	}
}
