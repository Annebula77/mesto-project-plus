import { Request, Response } from "express";
import { Router } from "express";
import userRouter from "./users";
import { STATUS_NOT_FOUND, INVALID_DATA_MESSAGE } from "../utils/consts";
import cardsRouter from "./cards";

const router = Router();
router.use("/users", userRouter);
router.use("/cards", cardsRouter);
router.use((_req: Request, res: Response) => {
  res.status(STATUS_NOT_FOUND).send(INVALID_DATA_MESSAGE);
});

export default router;