const express = require('express');
const cors = require('cors');

const { setupDatabase } = require('./db');
const authRoutes = require('./routes/auth.route');
const apartmentRoutes = require('./routes/apartment.route');
const { verifyToken } = require('./middleware/verifyToken');

const app = express();
app.use(cors());
app.use(express.json());

setupDatabase();

app.use('/auth', authRoutes);
app.use('/apartments', verifyToken, apartmentRoutes);

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to Server',
  });
});

module.exports = app;
