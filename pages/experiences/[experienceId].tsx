import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { Experience, getExperienceById } from '../../database/experiences';
import { getPhotos, Photo } from '../../database/photos';
import { parseIntFromContextQuery } from '../../utils/contextQuery';

type Props = { experience: Experience } | { error: string };
type PropsPhoto = { photo: Photo };

export default function SingleExperience(props: Props & PropsPhoto) {
  if ('error' in props) {
    return (
      <div>
        <Head>
          <title>Cooking lesson not found</title>
          <meta name="description" content="Cooking lesson not found" />
        </Head>
        <h1>{props.error}</h1>
        Sorry, this cooking lesson is already in the past. Please explore other
        cooking lessons <Link href="/experiences">here</Link>.
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>{props.experience.headline}</title>
        <meta
          name="description"
          content={`This is the ${props.experience.headline}'s form`}
        />
      </Head>

      <div>
        <div key={`experience-${props.experience.id}`}>
          {/* <Image
                href={props.photos.url}
                alt="impressions of the cooking lesson"
              /> */}

          <h1>{props.experience.headline}</h1>
          <Image
            src={props.photo.photoUrl}
            alt="Impressions of cooking lesson"
            height="200"
            width="200"
          />
          <p>{props.experience.description}</p>
          <p>{props.experience.price}€/person</p>
          {/* <p>{props.experience.cuisineId}</p> */}
          {/* <p>{props.experience.eventDate}</p> */}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(
  context: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<Props>> {
  const experienceId = parseIntFromContextQuery(context.query.experienceId);

  if (typeof experienceId === 'undefined') {
    context.res.statusCode = 404;
    return {
      props: {
        error: 'Cooking lesson not found',
      },
    };
  }

  const oldExperience = await getExperienceById(experienceId);
  const photos = await getPhotos();

  const experience = JSON.parse(JSON.stringify(oldExperience));

  if (typeof experience === 'undefined') {
    context.res.statusCode = 404;
    return {
      props: {
        error: 'Cooking lesson not found',
      },
    };
  }

  const photoUrl = photos.find(
    (photo) => experience.id === photo.experiencesId,
  );

  return {
    props: { experience: experience, photo: photoUrl },
  };
}
