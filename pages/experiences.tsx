import Head from 'next/head';
import { Experience, getExperiences } from '../database/experiences';

type Props = {
  experiences: Experience[];
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
              <h3>{experiences.headline}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const oldExperiences = await getExperiences();

  // https://flaviocopes.com/nextjs-serialize-date-json/
  const experiences = JSON.parse(JSON.stringify(oldExperiences));

  return {
    props: { experiences: experiences },
  };
}
