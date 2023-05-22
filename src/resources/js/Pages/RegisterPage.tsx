import "../../css/pages/_homepage.scss";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { router } from "@inertiajs/react";
import { axios } from "@/app";
import {Inertia} from "@inertiajs/inertia";

function RegisterPage() {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const [drag, setDrag] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [image, setImage] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordConfirmation, setPasswordConfirmation] = React.useState('');
  const [confirmationError, setConfirmationError] = React.useState(false);
  const [errMessage, setErrMessage] = React.useState('');

  function dragStartHandler(e) {
    e.preventDefault();
    setDrag(true);
  }

  function dragLeaveHandler(e) {
    e.preventDefault();
    setDrag(false);
  }

  function dropHandler(e) {
    e.preventDefault();
    const images = [...e.dataTransfer.files];
    setImage(images[0]);
    setDrag(false);
  }

  function confirmPassword() {
    if (password === passwordConfirmation) {
      setConfirmationError(false);
    } else {
      setConfirmationError(true);
    }
  };

  const createRestaurant = (e) => {
    e.preventDefault();

    setErrMessage('');
    confirmPassword();

    if (!confirmationError) {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('image', image);
      formData.append('description', description);
      formData.append('email', email);
      formData.append('password', password);
  
      axios.get('/sanctum/csrf-cookie').then(response => {
        axios.post('/register', formData)
        .then((res) => {
          router.visit('account', { method: "get" });
        })
        .catch((err) => {
          if (err.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            // console.log(error.response.data);
            // console.log(error.response.status);
            // console.log(error.response.headers);
            setErrMessage(err.response.data.message);
            console.log(err.response.data.message);
          } else if (err.request) {
            console.log('error.request: ', err.request);
          } else {
            console.log('Error: ', err.message);
          }
        });
      });
    }
  };

  return (
    <Box className="homepage">
      <Box sx={{bgcolor: "background.paper", mt: "48px", mb: "32px"}}>
        <Container maxWidth="md">
          <Typography variant="h5" align="center" color="text.secondary" paragraph>Регистрация</Typography>
        </Container>
      </Box>

      <Box
        component="form"
        noValidate
        autoComplete="off"
        sx={{mt: "20px", display: "flex", flexDirection: "column", alignItems: "center"}}
      >
        <Box>
          <TextField id="restaurant-name" value={title} onChange={(e) => setTitle(e.target.value)} label="Наименование ресторана" variant="outlined" sx={{width: "600px"}}/>
        </Box>

        <Box sx={{mt: "20px"}}>
          <TextField id="restaurant-description" value={description} onChange={(e) => setDescription(e.target.value)} label="Краткое описание ресторана: кухня, стилистика, атмосфера и пр." variant="outlined" multiline sx={{width: "600px"}}/>
        </Box>

        <Box sx={{mt: "20px"}}>
          {drag
            ? <Box
                onDragStart={(e) => dragStartHandler(e)}
                onDragLeave={(e) => dragLeaveHandler(e)}
                onDragOver={(e) => dragStartHandler(e)}
                onDrop={(e)=> dropHandler(e)}
                sx={{ width: 600, height: 200, backgroundColor: "primary.dark", "&:hover": {backgroundColor: "primary.main", opacity: [0.9, 0.8, 0.7]}}}
              >
                <Typography pt={10} variant="h5" align="center" color="text.secondary" paragraph>Отпустите файл, чтобы загрузить его</Typography>
              </Box>
            : <Box
                onDragStart={(e) => dragStartHandler(e)}
                onDragLeave={(e) => dragLeaveHandler(e)}
                onDragOver={(e) => dragStartHandler(e)}
                sx={{ width: 600, height: 200, backgroundColor: "primary.dark", "&:hover": {backgroundColor: "primary.main", opacity: [0.9, 0.8, 0.7]}}}
              >
                <Typography pt={10} variant="h5" align="center" color="text.secondary" paragraph>Перетащите файл с изображением ресторана</Typography>
              </Box>
          }
          {image
            ? <Typography mt={1} variant="h5" align="center" color="green" paragraph>Изображение ресторана загружено</Typography>
            : ""
          }
        </Box>

        <Box sx={{mt: "20px"}}>
          <TextField id="restaurant-email" value={email} onChange={(e) => setEmail(e.target.value)} label="E-mail" variant="outlined" sx={{width: "600px"}}/>
        </Box>

        <Box sx={{mt: "20px"}}>
          <FormControl sx={{width: "600px"}} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Пароль</InputLabel>
            <OutlinedInput
              id="restaurant-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Password"
            />
          </FormControl>
        </Box>

        <Box sx={{mt: "20px"}}>
          <FormControl sx={{width: "600px"}} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Подтверждение пароля</InputLabel>
            <OutlinedInput
              id="restaurant-confirm-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              label="Password"
            />
          </FormControl>
        </Box>

        <Box sx={{mt: "20px", width: "600px"}}>
        {confirmationError 
          ? <Typography mt={1} variant="h5" align="center" color="red" paragraph>Пароль и его подтверждение должны совпадать</Typography>
          : ''
        }
        {errMessage
          ? <Typography mt={1} variant="h5" align="center" color="red" paragraph>{errMessage}</Typography>
          : ''
        }
        </Box>  

        <Button onClick={(e) => createRestaurant(e)} variant="contained" sx={{mt: "32px", width: "600px"}} size="large">
          Зарегистрироваться
        </Button>
      </Box>
    </Box>
  );
}

export default RegisterPage;
