import { Sequelize } from "sequelize";

// First connect without database to create it if it doesn't exist
const initialSequelize = new Sequelize("mysql", "root", "", {
  host: "localhost",
  dialect: "mysql",
  logging: false, // Disable logging SQL queries
});

export const sequelize = new Sequelize("task", "root", "", {
  host: "localhost",
  dialect: "mysql",
  logging: false, // Disable logging SQL queries
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

export const createTable = async () => {
  try {
    // First ensure database exists
    await initialSequelize.authenticate();
    await initialSequelize.query("CREATE DATABASE IF NOT EXISTS task;");
    await initialSequelize.close();

    // Now connect to the task database
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");

    // Sync all models
    await sequelize.sync({ alter: true });
    console.log("Database tables synchronized successfully.");

    return true;
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
};
