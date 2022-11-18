import { sql } from './connect';
import { User } from './users';

export type PersonalInformation = {
  id: number;
  userId: number;
  firstName: string;
  personalInformation: string;
  photoUrl: string;
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
  photoUrl: string,
) {
  const [information] = await sql<PersonalInformation[]>`
  INSERT INTO personalInformation
    (user_id, first_name, personal_information, photo_url)
  VALUES
    (${userId}, ${firstName}, ${personalInformation}, ${photoUrl})
  RETURNING
    *
  `;
  return information;
}

// Get personal information by user ID
export async function getPersonalInformationByUserId(
  userId: number,
  token: string,
) {
  if (!token) return undefined;
  const personalInformation = await sql<PersonalInformation[]>`
    SELECT
      personalInformation.id AS id,
      users.id AS user_id,
      personalInformation.first_name AS first_name,
      personalInformation.personal_information AS personal_information,
      personalInformation.photo_url AS photo_url
    FROM
      personalInformation,
      users
    WHERE
      users.id = ${userId}
    AND
      personalInformation.user_id = ${userId}
  `;
  return personalInformation;
}

// Update experience by ID
export async function updatePersonalInformation(
  userId: number,
  firstName: string,
  personalInformation: string,
  photoUrl: string,
) {
  const [information] = await sql<PersonalInformation[]>`
    UPDATE
      personalInformation
    SET
      user_id = ${userId},
      first_name = ${firstName},
      personal_information = ${personalInformation},
      photo_url = ${photoUrl}
    WHERE
      personalInformation.user_id = ${userId}
    RETURNING
      *
  `;
  return information;
}
