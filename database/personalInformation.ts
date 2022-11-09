import { sql } from './connect';
import { Photo } from './photos';
import { User } from './users';

export type PersonalInformation = {
  id: number;
  userId: number;
  firstName: string;
  personalInformation: string;
  photoId: Photo['id'];
};

// Get personal information
export async function getPersonalInformation() {
  const information = await sql<PersonalInformation[]>`
    SELECT * FROM personalInformation
  `;
  return information;
}

// Create personal information
export async function createPersonalInformation(
  userId: User['id'],
  firstName: string,
  personalInformation: string,
) {
  const [information] = await sql<PersonalInformation[]>`
  INSERT INTO personalInformation
    (user_id, first_name, personal_information)
  VALUES
    (${userId}, ${firstName}, ${personalInformation})
  RETURNING
    *
  `;
  return information;
}

// Get personal information by user ID
export async function getPersonalInformationByUserId(userId: number) {
  const personalInformation = await sql<PersonalInformation[]>`
    SELECT
      personalInformation.id AS id,
      users.id AS user_id,
      personalInformation.first_name AS first_name,
      personalInformation.personal_information AS personal_information,
      photos.id AS photo_id
    FROM
      personalInformation,
      users,
      photos
    WHERE
      users.id = ${userId}
    AND
      personalInformation.user_id = ${userId}
  `;
  return personalInformation;
}
