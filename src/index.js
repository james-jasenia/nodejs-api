import express from "express";
import ip from "ip";
import dotenv from "dotenv";
import Response from './domain/response.js';

dotenv.config();

const PORT = process.env.SERVER_PORT || 3000;
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send(new Response(200, 'OK', 'Patient API, v1.0.0', {
    patients: {
        name: "Junior"
    }
  }));
});

console.log(`This is the environment:`);
console.log(process.env);

app.listen(PORT, () =>
  console.log(`Server running on: ${ip.address()}:${PORT}`)
);
