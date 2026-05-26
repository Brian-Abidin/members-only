const pool = require("./pool");

async function insertMessage(author, title, message) {
  await pool.query(
    "INSERT INTO messages (title, message, absolute_time, author_id) WITH t1 AS (SELECT id FROM users WHERE username = $1) SELECT $2, $3, now(), t1.id FROM t1",
    [author, title, message]
  );
}

async function updateMember(username) {
  await pool.query("UPDATE users SET is_member = true WHERE username = $1", [
    username
  ]);
}

async function updateAdmin(username) {
  await pool.query("UPDATE users SET is_admin = true WHERE username = $1", [
    username
  ]);
}

async function getAllMessages() {
  const { rows } = await pool.query("SELECT * FROM messages");
  return rows;
}

async function getUserById(id) {
  const { rows } = await pool.query(
    "SELECT username FROM users WHERE id = $1",
    [id]
  );
  return rows;
}

module.exports = {
  insertMessage,
  updateMember,
  updateAdmin,
  getAllMessages,
  getUserById
};
