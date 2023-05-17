import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import IconClose from "@/components/icons/IconClose";
import Logo from "@/components/header/Logo";
import TextField from "@mui/material/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
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

  const openRegister = () => {
    handleClose();
    Inertia.visit("/register", { method: "get" });
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
                  <TextField id="outlined-basic" label="E-mail" variant="outlined" sx={{width: "100%"}}/>
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
                      label="Password"
                    />
                  </FormControl>
                </Box>

                <Button variant="contained" sx={{mt: "32px"}} size="large">
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

