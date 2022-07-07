import axios from "axios";
import { conflictError } from "../middlewares/handleErrorMiddleware.js";
import repository from "../repositories/repository.js";

export async function battleService(firstUser: string, secondUser: string) {
  const API_URL: string = "https://api.github.com/users/";
  let firstUserStar: number = 0;
  let secondUserStar: number = 0;
  let draw = false;
  let winner = null;
  let loser = null;

  try {
    const firstUserResult = await axios.get(`${API_URL}${firstUser}/repos`);
    for (let repo of firstUserResult.data) {
      firstUserStar += repo["stargazers_count"];
    }
    const secondUserResult = await axios.get(`${API_URL}${secondUser}/repos`);
    for (let repo of secondUserResult.data) {
      secondUserStar += repo["stargazers_count"];
    }
  } catch (error) {
    return conflictError();
  }

  if (firstUserStar === secondUserStar) {
    draw = true;
  } else if (firstUserStar > secondUserStar) {
    winner = firstUser;
    loser = secondUser;
  } else {
    winner = secondUser;
    loser = firstUser;
  }

  return {
    winner,
    loser,
    draw,
  };
}

export async function updateDatabaseWithoutDraw(winner: string, loser: string) {
  const winnerExist = await repository.getFighterByUsername(winner);
  if (winnerExist.rowCount > 0) {
    await repository.updateFighter("wins", winner);
  } else {
    await repository.insertNewUser(winner, 1, 0, 0);
  }

  const loserResult = await repository.getFighterByUsername(loser);
  if (loserResult.rowCount > 0) {
    await repository.updateFighter("losses", loser);
  } else {
    await repository.insertNewUser(loser, 0, 1, 0);
  }
}

export async function updateDatabaseWithDraw(
  firstUser: string,
  secondUser: string
) {
  const firstResult = await repository.getFighterByUsername(firstUser);
  if (firstResult.rowCount > 0) {
    await repository.updateFighter("draws", firstUser);
  } else {
    await repository.insertNewUser(firstUser, 0, 0, 1);
  }

  const secondResult = await repository.getFighterByUsername(secondUser);
  if (secondResult.rowCount > 0) {
    await repository.updateFighter("draws", secondUser);
  } else {
    await repository.insertNewUser(secondUser, 0, 0, 1);
  }
}