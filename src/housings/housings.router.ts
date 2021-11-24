import express, { Request, Response } from "express";

export const housingsRouter = express.Router();

housingsRouter.get("/", async (req: Request, res: Response) => {});

housingsRouter.get("/:id", async (req: Request, res: Response) => {});

housingsRouter.post("/", async (req: Request, res: Response) => {});

housingsRouter.patch("/", async (req: Request, res: Response) => {});

housingsRouter.delete("/", async (req: Request, res: Response) => {});
