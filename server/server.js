const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Resume = require('./models/Resume');

const app = express();
app.use(cors());
app.use(express.json());

// Connect DB (Updated)
mongoose.connect('mongodb://127.0.0.1:27017/my_portfolio')
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// API Route
app.get('/api/portfolio', async (req, res) => {
  try {
    const data = await Resume.findOne(); 
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));