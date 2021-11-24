import express, { Request, Response } from "express";
import * as UsersService from "./users.service";

export const usersRouter = express.Router();

usersRouter.get("/", async (req: Request, res: Response) => {
  try {
    const users = await UsersService.findAll();
    res.status(200).json(users);
  } catch (e) {
    res.sendStatus(500);
  }
});

usersRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const user = await UsersService.findOne(id);
    res.status(200).json(user);
  } catch (e) {
    res.sendStatus(500);
  }
});

usersRouter.patch("/:id", async (req: Request, res: Response) => {});

usersRouter.delete("/", async (req: Request, res: Response) => {});