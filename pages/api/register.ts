import { NextApiRequest, NextApiResponse } from 'next';

export type RegisterResponseBody =
  | {
      errors: { message: string }[];
    }
  | { user: { username: string } };

export default function handler(
  request: NextApiRequest,
  response: NextApiResponse<RegisterResponseBody>,
) {
  if (request.method === 'POST') {
    // 1. make sure the data exist

    // 2. we check if the user already exists

    // 3. we hash the password

    // 4. sql query to create the record

    response.status(200).json({ user: { username: 'Ute' } });
  } else {
    response.status(401).json({ errors: [{ message: 'Method not allowed' }] });
  }
}
