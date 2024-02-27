import express from "express";
import ip from "ip";
import dotenv from "dotenv";
import Response from './domain/response.js';
import logger from './util/logger.js';
import HttpStatus from "./controller/patient.controller.js";
import patientRoutes from "./route/patient.route.js";

dotenv.config();

const PORT = process.env.SERVER_PORT || 3000;
const app = express();
app.use(express.json());

app.use('/patients', patientRoutes);

app.get("/", (req, res) => {
  res.send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'Patient API, v1.0.0'));
});

app.all("*", (req, res) => { 
  res.status(HttpStatus.NOT_FOUND.code)
     .send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, 'Route does not exist.'));
});

app.listen(PORT, () =>
    logger.info(`Server running on: ${ip.address()}:${PORT}`)
);
