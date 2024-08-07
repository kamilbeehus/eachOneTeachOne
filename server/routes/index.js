import express from "express";
import mongoose from "mongoose";

const router = express.Router();

// Route for the Landing page 
router.get('/', (request, response) => {
    return response.status(200).send("<h1>Welcome to Each One Teach One</h1>")
})

// Add a route to test database operation
router.get('/test-db', async (req, res) => {
    const TestModel = mongoose.model('Test', new mongoose.Schema({ name: String }));
    try {
      const testDoc = new TestModel({ name: 'Test Document' });
      await testDoc.save();
      res.send('Document saved to database');
    } catch (error) {
      res.status(500).send('Database operation failed');
    }
  });

  // Route for handling unvalid requests
router.get('/*', (request, response) => {
    return response.status(404).send("Page Not Found")
})

export default router;
