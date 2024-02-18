const express = require('express');
const ip = require('ip');
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.SERVER_PORT || 3000;
const app = express();
app.use(express.json());

app.get('/', (req, res) => { 
    res.send(
        {
            message: 'UP'
        }
    )
});

console.log(`This is the environment:`);
console.log(process.env);


app.listen(PORT, () => console.log(`Server running on: ${ip.address()}:${PORT}`));
