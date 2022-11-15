import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import {
  Box,
  FormHelperText,
  Grid,
  InputLabel,
  TextField,
  Typography,
} from '@mui/material';
import Button from '@mui/material/Button';
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
  const characterLimitPersonalInformation = 500;
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

      <Typography variant="h1">Enter your personal information</Typography>
      {errors.map((error) => {
        return <p key={error.message}>{error.message}</p>;
      })}

      {/* input for first name */}
      <InputLabel htmlFor="first-name" sx={{ color: '#000' }}>
        First Name*
      </InputLabel>
      <TextField
        fullWidth
        id="first-name"
        variant="outlined"
        required
        type="text"
        size="small"
        color="secondary"
        margin="none"
        value={firstName}
        onChange={(event) => {
          setFirstName(event.currentTarget.value);
        }}
      />

      {/* input for personal information */}
      <InputLabel htmlFor="personal-information" sx={{ color: '#000' }}>
        Personal Information*
      </InputLabel>
      <TextField
        fullWidth
        multiline
        id="personal-information"
        variant="outlined"
        inputProps={{
          maxLength: characterLimitPersonalInformation,
        }}
        required
        type="text"
        size="small"
        color="secondary"
        margin="none"
        value={personalInformation}
        onChange={(event) => {
          setPersonalInformation(event.currentTarget.value);
        }}
      />
      <FormHelperText id="maximum-500-characters" sx={{ color: '#000' }}>
        {`${personalInformation.length}/${characterLimitPersonalInformation}`}
      </FormHelperText>

      {/* Photo upload */}
      <Typography>Photo*</Typography>
      <Grid container xs={12}>
        <Grid>
          <Button variant="contained" disableElevation>
            <InputLabel htmlFor="choose-photo" sx={{ color: '#000' }}>
              <AddAPhotoIcon fontSize="small" />
              <input
                type="file"
                id="choose-photo"
                style={{ display: 'none' }}
                onChange={selectImage}
              />
            </InputLabel>
          </Button>
          <Button
            sx={{ ml: 1.5 }}
            variant="contained"
            disableElevation
            onClick={uploadImage}
          >
            <FileUploadIcon />
          </Button>
        </Grid>
      </Grid>

      {/* condition whether there are photo url's available*/}
      {!photoUrl ? (
        <div>{''}</div>
      ) : (
        <Box
          component="img"
          sx={{
            height: 60,
            borderRadius: '5px',
          }}
          mt={1}
          mr="2rem"
          src={photoUrl}
          alt="uploaded photo"
        />
      )}

      {/* save functionality */}
      <Button
        sx={{
          mt: '1.5rem',
          mb: '2rem',
          float: 'right',
        }}
        variant="contained"
        disableElevation
        onClick={async () => {
          await createPersonalInformationFromApi();
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

  return {
    props: {
      user: user,
    },
  };
}
