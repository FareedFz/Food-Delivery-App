require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./mongoDB');
const userRoutes = require('./routes/user'); // ✅ matches your folder

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/users', userRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
