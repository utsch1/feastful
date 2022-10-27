import { sql } from './connect';

export type User = {
  id: number;
  email: string;
  passwordHash: string;
};

async function getUserByEmail(email: string) {
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
