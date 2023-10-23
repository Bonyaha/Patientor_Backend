import express from 'express';
import patientsService from '../services/patientsService';
import toNewPatientEntry from '../utils';
import { EntryWithoutId } from '../types';


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

router.post('/:id/entries', (req, res) => {
	const id = req.params.id;
	//console.log(id);

	const patient = patientsService.getPatientById(id);

	if (!patient) {
		return res.status(404).json({ error: 'Patient not found' });
	}

	try {
		const entryData = req.body as EntryWithoutId;
		/* console.log(entryData);
		console.log(entryData.type === 'HealthCheck' ? entryData.healthCheckRating : 'no');
 */
		// Validate the new entry based on its type
		switch (entryData.type) {
			case 'HealthCheck':
				if (entryData.healthCheckRating === undefined) {
					throw new Error('Required fields for HealthCheckEntry are missing.');
				}
				break;

			case 'OccupationalHealthcare':
				if (!entryData.employerName) {
					throw new Error('Required fields for OccupationalHealthcareEntry are missing.');
				}
				break;

			case 'Hospital':
				if (!entryData.discharge) {
					throw new Error('Required fields for HospitalEntry are missing.');
				}
				break;

			default:
				throw new Error('Invalid entry type.');
		}

		const addedEntry = patientsService.addEntryToPatient(patient, entryData);

		return res.json(addedEntry);
	} catch (error: unknown) {
		let errorMessage = 'Something went wrong.';
		if (error instanceof Error) {
			errorMessage += ' Error: ' + error.message;
		}
		return res.status(400).send(errorMessage);
	}
});


export default router;