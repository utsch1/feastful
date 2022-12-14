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
import { Dayjs } from 'dayjs';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import {
  Cuisines,
  Experience,
  getCuisines,
  getExperienceById,
  getLanguages,
  getPostalCodes,
  Languages,
  PostalCodes,
} from '../../database/experiences';
import { getPhotoByExperienceId, Photo } from '../../database/photos';
import { getUserBySessionToken, User } from '../../database/users';
import { ExperienceResponseBody } from '../api/user/experiences';

type Props = {
  cuisines: Cuisines[];
  postalCodes: PostalCodes[];
  languages: Languages[];
  user: User;
  experience: Experience;
  photo: Photo;
};

export default function EditExperience(props: Props) {
  const characterLimitHeadline = 50;
  const characterLimitDescription = 1000;
  // const [experience, setExperience] = useState<Experience[]>([]);
  const [headline, setHeadline] = useState(props.experience.headline);
  const [description, setDescription] = useState(props.experience.description);
  const [cuisine, setCuisine] = useState(Number(props.experience.cuisineId));
  const [language, setLanguage] = useState(
    Number(props.experience.languagesId),
  );
  const [postalCode, setPostalCode] = useState(
    Number(props.experience.postalCodeId),
  );
  const [price, setPrice] = useState(Number(props.experience.price));
  const [eventDate, setEventDate] = useState<Dayjs | null>(
    props.experience.eventDate,
  );
  const [image, setImage] = useState('');
  const [previewImage, setPreviewImage] = useState(props.photo.photoUrl);
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

    const experienceResponseBody =
      (await response.json()) as ExperienceResponseBody;

    // Handle errors
    if ('errors' in experienceResponseBody) {
      setErrors(experienceResponseBody.errors);
      return console.log(experienceResponseBody.errors);
    }

    await router.push(`/account`);
  }

  const handleChangeEventDate = (newValue: Dayjs | null) => {
    setEventDate(newValue);
  };

  // Image upload function incl. image preview function

  function previewImages(imagePreview: any) {
    const reader = new FileReader();
    reader.readAsDataURL(imagePreview);

    reader.onloadend = () => {
      setPreviewImage(String(reader.result));
    };
  }

  const selectImage = (event: any) => {
    const selectedImage = event.currentTarget.files[0];
    setImage(selectedImage);
    previewImages(selectedImage);
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
      .then((tempData) => {
        setPhotoUrl(tempData.url);
        console.log(tempData);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <Head>
        <title>Edit Experience</title>
        <meta
          name="description"
          content="Fill out the form to offer a cooking class"
        />
      </Head>
      <Typography variant="h1">Update your cooking class</Typography>
      {errors.map((error) => {
        return <p key={error.message}>{error.message}</p>;
      })}
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
              setPrice(Number(event.currentTarget.value));
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
            value={cuisine}
            defaultValue={cuisine}
            onChange={(event) => {
              setCuisine(Number(event.currentTarget.value));
            }}
          >
            {props.cuisines.map((option) => (
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
            value={postalCode}
            defaultValue={postalCode}
            onChange={(event) => {
              setPostalCode(Number(event.currentTarget.value));
            }}
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
          <InputLabel htmlFor="cooking-class-languages" sx={{ color: '#000' }}>
            Languages*
          </InputLabel>
          <TextField
            select
            id="cooking-class-languages"
            required
            size="small"
            color="secondary"
            margin="none"
            value={language}
            defaultValue={language}
            onChange={(event) => {
              setLanguage(Number(event.currentTarget.value));
            }}
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
          components={{ OpenPickerIcon: CalendarMonthIcon }}
          onChange={handleChangeEventDate}
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
      </LocalizationProvider>
      <br />
      <Typography>Photo*</Typography>
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
      <Button
        sx={{
          mt: '1.5rem',
          mb: '2rem',
          float: 'right',
        }}
        variant="contained"
        disableElevation
        onClick={async () => {
          await updateExperienceFromApiById(props.experience.id);
        }}
      >
        Update
      </Button>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const token = context.req.cookies.sessionToken;
  const id = context.query.experienceId;
  const singleExperience = await getExperienceById(Number(id));
  const photos = await getPhotoByExperienceId(Number(id));
  const user = token && (await getUserBySessionToken(token));

  if (!user) {
    return {
      redirect: {
        destination: '/login?returnTo=/login',
        permanent: false,
      },
    };
  }

  // https://flaviocopes.com/nextjs-serialize-date-json/
  // in order to be able to use dates in frontend
  const experience = JSON.parse(JSON.stringify(singleExperience));
  if (experience.description == null) {
    experience.description = ' ';
  }

  if (!experience) {
    return {
      redirect: {
        destination: '/account',
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
      experience: experience,
      photo: photos,
    },
  };
}
