import { CDBType } from "./CDBType";

describe("[cdb] CDB Type", () => {
	test("It should return an asset type object if created with valid data.", () => {
		const assetType = CDBType.create("PREFIXED");
		expect(assetType).toBeInstanceOf(CDBType);
	});
});
