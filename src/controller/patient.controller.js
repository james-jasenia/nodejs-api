import database from '../config/mysql.config.js';
import Response from '../domain/response.js';
import logger from '../util/logger.js';
import QUERY from '../query/patient.query.js';
import util from 'util';


const HttpStatus = {
    OK: {
        code: 200,
        status: 'OK'
    },
    CREATED: {
        code: 201,
        status: 'CREATED'
    },
    NO_CONTENT: {
        code: 204,
        status: 'NO_CONTENT'
    },
    BAD_REQUEST: {
        code: 400,
        status: 'BAD_REQUEST'
    },
    NOT_FOUND: {
        code: 404,
        status: 'NOT_FOUND'
    },
    INTERNAL_SERVER_ERROR: {
        code: 500,
        status: 'INTERNAL_SERVER_ERROR'
    },
};

export const getPatients = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, fetching patients.`);
    database.query(QUERY.SELECT_PATIENTS, (error, result) => {
        if(!result) {
            res.status(HttpStatus.OK.code)
            .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'No patients found.'));
        } else {
            res.status(HttpStatus.OK.code)
            .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'Patients retrieved', {
                data: result
            }));
        }
    });
};

export const createPatient = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, ${util.inspect(req.body)}, creating patient.`);
    database.query(QUERY.CREATE_PATIENT, Object.values(req.body), (error, result) => {
        if(!result) {
            logger.error(error.message);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
                .send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, 'Unable to create patient.'));
        } else {
            const patient = { id: result.insertedId, ...req.body, created_at: new Date() };
            res.status(HttpStatus.CREATED.code)
                .send(new Response(HttpStatus.CREATED.code, HttpStatus.CREATED.status, 'Patient created', { patient }));
        }
    });
};

export const getPatient = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, fetching patient.`);
    database.query(QUERY.SELECT_PATIENT, [req.params.id], (error, result) => {
        if(!result[0]) {
            res.status(HttpStatus.NOT_FOUND.code)
                .send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Patient by id ${req.params.id} not found.`));
        } else {
            res.status(HttpStatus.OK.code)
                .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'Patient retrieved', result[0] ));
        }
    });
};

export const updatePatient = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, updating patient.`);
    database.query(QUERY.SELECT_PATIENT, [req.params.id], (error, result) => {
        if(!result[0]) {
            res.status(HttpStatus.NOT_FOUND.code)
                .send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Patient by id ${req.params.id} not found.`));
        } else {
            logger.info(`${req.method} ${req.originalUrl}, updating patient.`);
            database.query(QUERY.UPDATE_PATIENT, [...Object.values(req.body), req.params.id], (error, result) => {
                if(!error) {
                    res.status(HttpStatus.OK.code)
                        .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'Patient updated', { id: req.params.id, ...req.body }));
                } else {
                    logger.error(error.message);
                    res.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
                        .send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, `Error occured.`));
                }
            });
        }
    });
};

export const deletePatient = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, deleting patient.`);
    database.query(QUERY.DELETE_PATIENT, [req.params.id], (error, result) => {
        if(result.affectedRows > 0) {
            res.status(HttpStatus.OK.code)
                .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'Patient deleted', result[0]));
        } else {
            res.status(HttpStatus.NOT_FOUND.code)
                .send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Patient by id ${req.params.id} not found.`));
        }
    });
};

export default HttpStatus;