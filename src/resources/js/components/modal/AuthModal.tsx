import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import IconClose from "@/components/icons/IconClose";
import Logo from "@/components/header/Logo";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
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

const wrapper = {
  minWidth: 296,
  minHeight: 450,
  bgcolor: "background.paper",
  boxShadow: 24,
};
const header = {
  flexDirection: "column",
  alignItems: "center",
};
const headerTitle = {
  marginTop: "20px",
}

export default function AuthModal({isModalOpen, handleModalOpen}: {isModalOpen: boolean, handleModalOpen}) {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
    handleModalOpen(false);
  };

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errMessage, setErrMessage] = React.useState('');

  const login = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    axios.get('/sanctum/csrf-cookie').then(response => {
      axios.post('login', formData)
      .then((res) => {
        console.log(res);
        if (res.data.errors) {
          setErrMessage(res.data.errors.message);
        } else {
          handleClose();
          localStorage.setItem('xsrf', res.config.headers['X-XSRF-TOKEN']);
          localStorage.setItem('restId', res.data.restaurant.id);
          router.visit(`account/${res.data.restaurant.id}`, {method: 'get'});
        }
      })
      .catch((err) => {
        if (err.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          // console.log(error.response.data);
          // console.log(error.response.status);
          // console.log(error.response.headers);
          setErrMessage(err.response.data.message);
          console.log('error.response: ', err.response.data.message);
        } else if (err.request) {
          console.log('error.request: ', err.request);
        } else {
          console.log('Error: ', err.message);
        }
      });
    });
  }

  const openRegister = () => {
    handleClose();
    router.visit('/register', { method: "get" });
  }

  useEffect(() => {
    setOpen(isModalOpen);
  }, [isModalOpen]);

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="modal"
      >
        <Box className="modal__wrapper" sx={wrapper}>
          <Box>
            <Box className="modal__header" sx={header}>
              <Logo></Logo>
              <h2 className="modal__header-title" style={headerTitle}>Авторизация</h2>
              <div className="link modal__icon-close" onClick={() => handleClose()}>
                <IconClose></IconClose>
              </div>
            </Box>

            <Box className="modal__body">
              <Box
                component="form"
                noValidate
                autoComplete="off"
                sx={{marginTop: "20px", display: "flex", flexDirection: "column"}}
              >
                <Box>
                  <TextField id="outlined-basic" value={email} onChange={(e) => setEmail(e.target.value)} label="E-mail" variant="outlined" sx={{width: "100%"}}/>
                </Box>

                <Box sx={{marginTop: "20px"}}>
                  <FormControl sx={{width: "100%"}} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Пароль</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
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
                  {errMessage
                    ? <Typography mt={1} variant="h6" align="center" color="red" paragraph>Неверный логин или пароль</Typography>
                    : ''
                  }
                </Box> 

                <Button onClick={(e) => login(e)} variant="contained" sx={{mt: "32px"}} size="large">
                  Войти
                </Button>
              </Box>
            </Box>
          </Box>

          <Box className="modal__footer">
            <Button onClick={() => openRegister()} size="large" sx={{width: "100%"}}>
              Регистрация
            </Button>
          </Box>

        </Box>
      </Modal>
    </div>
  );
}

