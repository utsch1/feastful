import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { Experience, getExperiences } from '../../database/experiences';
import {
  getPhotos,
  getPhotoUrlByExperienceId,
  Photo,
} from '../../database/photos';

type Props = {
  experiences: Experience[];
  photos: Photo[];
};

export default function Experiences(props: Props) {
  return (
    <div>
      <Head>
        <title>Experiences</title>
        <meta name="description" content="Find your cooking experiences" />
      </Head>

      <div>
        <h1>Explore cooking lessons</h1>
      </div>

      <div>
        {props.experiences.map((experiences) => {
          return (
            <div key={`experience-${experiences.id}`}>
              <Image
                src={experiences.photo}
                alt="impressions of the cooking lesson"
                width="50"
                height="50"
              />
              <Link href={`/experiences/${experiences.id}`}>
                <h3>{experiences.headline}</h3>
              </Link>
              <p>{experiences.price}€/person</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const oldExperiences = await getExperiences();
  const photos = await getPhotos();

  // const photos = await getPhotoUrlByExperienceId(experiences.id);

  // https://flaviocopes.com/nextjs-serialize-date-json/
  // in order to be able to use dates in frontend
  const experiences = JSON.parse(JSON.stringify(oldExperiences));

  console.log(photos);
  console.log(experiences);

  const allExperiences = experiences.map((experience) => {
    const photoUrl = photos.find(
      (photo) => experience.id === photo.experiencesId,
    );
    return {
      id: experience.id,
      headline: experience.headline,
      price: experience.price,
      photo: photoUrl.photoUrl,
    };
  });

  console.log(allExperiences);

  return {
    props: { experiences: allExperiences },
  };
}
