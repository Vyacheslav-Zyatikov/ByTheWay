import * as React from "react";
import { router } from "@inertiajs/react"
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import HeaderMenu from "@/components/header/HeaderMenu";
import Logo from "@/components/header/Logo";
import AuthModal from "@/components/modal/AuthModal";
import type {objectType, headerItem} from "@/types/common"
import { useAppSelector } from "@/redux/store"


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
  
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleModalOpen = (value) => setIsModalOpen(value);

  const handleNavMenu = (page) => {
    router.visit(`/${page.url}`, { method: "post" })
  }

  return (
    <AppBar position="sticky" color="default">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Logo></Logo>
          
          <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "flex-end", marginRight: "8px" }}>
            {pages[role].map((page: headerItem) => (
              <Box key={page.code} sx={{position: "relative"}}>
                <Button
                  onClick={() => handleNavMenu(page)}
                  sx={{ mx: 1, display: "block" }}
                >
                  {page.label}
                </Button>
                {page.code === "GuestCart" && count !== 0
                  ? <Box className="count" sx={{position: "absolute", top: "-6px", right: "2px"}}>{count}</Box>
                  : null
                }
              </Box>
            ))}
          </Box>

          <HeaderMenu menu={menu} role={role} handleModalOpen={handleModalOpen}></HeaderMenu>
        </Toolbar>
      </Container>
      <AuthModal isModalOpen={isModalOpen} handleModalOpen={handleModalOpen}></AuthModal>
    </AppBar>
  );
}
export default HeaderBar;