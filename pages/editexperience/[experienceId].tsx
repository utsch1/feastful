import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  Cuisines,
  Experience,
  getCuisines,
  getExperienceById,
  getExperienceByUserId,
  getLanguages,
  getPostalCodes,
  Languages,
  PostalCodes,
} from '../../database/experiences';
import { getUserBySessionToken, User } from '../../database/users';

type Props = {
  cuisines: Cuisines[];
  postalCodes: PostalCodes[];
  languages: Languages[];
  user: User;
  experience: Experience;
};

export default function EditExperience(props: Props) {
  console.log(props);
  const [experience, setExperience] = useState<Experience[]>([]);
  const [headline, setHeadline] = useState(props.experience.headline);
  const [description, setDescription] = useState(props.experience.description);
  const [cuisine, setCuisine] = useState(props.experience.cuisineId);
  const [language, setLanguage] = useState(
    Number(props.experience.languagesId),
  );
  const [postalCode, setPostalCode] = useState(props.experience.postalCodeId);
  const [price, setPrice] = useState(props.experience.price);
  const [eventDate, setEventDate] = useState(props.experience.eventDate);
  const [image, setImage] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const router = useRouter();

  async function getExperienceFromApiById(id: number) {
    const response = await fetch(`/api/user/experiences/${id}`);
    const experienceFromApi = await response.json();

    setExperience(experienceFromApi);
  }

  async function updateExperienceFromApiById(id: number) {
    const response = await fetch(`/api/user/experience/${id}`, {
      method: 'PUT',
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
        photoUrl: photoUrl,
      }),
    });

    const updatedExperienceFromApi = (await response.json()) as Experience;

    const newState = experience.map((experience) => {
      if (experience.id === updatedExperienceFromApi.id) {
        return updatedExperienceFromApi;
      } else {
        return experience;
      }
    });

    setExperience(newState);

    await router.push(`/account`);
  }

  // useEffect(() => {
  //   getExperienceFromApiById(props.experience.id).catch((err) => {
  //     console.log(err);
  //   });
  // }, []);

  const selectImage = (event: any) => {
    setImage(event.currentTarget.files[0]);
  };

  const uploadImage = async () => {
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'feastful-final-project');
    data.append('cloud_name', 'dccdgltzj');
    await fetch('  https://api.cloudinary.com/v1_1/dccdgltzj/image/upload', {
      method: 'POST',
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        setPhotoUrl(data.url);
        console.log(data);
      })
      .catch((error) => console.log(error));
  };

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
            setPrice(Number(event.currentTarget.value));
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
            setCuisine(Number(event.currentTarget.value));
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
            setPostalCode(Number(event.currentTarget.value));
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
            setLanguage(Number(event.currentTarget.value));
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
          required
        />
      </label>
      <label htmlFor="photos">
        Photos
        <input type="file" onChange={selectImage} />
        <button onClick={uploadImage}>Upload</button>
        <Image src={photoUrl} height="50" width="50" alt="uploaded photo" />
      </label>
      <button
        onClick={async () => {
          await updateExperienceFromApiById(props.experience.id);
        }}
      >
        Save
      </button>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const token = context.req.cookies.sessionToken;
  const id = context.query.experienceId;
  const singleExperience = await getExperienceById(Number(id));
  const experience = JSON.parse(JSON.stringify(singleExperience));

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

  // const foundExperience = JSON.parse(
  //   JSON.stringify(await getExperienceByUserId(user.id)),
  // );

  // if (!experience) {
  //   return {
  //     props: {
  //       user: user,
  //     },
  //   };
  // }

  console.log(experience);

  return {
    props: {
      cuisines: cuisines,
      postalCodes: postalCodes,
      languages: languages,
      user: user,
      experience: experience,
    },
  };
}
