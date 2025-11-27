import express from "express";
import * as movieController from "../controller/movieController.js";
import * as userController from "../controller/userController.js";
import { authenticateTokenMiddleware } from "../middlewares/authenticateTokenMiddleware.js";

const api = express.Router();

api.post("/signin", userController.signIn);
api.post("/signup", userController.signUp);

api.get("/movie", movieController.Movie);
api.get("/movie", movieController.detailsMovie);
api.post("/movie", movieController.addMovie);
api.put("/movie/:id", movieController.updateMovie);
api.delete("/movie/:id", movieController.deleteMovie);
api.get("/movie", authenticateTokenMiddleware, movieController.Movie);
api.get("/movie", authenticateTokenMiddleware, movieController.detailsMovie);
api.post("/movie", authenticateTokenMiddleware, movieController.addMovie);
api.put("/movie/:id", authenticateTokenMiddleware, movieController.updateMovie);
api.delete("/movie/:id", authenticateTokenMiddleware, movieController.deleteMovie);

export default api;