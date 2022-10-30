import { ValueObject } from "../../../../core/domain";
import { InvalidType } from "./error";

export const cdbTypes: CDBTypeValue[] = ["PREFIXED", "POSTFIXED"];
export type CDBTypeValue = "PREFIXED" | "POSTFIXED";
export class CDBType extends ValueObject<CDBTypeValue> {
	private constructor(value: CDBTypeValue) {
		super(value);
	}
	private static validateValue(value: CDBTypeValue) {
		if (!cdbTypes.includes(value)) throw new InvalidType(value);
	}
	public static create(value: CDBTypeValue): CDBType {
		CDBType.validateValue(value);
		return new CDBType(value);
	}
	public static load(value: CDBTypeValue): CDBType {
		return new CDBType(value);
	}
}
