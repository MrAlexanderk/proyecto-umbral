import { query } from "../config/db.js";

const getUserByEmail = async (email) => {
  const { rows } = await query("SELECT * FROM users WHERE email=$1", [email]);
  return rows[0];
};

const getUserById = async (id) => {
  const { rows } = await query(
    "SELECT id, email, username, role, created_at FROM users WHERE id=$1",
    [id]
  );
  return rows[0];
};

const addUser = async ({ email, passwordHash, username, role = "user" }) => {
  const sql = `
    INSERT INTO users (email, password_hash, username, role)
    VALUES ($1,$2,$3,$4)
    RETURNING id, email, username, role, created_at;
  `;
  const { rows } = await query(sql, [email, passwordHash, username, role]);
  return rows[0];
};

const updateUser = async (id, fields) => {
  const allowed = ["email", "username", "password_hash"];
  const set = [];
  const values = [];
  let i = 1;

  for (const key of allowed) {
    if (fields[key] !== undefined) {
      set.push(`${key}=$${i++}`);
      values.push(fields[key]);
    }
  }

  if (!set.length) return await getUserById(id);

  values.push(id);
  const sql = `UPDATE users SET ${set.join(", ")} WHERE id=$${i}
               RETURNING id, email, username, role, created_at`;
  const { rows } = await query(sql, values);
  return rows[0];
};

export const authModel = { getUserByEmail, getUserById, addUser, updateUser };
