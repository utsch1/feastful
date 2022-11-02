import { sql } from './connect';
import { User } from './users';

export type Experience = {
  id: number;
  userId: number;
  headline: string;
  description: string;
  cuisineId: number;
  languagesId: number;
  postalCodeId: number;
  price: number;
  // createAt: string;
  // eventDate: string;
};

export type Cuisines = {
  id: number;
  cuisine: string;
};

export type Languages = {
  id: number;
  language: string;
};

export type PostalCodes = {
  id: number;
  postalCode: number;
};

export async function createExperience(
  userId: User['id'],
  headline: string,
  description: string,
  cuisineId: Cuisines['id'],
  languagesId: Languages['id'],
  postalCodeId: PostalCodes['id'],
  price: number,
) {
  const [experience] = await sql<Experience[]>`
  INSERT INTO experiences
    (headline, user_id, description, cuisine_id, languages_id, postal_code_id, price)
  VALUES
    (${headline}, ${userId}, ${description}, ${cuisineId}, ${languagesId}, ${postalCodeId}, ${price})
  RETURNING
    id,
    user_id,
    headline,
    description,
    cuisine_id,
    languages_id,
    postal_code_id,
    price
  `;
  return experience;
}

// export async function getExperienceByUserId(
//   userId: User['id'],
//   id: Experience['id'],
// ) {
//   const [experience] = await sql<Experience[]>`
//     SELECT
//       *
//     FROM
//       experiences, users
//     WHERE
//       users.id = ${userId}
//   `;
//   return experience;
// }

export async function getCuisines() {
  const cuisines = await sql<Cuisines[]>`
  SELECT
   *
  FROM
   cuisines
  `;
  return cuisines;
}

export async function getPostalCodes() {
  const postalCodes = await sql<PostalCodes[]>`
  SELECT
   *
  FROM
   postalCodes
  `;
  return postalCodes;
}

export async function getLanguages() {
  const languages = await sql<Languages[]>`
  SELECT
   *
  FROM
  languages
  `;
  return languages;
}
