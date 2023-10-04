import patients from '../../data/patients';
import { WithoutSSN, Patient, NewPatientEntry } from '../types';
import { v4 as uuid } from 'uuid';

const id = uuid();
const getPatients = (): WithoutSSN[] => {
	return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
		id,
		name,
		dateOfBirth,
		gender,
		occupation
	}));
};

const addPatient = (entry: NewPatientEntry): Patient => {
	const newPatient = {
		id,
		...entry
	}
	return newPatient;
};

export default {
	getPatients,
	addPatient
};