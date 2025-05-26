const forceDatabaseRefresh = false;

import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response } from "express";
import path from "path"; // Import the 'path' module
import routes from "./routes/index.js";
import { sequelize } from "./models/index.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(routes); // API routes should ideally be defined before the static/catch-all

// Serve static files from the React app in production
if (process.env.NODE_ENV === "production") {
  // Correct path from server/dist/server.js to client/dist
  app.use(express.static(path.join(__dirname, "../../client/dist"))); // Corrected path

  app.get("*", (_req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../../client/dist/index.html")); // Corrected path
  });
}

sequelize.sync({ force: forceDatabaseRefresh }).then(() => {
  app.listen(PORT, () => {
    console.log(
      `Server is listening on port ${PORT} in ${
        process.env.NODE_ENV || "development"
      } mode`
    );
    if (process.env.NODE_ENV === "production") {
      console.log("Client static files are being served from client/dist");
    }
  });
});
