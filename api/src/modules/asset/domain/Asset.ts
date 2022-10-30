import { AggregateRoot } from "../../../core/domain";
import { Money, MoneyValue } from "../../money/domain";
import { AssetName, AssetNameValue } from "./asset-name/AssetName";
import { AssetType, AssetTypeValue } from "./asset-type/AssetType";
import { AssetID, AssetIDType } from "./id";

export interface AssetState {
	readonly name: AssetName;
	readonly type: AssetType;
	readonly lastPice: Money;
}
export type AssetLoadParams = {
	id: string;
	name: AssetNameValue;
	type: AssetTypeValue;
	lastPrice: MoneyValue;
};
export class Asset extends AggregateRoot<AssetIDType, AssetState> {
	protected constructor(id: AssetID, state: AssetState) {
		super(id, state);
	}
	public static load({ id, name, type, lastPrice }: AssetLoadParams) {
		return new Asset(AssetID.load(id), {
			name: AssetName.load(name),
			type: AssetType.load(type),
			lastPice: Money.load(lastPrice),
		});
	}
}
