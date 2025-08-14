import { query } from "../config/db.js";

export async function findAllArtifacts({ limit = 50, offset = 0 } = {}) {
  const sql = `
    SELECT 
      a.id, a.user_id, a.status_id, a.type_id, a.name, a.description, a.history,
      a.price, a.age, a.origin, a.image, a.created_at,
      t.label AS type_label, s.name AS status_name
    FROM artifacts a
    LEFT JOIN types t    ON t.id = a.type_id
    LEFT JOIN statuses s ON s.id = a.status_id
    ORDER BY a.created_at DESC
    LIMIT $1 OFFSET $2;
  `;
  const { rows } = await query(sql, [limit, offset]);
  return rows;
}

export async function findArtifactsByUserId(userId, { limit = 50, offset = 0 } = {}) {
  const sql = `
    SELECT 
      a.id, a.user_id, a.status_id, a.type_id, a.name, a.description, a.history,
      a.price, a.age, a.origin, a.image, a.created_at,
      t.label AS type_label, s.name AS status_name
    FROM artifacts a
    LEFT JOIN types t    ON t.id = a.type_id
    LEFT JOIN statuses s ON s.id = a.status_id
    WHERE a.user_id = $1
    ORDER BY a.created_at DESC
    LIMIT $2 OFFSET $3;
  `;
  const { rows } = await query(sql, [userId, limit, offset]);
  return rows;
}

export async function createArtifact(userId, {
  name, type_id, price,
  description = null,
  history = null,
  age = null,
  origin = null,
  image = null,
  status_id = 1
}) {
  const sql = `
    INSERT INTO artifacts
      (user_id, status_id, type_id, name, description, history, price, age, origin, image)
    VALUES
      ($1,      $2,        $3,      $4,   $5,          $6,      $7,    $8,   $9,     $10)
    RETURNING id, user_id, status_id, type_id, name, description, history, price, age, origin, image, created_at;
  `;
  const params = [userId, status_id, type_id, name, description, history, price, age, origin, image];
  const { rows } = await query(sql, params);
  return rows[0];
}

export async function deleteArtifactById(id, userId) {
  const sql = `DELETE FROM artifacts WHERE id = $1 AND user_id = $2 RETURNING id;`;
  const { rows } = await query(sql, [id, userId]);
  return rows[0];
}

export async function existsType(id) {
  const { rows } = await query(`SELECT 1 FROM types WHERE id=$1`, [id]);
  return !!rows[0];
}
export async function existsStatus(id) {
  const { rows } = await query(`SELECT 1 FROM statuses WHERE id=$1`, [id]);
  return !!rows[0];
}