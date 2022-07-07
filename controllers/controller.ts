import { Request, Response } from "express";

async function getTaskList(req: Request, res: Response) {
  const tasks = "nada";
  res.send(tasks);
}