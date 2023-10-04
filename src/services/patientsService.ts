import patients from '../../data/patients';
import { WithoutSSN, Gender, Patient } from '../types';
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

const addPatient = (name: string, dateOfBirth: string, ssn: string, gender: Gender, occupation: string): Patient => {
	const newPatient = {
		id,
		name,
		dateOfBirth,
		ssn,
		gender,
		occupation
	}
	return newPatient;
};

export default {
	getPatients,
	addPatient
};