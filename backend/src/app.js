const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const studentsRoutes = require('./routes/students.routes');
const errorHandler = require('./middleware/errorHandler');
const AppError = require('./utils/AppError');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/students', studentsRoutes);

app.use((req, res, next) => {
  next(new AppError(404, 'Route introuvable'));
});

app.use(errorHandler);

module.exports = app;
