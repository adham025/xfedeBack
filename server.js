import app from "./app.js";
import { createTable } from "./DB/connection.js";
import { setupRelations } from "./DB/model/relations.js";

const startServer = async () => {
  try {
    await createTable();
    setupRelations();
    console.log("Database and relations initialized successfully");

    // Start the server
    app.listen(5000, () => {
      console.log("Server is running on port 5000");
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
