export const validateCPF = (cpf: string): boolean => {
	const CPF_NUMBERS_LENGTH = 11;
	const FIRST_CHECK_DIGIT_INDEX = 9;
	const SECOND_CHECK_DIGIT_INDEX = 10;
	const sanitize = (cpf: string): string => {
		return cpf.replace(/\D/gm, "");
	};
	const getCheckDigit = (digits: number[], checkDigitIndex: number): number => {
		let sum = 0;
		for (let index = 0; index < checkDigitIndex; index++)
			sum += digits[index] * (checkDigitIndex + 1 - index);
		const rest = sum % 11;
		return rest < 2 ? 0 : 11 - rest;
	};
	if (!cpf.trim()) return false;
	const sanitizedCpf = sanitize(cpf);
	if (sanitizedCpf.length !== CPF_NUMBERS_LENGTH) return false;
	const digits = sanitizedCpf.split("").map((character) => parseInt(character));
	if (digits.every((digit) => digit === digits[0])) return false;
	const firstCheckDigit = getCheckDigit(digits, FIRST_CHECK_DIGIT_INDEX);
	const secondCheckDigit = getCheckDigit(digits, SECOND_CHECK_DIGIT_INDEX);
	if (
		firstCheckDigit !== digits[FIRST_CHECK_DIGIT_INDEX] ||
		secondCheckDigit !== digits[SECOND_CHECK_DIGIT_INDEX]
	)
		return false;
	return true;
};
