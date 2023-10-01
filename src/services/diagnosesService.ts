import diagnoseData from '../../data/diagnoses';
import { Diagnoses } from '../types';

const diagnoses: Diagnoses[] = diagnoseData

const getEntries = (): Diagnoses[] => {
	return diagnoses;
};

const addDiagnose = () => {
	return null;
};

export default {
	getEntries,
	addDiagnose
};