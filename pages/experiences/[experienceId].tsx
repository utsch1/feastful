import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Experience, getExperienceById } from '../../database/experiences';
import { parseIntFromContextQuery } from '../../utils/contextQuery';

type Props = { experience: Experience } | { error: string };

export default function SinglePlant(props: Props) {
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

  // const singleExperience = await getExperienceById(experienceId);

  const experience = JSON.parse(
    JSON.stringify(await getExperienceById(experienceId)),
  );

  if (typeof experience === 'undefined') {
    context.res.statusCode = 404;
    return {
      props: {
        error: 'Cooking lesson not found',
      },
    };
  }

  return {
    props: {
      experience: experience,
    },
  };
}
