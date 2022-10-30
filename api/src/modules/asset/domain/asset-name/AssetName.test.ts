import { AssetName, AssetNameValue } from "./AssetName";
import { InvalidLength } from "./error";

describe("[asset] Asset Name", () => {
	const validAssetNameValue: AssetNameValue = "  Asset 1  ";
	test("It should throw error if asset name length is less than 2 characters.", () => {
		expect(() => AssetName.create("A")).toThrowError(InvalidLength);
	});
	test("It should return an asset name object if created with valid data.", () => {
		const assetName = AssetName.create(validAssetNameValue);
		expect(assetName).toBeInstanceOf(AssetName);
		expect(assetName.value).toBe("Asset 1");
	});
});
