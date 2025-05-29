const express = require('express');
const cors = require('cors');
const schoolRouter = require('./routes/school');
const { PORT } = require('./config/config');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v1/school', schoolRouter);

// Root endpoint
app.get('/api/v1/school/', (req, res) => {
  res.json({
    message: 'Welcome to School Management API',
    version: '1.0.0',
    endpoints: {
      addSchool: 'POST /api/v1/school/addSchool',
      listSchools: 'GET /api/v1/school/listSchools/?latitude={}&longitude={}'
    }
  });
});


// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!'
  });
});


const port = PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
