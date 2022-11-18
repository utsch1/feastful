import { NextApiRequest, NextApiResponse } from 'next';
import {
  createPersonalInformation,
  getPersonalInformation,
  PersonalInformation,
  updatePersonalInformation,
} from '../../../database/personalInformation';
import { getValidSessionByToken } from '../../../database/sessions';

export type PersonalInformationResponseBody =
  | { personalInformation: PersonalInformation }
  | { errors: { message: string }[] };

export default async function personalInformationHandler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  console.log('session is passed', request.cookies.sessionToken);

  console.log(request.body);

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
    const personalInformation = await getPersonalInformation();

    return response.status(200).json(personalInformation);
  }

  if (request.method === 'POST') {
    if (!request.cookies.sessionToken) {
      response
        .status(400)
        .json({ errors: [{ message: 'No session token passed' }] });
      return;
    }

    // 1. make sure the data exist

    const userId = request.body?.userId;
    const firstName = request.body?.firstName;
    const personalInformation = request.body?.personalInformation;
    const photoUrl = request.body?.photoUrl;

    if (!(firstName && personalInformation && photoUrl)) {
      return response.status(400).json({
        message: 'first name and personal information must be filled out',
      });
    }

    // 2. create new personal information
    const newPersonalInformation = await createPersonalInformation(
      userId,
      firstName,
      personalInformation,
      photoUrl,
    );

    // 3. response with the created experience
    return response.status(200).json({ newPersonalInformation });
  }

  if (request.method === 'PUT') {
    if (!request.cookies.sessionToken) {
      response
        .status(400)
        .json({ errors: [{ message: 'No session token passed' }] });
      return;
    }
    const userId = request.body?.userId;
    const firstName = request.body?.firstName;
    const personalInformation = request.body?.personalInformation;
    const photoUrl = request.body?.photoUrl;

    if (!(firstName && personalInformation && photoUrl)) {
      return response.status(400).json({
        message: 'first name and personal information must be filled out',
      });
    }

    // Create new personal information
    const updatedPersonalInformation = await updatePersonalInformation(
      userId,
      firstName,
      personalInformation,
      photoUrl,
    );

    // response with updated school
    return response
      .status(200)
      .json({ personalInformation: updatedPersonalInformation });
  }

  return response.status(400).json({ message: 'Method not allowed' });
}
