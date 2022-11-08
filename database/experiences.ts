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

// Get all experiences by user ID
export async function getExperiencesByUserId(userId: number) {
  const experiences = await sql<Experience[]>`
    SELECT
      experiences.id AS id,
      users.id AS user_id,
      experiences.headline AS headline
    FROM
      experiences,
      users
    WHERE
      users.id = ${userId}
    AND
      experiences.user_id = ${userId}
  `;
  return experiences;
}

// Get single experience by user ID
export async function getExperienceByUserId(userId: number) {
  const experience = await sql<Experience[]>`
    SELECT
      experiences.id AS id,
      users.id AS user_id,
      experiences.headline AS headline,
      experiences.description AS description,
      cuisines.id AS cuisine_id,
      languages.id AS language_id,
      postalCodes.id AS postal_code_id,
      experiences.price AS price,
      experiences.event_date AS event_date
    FROM
      experiences,
      users,
      cuisines,
      languages,
      postalCodes
    WHERE
      users.id = ${userId}
    AND
      experiences.user_id = ${userId}
  `;
  return experience;
}

// Get single experience by ID
export async function getExperienceById(id: number) {
  const [experience] = await sql<Experience[]>`
    SELECT
      *
    FROM
      experiences
    WHERE
      experiences.id = ${id}
  `;
  return experience;
}

// Get a single experience by id and valid session token
export async function getExperienceByIdAndValidSessionToken(
  id: number,
  token: string | undefined,
) {
  if (!token) return undefined;
  // STRETCH: Update this adding a role to the users and matching it with the session token
  const [experience] = await sql<Experience[]>`
    SELECT
      experiences.*
    FROM
      experiences,
      sessions
    WHERE
      sessions.token = ${token}
    AND
      sessions.expiry_timestamp > now()
    AND
      experiences.id = ${id}
  `;
  return experience;
}

// Update experience by ID
export async function updateExperienceById(
  id: number,
  headline: string,
  description: string,
  cuisineId: Cuisines['id'],
  languagesId: Languages['id'],
  postalCodeId: PostalCodes['id'],
  price: number,
  eventDate: Date,
) {
  const [experience] = await sql<Experience[]>`
    UPDATE
      experiences
    SET
      headline = ${headline},
      description = ${description},
      cuisine_id = ${cuisineId},
      languages_id = ${languagesId},
      postal_code_id = ${postalCodeId},
      price = ${price},
      event_date = ${eventDate}
    WHERE
      id = ${id}
    RETURNING
      *
  `;
  return experience;
}

// Delete experience by ID
export async function deleteExperienceById(id: number) {
  const [experience] = await sql<Experience[]>`
    DELETE FROM
      experiences
    WHERE
      id = ${id}
    RETURNING
      *
  `;
  return experience;
}

// Get all cuisines
export async function getCuisines() {
  const cuisines = await sql<Cuisines[]>`
  SELECT
   *
  FROM
   cuisines
  `;
  return cuisines;
}

// Get all postal codes
export async function getPostalCodes() {
  const postalCodes = await sql<PostalCodes[]>`
  SELECT
   *
  FROM
   postalCodes
  `;
  return postalCodes;
}

// Get all languages
export async function getLanguages() {
  const languages = await sql<Languages[]>`
  SELECT
   *
  FROM
  languages
  `;
  return languages;
}
