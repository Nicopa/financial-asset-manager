export interface Routine {
	execute(): Promise<void>;
	start(): void;
}
