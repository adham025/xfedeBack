import express from "express";
import * as allRoutes from "./index.routers.js";
import { ApiDocumentation } from "./utils/apiDocs.js";

const app = express();

app.use(express.json());

// API Routes
app.use("/api/v1/auth", allRoutes.authRouter);
app.use("/api/v1/developer", allRoutes.developerRouter);
app.use("/api/v1/project", allRoutes.projectRouter);
app.use("/api/v1/property", allRoutes.propertyRouter);

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "Welcome to our Application",
    ApiDocumentation,
  });
});

app.all("*", (req, res) => {
  return res.status(404).json({
    message: "Invalid URL or Method",
    path: req.originalUrl,
    method: req.method,
  });
});

export default app;
