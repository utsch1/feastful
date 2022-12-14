import { NextApiRequest, NextApiResponse } from 'next';
import {
  deleteExperienceById,
  getExperienceByIdAndValidSessionToken,
  updateExperienceById,
} from '../../../../database/experiences';
import { updatePhotoById } from '../../../../database/photos';
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

  const experienceId = Number(request.query.experienceId);

  // Check if the ID is a number
  if (!experienceId) {
    return response.status(404).json({ message: 'Not a valid Id' });
  }

  if (request.method === 'GET') {
    // TODO add an example of a query that requires session token validation
    const experience = await getExperienceByIdAndValidSessionToken(
      experienceId,
      request.cookies.sessionToken,
    );

    // check if animal exists on the database
    if (!experience) {
      return response
        .status(404)
        .json({ message: 'Not a valid Id or not a valid session token' });
    }

    return response.status(200).json(experience);
  }

  if (request.method === 'PUT') {
    const headline = request.body?.headline;
    const description = request.body?.description;
    const cuisineId = request.body?.cuisine;
    const languagesId = request.body?.language;
    const postalCodeId = request.body?.postalCode;
    const price = request.body?.price;
    const eventDate = new Date(request.body?.eventDate);
    const photoUrl = request.body?.photoUrl;

    if (
      !(
        headline &&
        description &&
        cuisineId &&
        languagesId &&
        postalCodeId &&
        price &&
        eventDate &&
        photoUrl
      )
    ) {
      return response.status(400).json({
        message:
          'property headline, description, cuisine, languages, postal code, price, event date or photo missing',
      });
    }

    // Create the experience using the database util function
    // To make this function work, the id must be passed
    const updatedExperience = await updateExperienceById(
      experienceId,
      headline,
      description,
      cuisineId,
      languagesId,
      postalCodeId,
      price,
      eventDate,
    );

    // if (!updatedExperience) {
    //   return response.status(404).json({ message: 'Not a valid Id' });
    // }

    if (updatedExperience) {
      const newPhoto = await updatePhotoById(photoUrl, updatedExperience.id);

      // 3. response with the created experience
      return response.status(200).json({ updatedExperience, newPhoto });
    }

    // response with the new created experience
    return response.status(200).json(updatedExperience);
  }

  if (request.method === 'DELETE') {
    const deletedExperience = await deleteExperienceById(experienceId);

    if (!deletedExperience) {
      return response.status(404).json({ message: 'Not a valid Id' });
    }

    return response.status(200).json(deletedExperience);
  }

  return response.status(400).json({ message: 'Method Not Allowed' });
}
