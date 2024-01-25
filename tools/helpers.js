export function calculateAge(birthdate) {
	const birthDate = new Date(birthdate);

	const currentDate = new Date();
	const difference = currentDate - birthDate;
	const age = Math.floor(difference / (365.25 * 24 * 60 * 60 * 1000));

	return age;
}
