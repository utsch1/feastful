import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import { createSession } from '../../database/sessions';
import { createUser, getUserByEmail } from '../../database/users';
import { createSerializedRegisterSessionTokenCookie } from '../../utils/cookies';

export type RegisterResponseBody =
  | { errors: { message: string }[] }
  | { user: { email: string } };

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse<RegisterResponseBody>,
) {
  if (request.method === 'POST') {
    // 1. make sure the data exist
    if (
      typeof request.body.email !== 'string' ||
      typeof request.body.password !== 'string' ||
      !request.body.email ||
      !request.body.password
    ) {
      return response
        .status(400)
        .json({ errors: [{ message: 'email or password not provided' }] });
    }
    // 2. check if the user already exists
    const user = await getUserByEmail(request.body.email);

    if (user) {
      return response
        .status(401)
        .json({ errors: [{ message: 'email is already taken' }] });
    }

    // 3. hash the password
    const passwordHash = await bcrypt.hash(request.body.password, 12);

    // 4. sql query to create the record
    const userWithoutPassword = await createUser(
      request.body.email,
      passwordHash,
    );

    // 4. create session token & serialize a cookie with the token
    const session = await createSession(
      userWithoutPassword.id,
      crypto.randomBytes(80).toString('base64'),
    );

    const serializedCookie = createSerializedRegisterSessionTokenCookie(
      session.token,
    );

    // response
    response
      .status(200)
      .setHeader('Set-Cookie', serializedCookie)
      .json({ user: { email: userWithoutPassword.email } });
  } else {
    response.status(401).json({ errors: [{ message: 'Method not allowed' }] });
  }
}
