import connection from "../config/database.js";

async function insertNewUser(
  username: string,
  wins: number,
  losses: number,
  draws: number
) {
  return connection.query(
    `INSERT INTO fighters (username, wins, losses, draws) VALUES ($1, $2, $3, $4)`,
    [username, wins, losses, draws]
  );
}

async function updateFighter(tableKey: string, username: string) {
  return connection.query(
    `UPDATE fighters SET ${tableKey} = ${tableKey} + 1 WHERE username = $1`,
    [username]
  );
}

async function getFighterByUsername(username: string) {
  return connection.query(`SELECT * FROM fighters WHERE username = $1`, [
    username,
  ]);
}

async function getRanking() {
  return connection.query(
    `SELECT username, wins, losses, draws FROM fighters ORDER BY wins DESC, draws ASC, losses ASC`
  );
}

const repository = {
  insertNewUser,
  updateFighter,
  getFighterByUsername,
  getRanking,
};

export default repository;