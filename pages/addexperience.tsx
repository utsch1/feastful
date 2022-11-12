import {
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import Button from '@mui/material/Button';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
// import * as React from 'react';
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
  postalCodes: PostalCodes[];
  languages: Languages[];
  user: User;
};

type PropsCuisine = {
  cuisines: Cuisines[] | null;
};

export default function AddExperience(props: Props & PropsCuisine) {
  const characterLimitHeadline = 50;
  const characterLimitDescription = 1000;
  const [headline, setHeadline] = useState('');
  const [description, setDescription] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [language, setLanguage] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [price, setPrice] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [image, setImage] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
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
        photoUrl: photoUrl,
      }),
    });
    const experienceResponseBody =
      (await response.json()) as ExperienceResponseBody;

    // Handle errors
    if ('errors' in experienceResponseBody) {
      setErrors(experienceResponseBody.errors);
      return console.log(experienceResponseBody.errors);
    }

    await router.push(`/account`);
  }

  const handleChangeCuisine = (event: SelectChangeEvent) => {
    setCuisine(event.target.value as string);
  };

  const handleChangePostalCode = (event: SelectChangeEvent) => {
    setPostalCode(event.target.value as string);
  };

  const handleChangeLanguages = (event: SelectChangeEvent) => {
    setLanguage(event.target.value as string);
  };

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

      {/* input for headline */}
      <InputLabel htmlFor="cooking-class-headline">Headline*</InputLabel>
      <TextField
        fullWidth
        id="cooking-class-headline"
        variant="outlined"
        inputProps={{
          maxLength: characterLimitHeadline,
        }}
        required
        type="text"
        size="small"
        color="secondary"
        margin="none"
        value={headline}
        onChange={(event) => {
          setHeadline(event.currentTarget.value);
        }}
      />
      <FormHelperText id="maximum-50-characters">
        {`${headline.length}/${characterLimitHeadline}`}
      </FormHelperText>

      {/* input for description */}
      <InputLabel htmlFor="cooking-class-description">Description*</InputLabel>
      <TextField
        fullWidth
        multiline
        id="cooking-class-description"
        variant="outlined"
        inputProps={{
          maxLength: characterLimitDescription,
        }}
        required
        type="text"
        size="small"
        color="secondary"
        margin="none"
        value={description}
        onChange={(event) => {
          setDescription(event.currentTarget.value);
        }}
      />
      <FormHelperText id="maximum-50-characters">
        {`${description.length}/${characterLimitDescription}`}
      </FormHelperText>

      {/* input for price */}
      <InputLabel htmlFor="cooking-class-price">Price per person*</InputLabel>
      <TextField
        sx={{ width: '45%' }}
        id="cooking-class-price"
        variant="outlined"
        required
        size="small"
        color="secondary"
        margin="none"
        type="number"
        value={price}
        onChange={(event) => {
          setPrice(event.currentTarget.value);
        }}
      />

      {/* input for cuisine */}
      <InputLabel htmlFor="cooking-class-cuisine">Cuisine*</InputLabel>
      <TextField
        select
        sx={{ width: '45%' }}
        id="cooking-class-cuisine"
        required
        size="small"
        color="secondary"
        margin="none"
        value={cuisine ? cuisine : ''}
        defaultValue={cuisine}
        onChange={handleChangeCuisine}
      >
        {props.cuisines?.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.cuisine}
          </MenuItem>
        ))}
      </TextField>

      {/* input for postal code */}
      <InputLabel htmlFor="cooking-class-postal-code">Postal Code*</InputLabel>
      <TextField
        select
        sx={{ width: '45%' }}
        id="cooking-class-postal-code"
        required
        size="small"
        color="secondary"
        margin="none"
        value={postalCode ? postalCode : ''}
        defaultValue={postalCode}
        onChange={handleChangePostalCode}
      >
        {props.postalCodes.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.postalCode}
          </MenuItem>
        ))}
      </TextField>

      {/* input for languages */}
      <InputLabel htmlFor="cooking-class-languages">Languages*</InputLabel>
      <TextField
        select
        sx={{ width: '45%' }}
        id="cooking-class-languages"
        required
        size="small"
        color="secondary"
        margin="none"
        value={language ? language : ''}
        defaultValue={language}
        onChange={handleChangeLanguages}
      >
        {props.languages.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.language}
          </MenuItem>
        ))}
      </TextField>

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
        <input type="file" style={{ display: 'none' }} onChange={selectImage} />
        <Button
          sx={{ ml: 1.5 }}
          variant="contained"
          disableElevation
          onClick={uploadImage}
        >
          Upload
        </Button>
        {/* condition whether there are photo url's available*/}
        {!photoUrl ? (
          <div>{''}</div>
        ) : (
          <Image src={photoUrl} height="50" width="50" alt="uploaded photo" />
        )}
      </label>
      <Button
        sx={{ ml: 1.5 }}
        variant="contained"
        disableElevation
        onClick={async () => {
          await createExperienceFromApi();
        }}
      >
        Save
      </Button>
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
