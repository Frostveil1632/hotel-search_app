const express = require('express');
const cors = require('cors');

// This line reads your massive JSON file automatically!
const hotelData = require('./data.json'); 

const app = express();
app.use(cors());

// Serve the data when the frontend asks for it
app.get('/api/hotels', (req, res) => {
  res.json(hotelData);
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});