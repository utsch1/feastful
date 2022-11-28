import { sql } from './connect';
import { Experience } from './experiences';

export type Photo = {
  id: number;
  photoUrl: string;
  experiencesId: Experience['id'];
};

// Get all photos
export async function getPhotos() {
  const photos = await sql<Photo[]>`
    SELECT * FROM photos
  `;
  return photos;
}

// Create photo URL
export async function createPhotoUrl(
  photoUrl: string,
  experiencesId: Experience['id'],
) {
  const [photo] = await sql<Photo[]>`
  INSERT INTO photos
    (photo_url, experiences_id)
  VALUES
    (${photoUrl}, ${experiencesId})
  RETURNING
    *
  `;
  return photo;
}

// Get photo by experience ID
export async function getPhotoByExperienceId(experiencesId: number) {
  const [photo] = await sql<Photo[]>`
    SELECT
      photos.id AS id,
      photos.photo_url AS photo_url,
      experiences.id AS experiences_id
    FROM
      experiences,
      photos
    WHERE
      experiences.id = ${experiencesId}
    AND
      photos.experiences_id = ${experiencesId}
  `;
  return photo;
}

// Update photo by experience ID
export async function updatePhotoById(photoUrl: string, experiencesId: number) {
  const [photo] = await sql<Photo[]>`
    UPDATE
      photos
    SET
      photo_url = ${photoUrl}
    WHERE
     experiences_id = ${experiencesId}
    RETURNING
      *
  `;
  return photo;
}
