import { Request, Response } from "express";
import { Router } from "express";
import userRouter from "./users";
import { STATUS_NOT_FOUND } from "../utils/consts";

const router = Router();
router.use("/users", userRouter);


router.use((_req: Request, res: Response) => {
  res.status(STATUS_NOT_FOUND).send('Страница не найдена');
});

export default router;