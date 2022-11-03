import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import {
  Cuisines,
  getCuisines,
  getLanguages,
  getPostalCodes,
  Languages,
  PostalCodes,
} from '../database/experiences';
import { getUserBySessionToken, User } from '../database/users';
import { ExperienceResponseBody } from './api/user/experiences';

type Props = {
  cuisines: Cuisines[];
  postalCodes: PostalCodes[];
  languages: Languages[];
  user: User;
};

export default function AddExperience(props: Props) {
  // const [experience, setExperience] = useState<Experience[]>([]);
  const [headline, setHeadline] = useState('');
  const [description, setDescription] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [language, setLanguage] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [price, setPrice] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const router = useRouter();

  async function createExperienceFromApi() {
    const response = await fetch('/api/user/experiences', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        userId: props.user.id,
        headline: headline,
        description: description,
        price: Number(price),
        cuisine: Number(cuisine),
        language: Number(language),
        postalCode: Number(postalCode),
        eventDate: eventDate,
      }),
    });
    const experienceResponseBody =
      (await response.json()) as ExperienceResponseBody;

    // Handle errors
    if ('errors' in experienceResponseBody) {
      setErrors(experienceResponseBody.errors);
      return console.log(experienceResponseBody.errors);
    }

    // const newState = [...experience, experienceFromApi];
    // setExperience(newState);

    await router.push(`/account`);

    console.log(headline);
    console.log(description);
    console.log(typeof cuisine);
    console.log(typeof language);
    console.log(typeof postalCode);
    console.log(typeof price);
    console.log(typeof eventDate);
    console.log(eventDate);
    console.log(new Date(eventDate).getTime());
  }

  return (
    <div>
      <Head>
        <title>Experience</title>
        <meta
          name="description"
          content="Fill out the form to offer a cooking class"
        />
      </Head>

      <h1>Create your cooking class</h1>
      {errors.map((error) => {
        return <p key={error.message}>{error.message}</p>;
      })}
      <label htmlFor="cooking-class-headline">
        Headline*
        <span>Maximum 50 characters</span>
        <br />
        <input
          value={headline}
          maxLength={50}
          onChange={(event) => {
            setHeadline(event.currentTarget.value);
          }}
          required
        />
      </label>
      <br />
      <label htmlFor="cooking-class-description">
        Description*
        <span>Maximum 1000 characters</span>
        <br />
        <textarea
          value={description}
          maxLength={1000}
          rows={6}
          cols={145}
          onChange={(event) => {
            setDescription(event.currentTarget.value);
          }}
          required
        />
      </label>
      <br />
      <label htmlFor="cooking-class-price-per-person">
        Price per person*
        <br />
        <input
          type="number"
          value={price}
          onChange={(event) => {
            setPrice(event.currentTarget.value);
          }}
          required
        />
      </label>
      <br />
      <label htmlFor="cuisine">
        Cuisine*
        <br />
        <select
          value={cuisine}
          onChange={(event) => {
            setCuisine(event.currentTarget.value);
          }}
          required
        >
          <option value="Choose cuisine"> -- Choose cuisine -- </option>
          {props.cuisines.map((option) => {
            return (
              <option key={option.id} value={option.id}>
                {option.cuisine}
              </option>
            );
          })}
        </select>
      </label>
      <br />
      <label htmlFor="postal-code">
        Postal Code*
        <br />
        <select
          value={postalCode}
          onChange={(event) => {
            setPostalCode(event.currentTarget.value);
          }}
          required
        >
          <option value="Choose postal code"> -- Choose postal code -- </option>
          {props.postalCodes.map((option) => {
            return (
              <option key={option.id} value={option.id}>
                {option.postalCode}
              </option>
            );
          })}
        </select>
      </label>
      <br />
      <label htmlFor="postal-code">
        Languages
        <br />
        <select
          value={language}
          onChange={(event) => {
            setLanguage(event.currentTarget.value);
          }}
        >
          <option value="Choose language"> -- Choose language -- </option>
          {props.languages.map((option) => {
            return (
              <option key={option.id} value={option.id}>
                {option.language}
              </option>
            );
          })}
        </select>
      </label>
      <br />
      <label htmlFor="date">
        Date*
        <br />
        <input
          type="datetime-local"
          value={eventDate}
          onChange={(event) => {
            setEventDate(event.currentTarget.value);
          }}
          // required
        />
      </label>
      <button
        onClick={async () => {
          await createExperienceFromApi();
        }}
      >
        Save
      </button>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const token = context.req.cookies.sessionToken;

  const user = token && (await getUserBySessionToken(token));

  if (!user) {
    return {
      redirect: {
        destination: '/login?returnTo=/account',
        permanent: false,
      },
    };
  }

  const cuisines = await getCuisines();
  const postalCodes = await getPostalCodes();
  const languages = await getLanguages();

  return {
    props: {
      cuisines: cuisines,
      postalCodes: postalCodes,
      languages: languages,
      user: user,
    },
  };
}
