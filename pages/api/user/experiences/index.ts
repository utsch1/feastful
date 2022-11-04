import { NextApiRequest, NextApiResponse } from 'next';
import {
  createExperience,
  Experience,
  getExperiences,
} from '../../../../database/experiences';
import { createPhotoUrl } from '../../../../database/photos';
import { getValidSessionByToken } from '../../../../database/sessions';

export type ExperienceResponseBody =
  | { experience: Experience }
  | { errors: { message: string }[] };

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  console.log('session is passed', request.cookies.sessionToken);

  const session =
    request.cookies.sessionToken &&
    (await getValidSessionByToken(request.cookies.sessionToken));

  if (!session) {
    response
      .status(400)
      .json({ errors: [{ message: 'No valid session token passed' }] });
    return;
  }

  if (request.method === 'GET') {
    const experiences = await getExperiences();

    return response.status(200).json(experiences);
  }

  if (request.method === 'POST') {
    if (!request.cookies.sessionToken) {
      response
        .status(400)
        .json({ errors: [{ message: 'No session token passed' }] });
      return;
    }
    // 1. make sure the data exist

    console.log(request.body);

    const userId = request.body?.userId;
    const headline = request.body?.headline;
    const description = request.body?.description;
    const cuisineId = request.body?.cuisine;
    const languagesId = request.body?.language;
    const postalCodeId = request.body?.postalCode;
    const price = request.body?.price;
    const eventDate = new Date(request.body?.eventDate);
    const photoUrl = request.body?.photoUrl;

    console.log(headline);
    console.log(description);
    console.log(cuisineId);
    console.log(languagesId);
    console.log(postalCodeId);
    console.log(price);
    console.log(eventDate);
    console.log(photoUrl);

    if (
      !(
        headline &&
        description &&
        cuisineId &&
        languagesId &&
        postalCodeId &&
        price
      )
    ) {
      return response
        .status(400)
        .json({ message: 'all fields must be filled out' });
    }

    // 2. create new experience
    const newExperience = await createExperience(
      userId,
      headline,
      description,
      cuisineId,
      languagesId,
      postalCodeId,
      price,
      eventDate,
    );

    const newPhoto = await createPhotoUrl(photoUrl, newExperience.id);

    // 3. response with the created experience
    return response.status(200).json({ newExperience, newPhoto });
  }

  return response.status(400).json({ message: 'Method not allowed' });
}
