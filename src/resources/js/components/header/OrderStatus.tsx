import { router } from "@inertiajs/react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const style = {
  display: "flex",
  alignItems: "center",
  cursor: "pointer"
}
export default function OrderStatus() {

  const toMain = () => {

    router.visit("/", { method: "get" });

  }

  return (
    <Box sx={style} onClick={() => toMain()}>
      <Typography
        variant="h6"
        noWrap
        component="span"
        sx={{
          display: "flex",
          fontWeight: 400,
          color: "inherit",
          textDecoration: "none"
        }}
      >
        Ваш заказ
      </Typography>
        <Typography
            variant="h6"
            noWrap
            component="span"
            sx={{
                display: "flex",
                fontWeight: 400,
                color: "inherit",
                textDecoration: "none",
                marginLeft: "12px"
            }}
        >
            УЖЕ ГОТОВИМ
        </Typography>
    </Box>
  );
}
