import express from "express";

const router = express.Router();

// Route for the Landing page
router.get("/", (req, res) => {
  return res.status(200).send("<h1>Server Running...</h1>");
});

// Route for handling unvalid requests
router.get("/*", (req, res) => {
  return res.status(404).send("Page Not Found");
});

export default router;
