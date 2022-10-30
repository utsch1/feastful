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

export async function getUserById(id: number) {
  const [user] = await sql<User[]>`
    SELECT
      *
    FROM
      users
    WHERE
      id = ${id}
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
