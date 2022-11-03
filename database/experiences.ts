import { sql } from './connect';
import { User } from './users';

export type Experience = {
  id: number;
  userId: number;
  headline: string;
  description: string;
  cuisineId: number;
  languagesId: number | null;
  postalCodeId: number;
  price: number;
  createdAt: Date;
  eventDate: Date;
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

// Get all experiences
export async function getExperiences() {
  const experiences = await sql<Experience[]>`
    SELECT * FROM experiences
  `;
  return experiences;
}

// Create a single experience
export async function createExperience(
  userId: User['id'],
  headline: string,
  description: string,
  cuisineId: Cuisines['id'],
  languagesId: Languages['id'],
  postalCodeId: PostalCodes['id'],
  price: number,
  eventDate: Date,
) {
  const [experience] = await sql<Experience[]>`
  INSERT INTO experiences
    (user_id, headline, description, cuisine_id, languages_id, postal_code_id, price, event_date)
  VALUES
    (${userId}, ${headline}, ${description}, ${cuisineId}, ${languagesId}, ${postalCodeId}, ${price}, ${eventDate})
  RETURNING
    *
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
