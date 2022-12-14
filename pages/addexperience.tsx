import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { SxProps } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import defaultDayjs from 'dayjs';
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
  postalCodes: PostalCodes[];
  languages: Languages[];
  user: User;
};
type Dayjs = defaultDayjs.Dayjs;

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
  const [eventDate, setEventDate] = useState<Dayjs | null>();
  const [image, setImage] = useState('');
  const [previewImage, setPreviewImage] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const router = useRouter();

  const popperSx: SxProps = {
    '& .MuiPaper-root': {
      border: '1px solid #A57B78',
      padding: 2,
      marginTop: 1,
      backgroundColor: 'primary.main',
    },
    '& .MuiCalendarPicker-root': {
      backgroundColor: '#FFF',
    },
  };

  async function handleSubmit(
    event:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement>,
  ) {
    event.preventDefault();
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

  // Image upload function incl. image preview function

  function previewImages(imagePreview: any) {
    const reader = new FileReader();
    reader.readAsDataURL(imagePreview);

    reader.onloadend = () => {
      console.log(previewImage);
      setPreviewImage(reader.result as string);
    };
  }

  const selectImage = (event: any) => {
    const imagePreview = event.currentTarget.files[0];
    setImage(imagePreview);
    previewImages(imagePreview);
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
      .then((urlData) => {
        setPhotoUrl(urlData.url);
        console.log(urlData);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <Head>
        <title>Create experience</title>
        <meta
          name="description"
          content="Fill out the form to offer a cooking class"
        />
      </Head>
      <Typography variant="h1">Create your cooking class</Typography>
      {errors.map((error) => {
        return <p key={error.message}>{error.message}</p>;
      })}
      <form onSubmit={handleSubmit}>
        {/* input for headline */}
        <InputLabel htmlFor="cooking-class-headline" sx={{ color: '#000' }}>
          Headline*
        </InputLabel>
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
        <FormHelperText id="maximum-50-characters" sx={{ color: '#000' }}>
          {`${headline.length}/${characterLimitHeadline}`}
        </FormHelperText>
        {/* input for description */}
        <InputLabel htmlFor="cooking-class-description" sx={{ color: '#000' }}>
          Description*
        </InputLabel>
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
        <FormHelperText id="maximum-1000-characters" sx={{ color: '#000' }}>
          {`${description.length}/${characterLimitDescription}`}
        </FormHelperText>
        <Grid container item direction="row" spacing={2} columns={12}>
          <Grid container item direction="column" xs={12} sm={6}>
            {/* input for price */}
            <InputLabel htmlFor="cooking-class-price" sx={{ color: '#000' }}>
              Price per person*
            </InputLabel>
            <TextField
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
          </Grid>

          <Grid container item direction="column" xs={12} sm={6}>
            {/* input for cuisine */}
            <InputLabel htmlFor="cooking-class-cuisine" sx={{ color: '#000' }}>
              Cuisine*
            </InputLabel>
            <TextField
              select
              id="cooking-class-cuisine"
              required
              size="small"
              color="secondary"
              margin="none"
              value={cuisine ? cuisine : ''}
              defaultValue={cuisine}
              onChange={(e) => setCuisine(e.target.value)}
            >
              {props.cuisines?.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.cuisine}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
        <Grid container item direction="row" spacing={2} columns={12}>
          <Grid container item direction="column" xs={12} sm={6}>
            {/* input for postal code */}
            <InputLabel
              htmlFor="cooking-class-postal-code"
              sx={{ color: '#000' }}
            >
              Postal Code*
            </InputLabel>
            <TextField
              select
              id="cooking-class-postal-code"
              required
              size="small"
              color="secondary"
              margin="none"
              value={postalCode ? postalCode : ''}
              defaultValue={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            >
              {props.postalCodes.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.postalCode}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid container item direction="column" xs={12} sm={6}>
            {/* input for languages */}
            <InputLabel
              htmlFor="cooking-class-languages"
              sx={{ color: '#000' }}
            >
              Languages*
            </InputLabel>
            <TextField
              select
              id="cooking-class-languages"
              required
              size="small"
              color="secondary"
              margin="none"
              value={language ? language : ''}
              defaultValue={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              {props.languages.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.language}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
        {/* input for date and time */}
        <InputLabel htmlFor="cooking-class-event-date" sx={{ color: '#000' }}>
          Date*
        </InputLabel>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            value={eventDate}
            required
            components={{ OpenPickerIcon: CalendarMonthIcon }}
            onChange={(newValue) => {
              setEventDate(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                size="small"
                sx={{
                  width: { sm: '49.5%', xs: '100%' },
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: 'secondary.main',
                    },
                  },
                }}
              />
            )}
            InputProps={{
              sx: { '& .MuiSvgIcon-root': { color: 'secondary.main' } },
            }}
            PopperProps={{
              sx: popperSx,
            }}
            showDaysOutsideCurrentMonth
          />
        </LocalizationProvider>{' '}
        <br />
        {/* Photo upload */}
        <Typography variant="body1">Photo*</Typography>
        <Grid container>
          <Grid>
            <Button variant="contained" disableElevation>
              <InputLabel htmlFor="choose-photo" sx={{ color: '#000' }}>
                <AddAPhotoIcon fontSize="small" />
                <input
                  type="file"
                  id="choose-photo"
                  style={{ display: 'none' }}
                  onChange={selectImage}
                  required
                />
              </InputLabel>
            </Button>
            <Button
              sx={{ ml: 1.5 }}
              variant="contained"
              disableElevation
              onClick={uploadImage}
            >
              <FileUploadIcon /> UPLOAD
            </Button>
          </Grid>
        </Grid>
        {/* condition whether there are photo url's available*/}
        {!previewImage ? (
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
            src={previewImage}
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
          type="submit"
          // onClick={async () => {
          //   await createExperienceFromApi();
          // }}
        >
          Save
        </Button>
      </form>
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
