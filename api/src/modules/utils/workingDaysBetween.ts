const MILISECONDS_PER_DAY = 86400 * 1000;
export function getWorkingDaysBetween(startDate: Date, endDate: Date): number {
	// Calculate days between dates
	if (endDate <= startDate) return 0;
	endDate.setHours(23, 59, 59, 999);
	const diff = endDate.getTime() - startDate.getTime();
	const days = Math.ceil(diff / MILISECONDS_PER_DAY);

	// Subtract two weekend days for every week in between
	const weeks = Math.floor(days / 7);
	let workingDays = days - weeks * 2;

	// Handle special cases
	const startDay = startDate.getDay();
	const endDay = endDate.getDay();

	// Remove weekend not previously removed.
	if (startDay - endDay > 1) {
		workingDays -= 2;
	}
	// Remove start day if span starts on Sunday but ends before Saturday
	if (startDay == 0 && endDay != 6) {
		workingDays--;
	}
	// Remove end day if span ends on Saturday but starts after Sunday
	if (endDay == 6 && startDay != 0) {
		workingDays--;
	}
	/* Here is the code */
	/* holidays.forEach((day) => {
		if (day >= d0 && day <= d1) {
			// If it is not saturday (6) or sunday (0), substract it
			if (parseDate(day).getDay() % 6 != 0) {
				days--;
			}
		}
	}); */
	return workingDays;
}
