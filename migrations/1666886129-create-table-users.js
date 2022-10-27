exports.up = async (sql) => {
  await sql`
  CREATE TABLE users (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    email varchar(100) NOT NULL,
    password_hash varchar(70) NOT NULL
  )`;
};

exports.down = async (sql) => {
  await sql`
    DROP TABLE users
  `;
};
