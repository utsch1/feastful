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
