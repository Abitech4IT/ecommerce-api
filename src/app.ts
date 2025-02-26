import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import apiRoutes from "./routes";

const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));

// Handle routes
app.use("/api", apiRoutes);

app.get("/", (req, res) => {
  const response = {
    status: true,
    message: "You probably shouldn't be here, but...",
    data: {
      service: "event-booking-api",
      version: "1.0.0",
    },
  };

  res.send(`<pre>${JSON.stringify(response, null, 4)}</pre>`);
});

app.all("*", (req, res, next) => {
  console.log(`Can't find ${req.originalUrl} on this server!`, 404);

  res.status(404).json({
    success: false,
    message: "page not found",
  });
});

export default app;
