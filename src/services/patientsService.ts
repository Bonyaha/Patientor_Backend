import patients from '../../data/patients';
import { NonSensitivePatient, Patient, NewPatientEntry } from '../types';
import { v4 as uuid } from 'uuid';

const id = uuid();
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

export default {
	getPatients,
	getPatientById,
	addPatient
};