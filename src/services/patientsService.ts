import patients from '../../data/patients';
import { NonSensitivePatient, Patient, NewPatientEntry, EntryWithoutId, Entry, Diagnosis } from '../types';
import { v4 as uuid } from 'uuid';

const id = uuid();

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> => {
	if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
		// we will just trust the data to be in correct form
		return [] as Array<Diagnosis['code']>;
	}

	return object.diagnosisCodes as Array<Diagnosis['code']>;
};

const getPatients = (): NonSensitivePatient[] => {
	return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
		id,
		name,
		dateOfBirth,
		gender,
		occupation,
	}));
};


const getPatientById = (id: string): Patient | undefined => {
	const patient = patients.find((p) => p.id === id);
	console.log(patient)
	return patient;
}


const addPatient = (entry: NewPatientEntry): Patient => {
	const newPatient = {
		id,
		entries: [],
		...entry
	}
	return newPatient;
};

const addEntryToPatient = (patient: Patient, entryData: EntryWithoutId): Entry => {
	const newEntry: Entry = {
		id: uuid(),
		...entryData,
		diagnosisCodes: parseDiagnosisCodes(entryData),
	};

	patient.entries.push(newEntry);

	return newEntry;
};


export default {
	getPatients,
	getPatientById,
	addPatient,
	addEntryToPatient
};