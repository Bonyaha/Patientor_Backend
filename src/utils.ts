import { Gender, NewPatientEntry, /* Entry */ } from './types';

//function that receives the request body as a parameter and returns a properly-typed NewPatientEntry object
export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
	if (!object || typeof object !== 'object') {
		throw new Error('Incorrect or missing data');
	}
	if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object /* &&
		'entries' in object */) {
		const newPatient: NewPatientEntry = {
			name: parseName(object.name),
			dateOfBirth: parseDateOfBirth(object.dateOfBirth),
			ssn: parseSsn(object.ssn),
			gender: parseGender(object.gender),
			occupation: parseOccupation(object.occupation),
			//entries: parseEntries(object.entries as unknown[]),
		};
		return newPatient;
	}
	throw new Error('Incorrect data: some fields are missing');

};

const isString = (text: unknown): text is string => {
	return typeof text === 'string' || text instanceof String;
};

const parseOccupation = (occupation: unknown): string => {
	if (!isString(occupation)) {
		throw new Error('Incorrect or missing occupation');
	}
	return occupation;
};

const isDate = (date: string): boolean => {
	return Boolean(Date.parse(date));
};

const parseDateOfBirth = (date: unknown): string => {
	if (!isString(date) || !isDate(date)) {
		throw new Error('Incorrect or missing date: ' + date);
	}
	return date;
};

const parseName = (name: unknown): string => {
	if (!isString(name)) {
		throw new Error('Incorrect or missing name');
	}
	return name;
};

const parseSsn = (ssn: unknown): string => {
	if (!isString(ssn)) {
		throw new Error('Incorrect or missing ssn');
	}
	// Use a regular expression to validate SSN format (######-###)
	const ssnPattern = /^(\d{6}-?\d{3}[0-9A-Za-z])|(\d{6}-?\d{2}[0-9A-Za-z])$/;
	if (!ssnPattern.test(ssn)) {
		throw new Error('Invalid SSN format');
	}
	return ssn;
};

const isGender = (str: string): str is Gender => {
	return Object.values(Gender).map(v => v.toString()).includes(str);
};

const parseGender = (gender: unknown): Gender => {
	if (!isString(gender) || !isGender(gender)) {
		throw new Error('Incorrect or missing gender: ' + gender);
	}
	return gender;
};

/* const parseEntries = (entries: unknown[]): Entry[] => {
	if (!Array.isArray(entries)) {
		throw new Error('Entries must be an array');
	}
	// You can add additional validation or parsing for entries here if needed.
	return entries as Entry[];
}; */


export default toNewPatientEntry;