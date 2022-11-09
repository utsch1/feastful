import { sql } from './connect';
import { Experience } from './experiences';

export type Photo = {
  id: number;
  photoUrl: string;
  experiencesId: Experience['id'];
};

export async function getPhotos() {
  const photos = await sql<Photo[]>`
    SELECT * FROM photos
  `;
  return photos;
}

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
