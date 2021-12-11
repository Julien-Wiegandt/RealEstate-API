import express, { Request, Response } from "express";
import { notifyAll } from "..";
import { NotFoundError } from "../exceptions/NotFoundError";
import { UnauthorizedError } from "../exceptions/UnauthorizedError";
import { WrongTypeError } from "../exceptions/WrongTypeError";
import { verifyAccess } from "../middlewares/auth.middleware";
import { castToArea, castToBaseHousing } from "./housings.interface";
import * as HousingsService from "./housings.service";

export const housingsRouter = express.Router();

housingsRouter.get("/user", verifyAccess, async (req, res) => {
  try {
    const housings = await HousingsService.findUserHousings(req.user.id);
    res.status(200).json({ housings: housings });
  } catch (e) {
    res.sendStatus(500);
  }
});

housingsRouter.get("/", async (req: Request, res: Response) => {
  try {
    const housings = await HousingsService.findAll();
    res.status(200).json(housings);
  } catch (e) {
    res.sendStatus(500);
  }
});

housingsRouter.get("/area/:longitude&:latitude&:radius", async (req, res) => {
  try {
    const area = castToArea(req.params);
    const housingWithinArea = await HousingsService.findAllInRadius(area);
    res.status(200).json({ housings: housingWithinArea });
  } catch (e) {
    console.log(e);
    if (e instanceof WrongTypeError) {
      res.status(403).json({ msg: "Bad request (body)" });
    } else {
      res.sendStatus(500);
    }
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
    } else {
      res.sendStatus(500);
    }
  }
});

housingsRouter.get("/city/:city", async (req: Request, res: Response) => {
  try {
    const city = req.params.city;
    const housing = await HousingsService.findAllByName(city);
    console.log(housing);
    res.status(200).json({ housings: housing });
  } catch (e) {
    console.log(e);
    if (e instanceof NotFoundError) {
      res.status(404).json({ message: e.getMessage() });
    } else {
      res.sendStatus(500);
    }
  }
});

housingsRouter.post("/", verifyAccess, async (req: Request, res: Response) => {
  try {
    const housing = castToBaseHousing(req.body);
    const newHousing = await HousingsService.create(housing, req.user.id);
    notifyAll("/housings", { newHousing });
    res.status(201).json(newHousing);
  } catch (e) {
    if (e instanceof WrongTypeError) {
      res.status(403).json({ message: "Bad request (body)" });
    } else {
      res.sendStatus(500);
    }
  }
});

housingsRouter.patch("/", async (req: Request, res: Response) => {});

housingsRouter.delete(
  "/:id",
  verifyAccess,
  async (req: Request, res: Response) => {
    try {
      const deleteStatus = await HousingsService.deleteOne(
        req.params.id,
        req.user
      );
      res.status(200).json({ deleteStatus });
    } catch (e) {
      if (e instanceof NotFoundError) {
        res.status(404).json({ message: e.getMessage() });
      } else if (e instanceof UnauthorizedError) {
        res.status(401).json({ message: e.getMessage() });
      } else {
        res.sendStatus(500);
      }
    }
  }
);
