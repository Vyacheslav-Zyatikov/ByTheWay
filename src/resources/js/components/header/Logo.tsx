import { router } from "@inertiajs/react";
import Typography from "@mui/material/Typography";
import IconLogo from "@/components/icons/IconLogo";
// import Button from '@material-ui/core/Button';
import Box from "@mui/material/Box";
import { Inertia } from '@inertiajs/inertia';

const style = {
  display: "flex",
  alignItems: "center",
  cursor: "pointer"
}
export default function Logo() {

  const toMain = () => {
    console.log('toMain');
    Inertia.visit('', { method: "get" });
  }

  return (
    <Box sx={style} onClick={() => toMain()}>
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
    // <Button onClick={() => toMain()} startIcon={}>      </Button>
  );
}