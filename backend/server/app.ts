import * as dotenv from "dotenv";
import * as express from "express";
import * as path from "path";

// Put dotenv in use before importing controllers
dotenv.config();

// Import controllers
import itemsController from "./items/items.controller";
import usersController from "./users/users.controller";

const NAKED_CHALLENGE_FILE_NAME = process.env.NAKED_CHALLENGE_FILE_NAME;
const NAKED_CHALLENGE_FILE_CONTENT = process.env.NAKED_CHALLENGE_FILE_CONTENT;
const WWW_CHALLENGE_FILE_NAME = process.env.WWW_CHALLENGE_FILE_NAME;
const WWW_CHALLENGE_FILE_CONTENT = process.env.WWW_CHALLENGE_FILE_CONTENT;

// Create the express application
const app = express();

// Assign controllers to routes
app.use("/api/items", itemsController);
app.use("/api/users", usersController);

// Declare the path to frontend's static assets
app.use(express.static(path.resolve("..", "frontend", "build")));

// Intercept requests to return the frontend's static entry point
app.get(`/.well-known/acme-challenge/${NAKED_CHALLENGE_FILE_NAME}`, (_, res) => {
  res.status(200);
  res.send(NAKED_CHALLENGE_FILE_CONTENT);
});

app.get(`/.well-known/acme-challenge/${WWW_CHALLENGE_FILE_NAME}`, (_, res) => {
  res.status(200);
  res.send(WWW_CHALLENGE_FILE_CONTENT);
});

app.get("*", (_, response) => {
  response.sendFile(path.resolve("..", "frontend", "build", "index.html"));
});

export default app;
