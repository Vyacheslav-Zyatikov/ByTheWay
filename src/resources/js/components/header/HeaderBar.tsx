import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container, { getContainerUtilityClass } from "@mui/material/Container";
import Button from "@mui/material/Button";
import HeaderMenu from "@/components/header/HeaderMenu";
import Logo from "@/components/header/Logo";
import AuthModal from "@/components/modal/AuthModal";
import Typography from "@mui/material/Typography";
import type {objectType, headerItem} from "@/types/common";
import { useAppSelector } from "@/redux/store";
import { router } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia"

const role = "guest";
// const role = "restaurant";

const pages: objectType = {
  guest: [{label: "Корзина", code: "GuestCart", url: "cart"}, {label: "Мои заказы", code: "GuestOrders", url: "order"}],
  restaurant: [{label: "Заказы", code: "CompanyOrders", url: ""}, {label: "Блюда", code: "Menu", url: ""}, {label: "Аналитика", code: "Analytics", url: ""}],
}

const menu: objectType = {
  guest: [],
  restaurant: [{label: "Профиль", code: "Profile", url: ""}, {label: "Выйти", code: "Logout", url: ""}],
}

function HeaderBar() {
  // const user = useAppSelector(state => state.authReducer.user)
  const count = useAppSelector(state => state.cartReducer.count)
  const [token, setToken] = React.useState('');
  const [status, setStatus] = React.useState('');
  const [ordersCount, setOrdersCount] = React.useState('');
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleModalOpen = (value) => setIsModalOpen(value);

  const handleNavMenu = (page) => {
      router.visit(`/${page.url}`, { method: "get" })
  }

  const getStatusAlias = (status) => {
    if (status === 'choice') {
      return 'Выбор блюд';
    } else if (status === 'payment') {
      return 'Оплата';
    } else if (status === 'new') {
      return 'В очереди';
    } else if (status === 'cooking') {
      return 'Уже готовим';
    } else if (status === 'ready') {
      return 'Готов!';
    } else if (status === 'received') {
      return 'Получен';
    } else if (status === 'archive') {
      return 'Архив';
    }
  }

  const goToRestMenu = (e) => {
    e.preventDefault();
    let restId = localStorage.getItem('restId');
    router.visit(`../menu/${restId}`, {method: 'get'});
  }

  const goToRestOrders = (e) => {
    e.preventDefault();
    let restId = localStorage.getItem('restId');
    router.visit(`../orders/${restId}`, {method: 'get'});
  }

  const getToken = async () => {
    let token = localStorage.getItem('xsrf');
    if (token) {
      setToken(token);
    } else {
      setToken('');
    }
  };

  const getStatus = async () => {
    let status = sessionStorage.getItem('status');
    if (status) {
      setStatus(status);
    } else {
      setStatus('');
    }
  };

  const getOrdersCount = async () => {
    let ordersCount = sessionStorage.getItem('ordersCount');
    if (ordersCount) {
      setOrdersCount(ordersCount);
    } else {
      setOrdersCount('');
    }
  };

  React.useEffect(() => {
    getToken();
  });

  React.useEffect(() => {
    getStatus();
    getOrdersCount();
  }, [count, status, ordersCount]);

  return (
    <AppBar position="sticky" color="default">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Logo></Logo>

          {token
          ? <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "flex-end", marginRight: "8px" }}>
            <Box>
              <Button
                onClick={(e) => goToRestOrders(e)}
                sx={{ mx: 1, display: "block" }}
              >
                Заказы
              </Button>
            </Box>
            <Box>
              <Button
                onClick={(e) => goToRestMenu(e)}
                sx={{ mx: 1, display: "block" }}
              >
                Меню
              </Button>
            </Box>
        </Box>
          : <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "flex-end", marginRight: "8px" }}>
              {pages[role].map((page: headerItem) => (
                <Box key={page.code} sx={{position: "relative"}}>
                  <Button
                    onClick={() => handleNavMenu(page)}
                    sx={{ mx: 1, display: "block" }}
                  >
                    {page.label}
                  </Button>
                  {page.code === "GuestCart" && count > 0
                    ? <Box className="count" sx={{position: "absolute", top: "-6px", right: "2px"}}>{count}</Box>
                    : null
                  }
                </Box>
              ))}
              {count > 0 && !(status === 'received' || status === 'archive')
              ? <Typography sx={{ mt: '5.5px', display: "block",  fontWeight: "bold" }}>
                Новый заказ: {getStatusAlias(status)}
                </Typography>
              : ''
              }
            </Box>
          }

          <HeaderMenu menu={menu} role={role} handleModalOpen={handleModalOpen}></HeaderMenu>
        </Toolbar>
      </Container>
      <AuthModal isModalOpen={isModalOpen} handleModalOpen={handleModalOpen}></AuthModal>
    </AppBar>
  );
}
export default HeaderBar;
