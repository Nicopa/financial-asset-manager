import { BrokerRepository } from "./BrokerRepository";

export class BrokerKnexRepository implements BrokerRepository {
	public static readonly brokerTableName = "brokers";
}
