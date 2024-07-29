import express, { response } from "express";
import cors from 'cors';
import { PORT } from "./config.js"

const app = express();

app.use(cors());

app.get('/', (request, response) => {
    console.log(request)
    return response.status(200).send("Welcome to MERN Stack Tutorial")
})

app.listen(PORT, () => {
    console.log(`App is listening to port: ${PORT}`)
})