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
import {Inertia} from "@inertiajs/inertia";
// import { router, Link } from "@inertiajs/react";
// import { axios } from "@/app";


function RegisterPage() {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const [drag, setDrag] = React.useState(false);
  const [image, setImage] = React.useState(null);

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

  const register = () => {
    Inertia.visit("/account", { method: "get" });
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
          <TextField id="restaurant-name" label="Наименование ресторана" variant="outlined" sx={{width: "600px"}}/>
        </Box>

        <Box sx={{mt: "20px"}}>
          <TextField id="restaurant-description" label="Краткое описание ресторана: кухня, стилистика, атмосфера и пр." variant="outlined" multiline sx={{width: "600px"}}/>
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
          <TextField id="restaurant-email" label="E-mail" variant="outlined" sx={{width: "600px"}}/>
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
              label="Password"
            />
          </FormControl>
        </Box>

        <Button onClick={() => register()} variant="contained" sx={{mt: "32px", width: "600px"}} size="large">
          Зарегистрироваться
        </Button>
      </Box>
    </Box>
  );
}

export default RegisterPage;
