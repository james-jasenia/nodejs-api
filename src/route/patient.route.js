import express from 'express';
import { getPatient, getPatients, createPatient, deletePatient, updatePatient } from '../controller/patient.controller';

const patientRoutes = express.Router();

patientRoutes.route('/')
    .get(getPatients)
    .post(createPatient);


patientRoutes.route('/:id')
    .get(getPatient)
    .put(updatePatient)
    .delete(deletePatient);

export default patientRoutes;