import * as React from "react";
// import { router } from "@inertiajs/react"
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import type {objectType, headerItem} from "@/types/common"
import axios from "axios";
import { router } from "@inertiajs/react";
import { getTokenSourceMapRange } from "typescript";

function HeaderDropdown({menu, role, handleModalOpen}: {menu: objectType, role: string, handleModalOpen}) {

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [token, setToken] = React.useState('');

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleMenu = (page) => {
    console.log("Редирект", page.code)
    handleCloseUserMenu();
  }

  const goToAccount = (e) => {
    e.preventDefault();
    let restId = localStorage.getItem('restId');
    router.visit(`../account/${restId}`, {method: 'get'});
  }

  const logout = (e) => {
    e.preventDefault();
    axios.post('/logout')
    .then((res) => {
      localStorage.removeItem('xsrf');
      localStorage.removeItem('restId');
      getToken();
    })
    .finally(() => {
      router.visit('/', { method: "get" });
    });
  }

  const getToken = async () => {
    let token = localStorage.getItem('xsrf');
    if (token) {
      setToken(token);
    } else {
      setToken('');
    }
  };

  React.useEffect(() => {
    getToken();
  });

  if (menu.length > 0) {
    return (
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Открыть меню">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt="Андрей" />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          {menu[role].map((item: headerItem) => (
            <MenuItem key={item.code} onClick={() => handleMenu(item)}>
              <Typography textAlign="center">{item.label}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
    );
  }
  return (
    <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "flex-end", marginRight: "8px" }}>
      {token 
      ? <Button
          onClick={(e) => goToAccount(e)}
          variant="outlined"
          sx={{ ml: 1, display: "block" }}
        >
          Личный кабинет
        </Button>
      : <Button
          onClick={() => handleModalOpen(true)}
          variant="outlined"
          sx={{ ml: 1, display: "block" }}
        >
          Для ресторанов
        </Button>
      }
      {token
      ? <Button
          onClick={(e) => logout(e)}
          variant="outlined"
          sx={{ ml: 1, display: "block" }}
        >
          Выйти
        </Button>
      : ''
      }
    </Box>
  );
}
export default HeaderDropdown;
