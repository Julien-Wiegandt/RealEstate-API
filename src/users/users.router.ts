import express, { Request, Response } from "express";
import { NotFoundError } from "../exceptions/NotFoundError";
import { verifyAccess } from "../middlewares/auth.middleware";
import { isPartialUser, User } from "./users.interface";
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
    if (e instanceof NotFoundError) {
      res.status(404).json({ message: e.getMessage() });
    } else {
      res.sendStatus(500);
    }
  }
});

usersRouter.patch("/:id", verifyAccess, async (req: Request, res: Response) => {
  if (req.user.id != req.params.id) {
    res.sendStatus(401);
  } else if (!isPartialUser(req.body)) {
    res.status(403).json({ message: "Body should be a partial user" });
  } else {
    try {
      const patchedUser = { ...req.body, ...req.user } as User;
      const updateStatus = await UsersService.update(req.user.id, patchedUser);
      res.status(200).json({ updateStatus });
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  }
});

usersRouter.delete("/", async (req: Request, res: Response) => {});
