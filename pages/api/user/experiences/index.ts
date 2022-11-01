import { NextApiRequest, NextApiResponse } from 'next';
import { getExperiencesByUserId } from '../../../../database/experiences';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  if (request.method === 'GET') {
    const experiences = await getExperiencesByUserId();
    return response.status(200).json(experiences);
  }
}
