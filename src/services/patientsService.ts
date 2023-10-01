import patients from '../../data/patients';
import { WithoutSSN } from '../types';

const getPatients = (): WithoutSSN[] => {
	return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
		id,
		name,
		dateOfBirth,
		gender,
		occupation
	}));
};

const addPatient = () => {
	return null;
};

export default {
	getPatients,
	addPatient
};