import { ValueObject } from "../../../../core/domain";

export type NoteValue = string;
export class Note extends ValueObject<NoteValue> {
	private constructor(value: NoteValue) {
		super(value);
	}
	public static create(value: NoteValue): Note {
		const sanitizedValue = value.trim();
		return new Note(sanitizedValue);
	}
	public static load(value: NoteValue): Note {
		return new Note(value);
	}
}
