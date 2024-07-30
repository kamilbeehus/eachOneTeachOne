import express from "express";
import cors from 'cors';
import { PORT } from "./config.js"

const app = express();

// Middleware to parse the request body as JSON
app.use(cors());

// Route for the Landing page 
app.get('/', (request, response) => {
    console.log(request)
    return response.status(200).send("<h1>Welcome to Each One Teach One</h1>")
})

// Route for the Login page
app.get('/auth/login', (request, response) => {
    return response.status(200).send("Login page")
})

// Route for handling unvalid requests
app.get('/*', (request, response) => {
    return response.status(404).send("Page Not Found")
})

app.listen(PORT, () => {
    console.log(`App is listening to port: ${PORT}`)
})