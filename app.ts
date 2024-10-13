// external pacages
import exp from 'express'
import cookieParser from 'cookie-parser';
// internal pacages
import dbConnection from './dbConfig';

import 'dotenv/config'
const port = process.env.PORT

const app = exp()
dbConnection()

app.use(exp.json())
app.use(cookieParser())

app.listen(port, () => {
    console.log(`Listening at localhost:${port}...`);
})