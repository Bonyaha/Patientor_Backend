import express from 'express';
import dignosesRouter from './routes/diagnoses';
import patientsRouter from './routes/patients'

const app = express();
app.use(express.json());

const cors = require('cors');
app.use(cors());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
	console.log('someone pinged here');
	res.send('pong');
});

app.use('/api/diagnoses', dignosesRouter);
app.use('/api/patients', patientsRouter);

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});