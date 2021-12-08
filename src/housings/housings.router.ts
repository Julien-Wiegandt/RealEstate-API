import express, { Request, Response } from "express";
import { NotFoundError } from "../exceptions/NotFoundError";
import { WrongTypeError } from "../exceptions/WrongTypeError";
import { verifyAccess } from "../middlewares/auth.middleware";
import { castToBaseHousing } from "./housings.interface";
import * as HousingsService from "./housings.service";

export const housingsRouter = express.Router();

housingsRouter.get("/", async (req: Request, res: Response) => {
  try {
    const housings = await HousingsService.findAll();
    res.status(200).json(housings);
  } catch (e) {
    res.sendStatus(500);
  }
});

housingsRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const housing = await HousingsService.findOne(id);
    res.status(200).json(housing);
  } catch (e) {
    if (e instanceof NotFoundError) {
      res.status(404).json({ message: e.getMessage() });
    }else{
      res.sendStatus(500);
    }
  }
});

housingsRouter.post("/", verifyAccess, async (req: Request, res: Response) => {
  try {
    console.log(req.body)
    const housing = castToBaseHousing(req.body);
    const newHousing = await HousingsService.create(housing, req.user.id);
    res.status(201).json(newHousing);
  } catch (e) {
    console.log(e)

    if (e instanceof WrongTypeError) {
      res.status(403).json({ message: "Bad request (body)" });
    }else{
      res.sendStatus(500);
    }
  }
});

housingsRouter.patch("/", async (req: Request, res: Response) => {});

housingsRouter.delete("/", async (req: Request, res: Response) => {});
