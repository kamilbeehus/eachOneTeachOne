import express from "express";
// import { authenticateUser } from "../middlewares/authenticateUser.js";

const router = express.Router();

// All routes in this router require the user to be authenticated
// router.use(authenticateUser);

//TODO: Create a route responsible for retrieving all transaction history for a user or admin view.
//Endpoint : api/transactions/user/:userId

export default router;
