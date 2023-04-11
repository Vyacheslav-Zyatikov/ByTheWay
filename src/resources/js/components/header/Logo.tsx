import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import IconLogo from "@/components/icons/IconLogo";
import Box from "@mui/material/Box";

const style = {
  display: "flex",
  alignItems: "center",
  cursor: "pointer"
}
export default function Logo() {
  const navigate = useNavigate();

  const toMain = () => {
    navigate("/");
  }

  return (
    <Box sx={style} onClick={toMain}>
      <IconLogo width={76} height={47}></IconLogo>
      <Typography
        variant="h6"
        noWrap
        component="span"
        sx={{
          display: "flex",
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".3rem",
          color: "inherit",
          textDecoration: "none",
          marginLeft: "12px"
        }}
      >
        ByTheWay
      </Typography>
    </Box>
  );
}