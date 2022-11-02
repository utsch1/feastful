import { NextApiRequest, NextApiResponse } from 'next';
import { createExperience } from '../../../../database/experiences';
import { getValidSessionByToken } from '../../../../database/sessions';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const session =
    request.cookies.sessionToken &&
    (await getValidSessionByToken(request.cookies.sessionToken));

  if (!session) {
    response
      .status(400)
      .json({ errors: [{ message: 'No valid session token passed' }] });
    return;
  }

  if (request.method === 'POST') {
    if (!request.cookies.sessionToken) {
      response
        .status(400)
        .json({ errors: [{ message: 'No session token passed' }] });
      return;
    }
    // 1. make sure the data exist
    if (
      !(
        request.body.headline &&
        request.body.description &&
        request.body.cuisineId &&
        request.body?.languagesId &&
        request.body.postalCodeId &&
        request.body.price
      )
    ) {
      return response
        .status(400)
        .json({ message: 'all fields must be filled out' });
    }

    // 2. create new experience
    const newExperience = await createExperience(
      request.body.headline,
      request.body.description,
      request.body.price,
      request.body.cuisineId,
      request.body.languagesId,
      request.body.postalCodeId,
      request.body.headline,
    );

    // 3. response with the created experience
    response.status(200).json({ newExperience });
  }

  response.status(400).json({ message: 'Method not allowed' });
}
