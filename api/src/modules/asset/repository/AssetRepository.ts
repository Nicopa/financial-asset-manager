import { Asset } from "../domain";
import { AssetIDType } from "../domain/id";

export interface AssetRepository {
	findByID(id: AssetIDType): Promise<Asset | undefined>;
}
