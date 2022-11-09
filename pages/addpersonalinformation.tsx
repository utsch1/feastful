import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { getUserBySessionToken, User } from '../database/users';
import { PersonalInformationResponseBody } from './api/user/personalinformation';

type Props = {
  user: User;
};

export default function AddPersonalInformation(props: Props) {
  const [firstName, setFirstName] = useState('');
  const [personalInformation, setPersonalInformation] = useState('');
  const [image, setImage] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const router = useRouter();

  async function createPersonalInformationFromApi() {
    const response = await fetch('/api/user/personalinformation', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        userId: props.user.id,
        firstName: firstName,
        personalInformation: personalInformation,
        // photoUrl: photoUrl,
      }),
    });
    const personalInformationResponseBody =
      (await response.json()) as PersonalInformationResponseBody;

    // Handle errors
    if ('errors' in personalInformationResponseBody) {
      setErrors(personalInformationResponseBody.errors);
      return console.log(personalInformationResponseBody.errors);
    }

    await router.push(`/account`);
  }

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
        <title>Personal Information</title>
        <meta
          name="description"
          content="Fill out the form to give more information about you"
        />
      </Head>

      <h1>Enter your personal information</h1>
      {errors.map((error) => {
        return <p key={error.message}>{error.message}</p>;
      })}
      <label htmlFor="first-name">
        First Name*
        <br />
        <input
          value={firstName}
          onChange={(event) => {
            setFirstName(event.currentTarget.value);
          }}
          required
        />
      </label>
      <br />
      <label htmlFor="personal-information">
        Personal Information*
        <span>Maximum 500 characters</span>
        <br />
        <textarea
          value={personalInformation}
          maxLength={500}
          rows={6}
          cols={145}
          onChange={(event) => {
            setPersonalInformation(event.currentTarget.value);
          }}
          required
        />
      </label>
      <br />
      <label htmlFor="personal-photo">
        Photos
        <input type="file" onChange={selectImage} />
        <button onClick={uploadImage}>Upload</button>
        <Image src={photoUrl} height="50" width="50" alt="uploaded photo" />
      </label>
      <button
        onClick={async () => {
          await createPersonalInformationFromApi();
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

  return {
    props: {
      user: user,
    },
  };
}
