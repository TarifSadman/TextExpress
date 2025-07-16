import { pool } from "../db.js";

export async function insertUser({ name, email }) {
  const result = await pool.query(
    "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
    [name, email]
  );
  return result.rows[0];
}

export async function fetchAllUsers(search) {
  if (search) {
    const result = await pool.query(
      `SELECT * FROM users WHERE LOWER(name) LIKE $1 OR LOWER(email) LIKE $1`,
      [`%${search.toLowerCase()}%`]
    );
    return result.rows;
  }

  const result = await pool.query("SELECT * FROM users");
  return result.rows;
}
