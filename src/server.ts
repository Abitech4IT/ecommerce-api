import sequelize from "./models";

import app from "./app";

const PORT = process.env.PORT || 3000;

//Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("shutting down the server for handling uncaught exception");
});

// Database connection and server startup
let server;
const startServer = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    console.log("Database connection established successfully.");

    // Sync models with database (in development only)
    if (process.env.NODE_ENV === "development") {
      await sequelize.sync({ alter: true });
      console.log("Database synchronized.");
    }

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
  }
};

startServer();

//unhandle promise rejection
process.on("unhandledRejection", (err: any) => {
  console.log(`Shutting down the server for ${err.message}`);
  console.log("Shutting down the server for unhandle promise rejection");

  server.close(() => {
    process.exit(1);
  });
});
