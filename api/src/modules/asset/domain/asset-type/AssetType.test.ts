import { AssetType } from "./AssetType";

describe("[asset] Asset Type", () => {
	test("It should return an asset type object if created with valid data.", () => {
		const assetType = AssetType.create("BRAZILIAN_STOCK");
		expect(assetType).toBeInstanceOf(AssetType);
	});
});
