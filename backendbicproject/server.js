require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { dbconnection } = require('./utils/db.js'); // ✅ Destructure the function
const routes = require('./routes/index');
const { routeNotFound, errorHandler } = require('./middlewares/errorMiddleware');

const PORT = process.env.PORT || 5000;
const app = express();

(async () => {
  try {
    // Initialize database connection and get sequelize instance
    const sequelize = await dbconnection("myappdb", "postgres", "admin");
    
    // Middleware
    app.use(cors({
      origin: ['http://localhost:3000', 'http://localhost:3001'],
      methods: ["GET", "PUT", "POST", "DELETE"],
      credentials: true,
    }));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(morgan("dev"));
    
    const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'middlewares/uploads')));
    // Routes
    app.use('/api', routes);
    app.use(routeNotFound);
    app.use(errorHandler);


    if (sequelize) {
      try {
        // Database sync is already handled in dbconnection function
        app.listen(PORT, () => {
          console.log(`✅ Server is running on port ${PORT}`);
        });
      } catch (err) {
        console.error("Unable to start server:", err);
      }
    } else {
      console.error("Sequelize instance not available. Server not started.");
    }
    
  } catch (error) {
    console.error("Failed to initialize database:", error);
    process.exit(1);
  }
})();