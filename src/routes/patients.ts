import express from 'express';
import patientsService from '../services/patientsService';
import toNewPatientEntry from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
	res.send(patientsService.getPatients());
});

router.post('/', (req, res) => {
	try {
		const newDiaryEntry = toNewPatientEntry(req.body);
		const addedPatient = patientsService.addPatient(newDiaryEntry)
		res.json(addedPatient)
	} catch (error: unknown) {
		let errorMessage = 'Something went wrong.';
		if (error instanceof Error) {
			errorMessage += ' Error: ' + error.message;
		}
		res.status(400).send(errorMessage);
	}
});

export default router;