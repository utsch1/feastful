import { sql } from './connect';

export type User = {
  id: number;
  email: string;
  passwordHash: string;
};

export async function getUserByEmail(email: string) {
  if (!email) return undefined;

  const [user] = await sql<{ id: number; email: string }[]>`
    SELECT
      id,
      email
    FROM
      users
    WHERE
      users.email = ${email}
  `;
  return user;
}

export async function createUser(email: string, password_hash: string) {
  const [userWithoutPassword] = await sql<{ id: number; email: string }[]>`
  INSERT INTO users
    (email, password_hash)
  VALUES
    (${email}, ${password_hash})
  RETURNING
    id,
    email
  `;

  return userWithoutPassword!;
}

export async function getUserWithPasswordHashByEmail(email: string) {
  if (!email) return undefined;

  const [user] = await sql<User[]>`
    SELECT
      *
    FROM
      users
    WHERE
      users.email = ${email}
  `;
  return user;
}

export async function getUserBySessionToken(token: string) {
  if (!token) return undefined;

  const [user] = await sql<{ id: number; email: string }[]>`
  SELECT
    users.id,
    users.email
  FROM
    users,
    sessions
  WHERE
    sessions.token = ${token} AND
    sessions.user_id = users.id AND
    sessions.expiry_timestamp > now();
  `;

  return user;
}

// Get user by ID
export async function getUser() {
  const user = await sql<User[]>`
    SELECT
      users.id AS id,
      users.email AS email
    FROM
      users
  `;
  return user;
}

// Delete user by ID
export async function deleteUserById(id: number) {
  const [user] = await sql<User[]>`
    DELETE FROM
      users
    WHERE
      id = ${id}
    RETURNING
      *
  `;
  return user;
}
