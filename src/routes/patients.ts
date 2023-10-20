import express from 'express';
import patientsService from '../services/patientsService';
import toNewPatientEntry from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
	res.send(patientsService.getPatients());
});


router.get('/:id', (req, res) => {
	const id = req.params.id;

	// Use the patientsService to retrieve the patient by ID
	const patient = patientsService.getPatientById(id);

	if (!patient) {
		return res.status(404).json({ error: 'Patient not found' });
	}

	// Return the patient information
	return res.json(patient);
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