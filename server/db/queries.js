const pool = require("./pool");

async function insertMessage(author, title, message) {
  await pool.query(
    "INSERT INTO messages (title, message, absolute_time, author_id) WITH t1 AS (SELECT id FROM users WHERE username = $1) SELECT $2, $3, now(), t1.id FROM t1",
    [author, title, message]
  );
}

module.exports = {
  insertMessage
};
