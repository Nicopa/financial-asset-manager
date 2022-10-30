import { EventBroker } from "../../core/application/event";
import { UUIDProvider as UUIDProviderInterface } from "../../core/domain/service/uuid";
import { AuthProvider } from "../../modules/auth";
import { JWTAuthProvider } from "../../modules/auth/jwt";
import { CryptoEncryptionProvider } from "../../modules/encryption/crypto";
import { MemoryEventBroker } from "../../modules/event-broker";
import { Encryption } from "../../modules/investor/domain/encryption";
import { CurrencyRateProvider } from "../../modules/money/currency-rate";
import { B3QuoteProvider, QuoteProvider } from "../../modules/quote/provider";
import { UUIDProvider } from "../../modules/uuid";

export class ProviderFactory {
	public readonly authProvider: AuthProvider;
	public readonly assetQuoteProvider: QuoteProvider;
	public readonly currencyRateProvider: CurrencyRateProvider;
	public readonly encryption: Encryption;
	public readonly eventBroker: EventBroker;
	public readonly uUIDProvider: UUIDProviderInterface;
	constructor() {
		this.authProvider = new JWTAuthProvider();
		this.assetQuoteProvider = new B3QuoteProvider();
		this.encryption = new CryptoEncryptionProvider();
		this.currencyRateProvider = new CurrencyRateProvider();
		this.eventBroker = new MemoryEventBroker();
		this.uUIDProvider = new UUIDProvider();
	}
}
