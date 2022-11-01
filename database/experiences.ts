import { sql } from './connect';

export type Experience = {
  id: number;
  userId: number;
  headline: string;
  description: string;
  cuisineId: number;
  languagesId?: number;
  postalCodeId: number;
  price: number;
  createAt: Date;
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

export async function getExperiencesByUserId(userId: number) {
  const [user] = await sql<Experience[]>`
    SELECT
      *
    FROM
      experiences
    WHERE
      userId = ${userId}
  `;
  return user;
}

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
