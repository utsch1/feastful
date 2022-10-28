import { NextApiRequest, NextApiResponse } from 'next';
import { getUserByEmail } from '../../database/users';

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
    // 2. we check if the user already exists
    const user = await getUserByEmail(request.body.email);

    if (user) {
      return response
        .status(401)
        .json({ errors: [{ message: 'email is already taken' }] });
    }

    console.log(user);

    response.status(200).json({ user: { email: 'ute' } });
  } else {
    response.status(401).json({ errors: [{ message: 'Method not allowed' }] });
  }
}
