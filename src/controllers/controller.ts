import { Request, Response } from "express";
import repository from "../repositories/repository.js";
import {
  battleService,
  updateDatabaseWithDraw,
  updateDatabaseWithoutDraw,
} from "../services/service.js";

export async function battle(req: Request, res: Response) {
  const { firstUser, secondUser }: { firstUser: string; secondUser: string } =
    res.locals.body;
  const response: any = await battleService(firstUser, secondUser);

  if (response.type) {
    throw response;
  } else {
    if (response.draw) {
      updateDatabaseWithDraw(firstUser, secondUser);
    } else {
      updateDatabaseWithoutDraw(response.winner, response.loser);
    }
  }
  res.send(response);
}

export async function ranking(req: Request, res: Response) {
  const { rows: fighters } = await repository.getRanking();
  res.status(200).send({ fighters });
}
