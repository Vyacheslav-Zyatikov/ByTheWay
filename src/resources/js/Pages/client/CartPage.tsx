import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import type {cartItemType} from "@/types/common"
import { useAppSelector } from "@/redux/store";
import IconPlus from "@/components/icons/IconPlus";
import IconMinus from "@/components/icons/IconMinus";

function CardComponent ({card}: {card: cartItemType}) {
  return (
    <Card
      sx={{ height: "100%", display: "flex", flexDirection: "column" }}
    >
      <div className="restaurant__card-image-wrapper">
        <img className="restaurant__card-image" src={card.image} alt={card.title}/>
      </div>
      <CardContent sx={{ flexGrow: 1 }}>
        <h2>
          {card.title}
        </h2>
        <Typography>
          {card.description}
        </Typography>
      </CardContent>
      <CardActions>
        <div className="restaurant__card-add">
          <Button size="large" sx={{display: "flex", alignItems: "center"}}>
            <IconMinus height="24"/>
          </Button>
          <h3 style={{marginBottom: "0px"}}>{card.quantity} шт.</h3>
          <Button size="large" sx={{display: "flex", alignItems: "center"}}>
            <IconPlus height="24"/>
          </Button>
          <h3 style={{marginBottom: "0px"}}>{card.price * card.quantity} РУБ.</h3>
        </div>
      </CardActions>
    </Card>
  )
}

export default function Cart() {
  const navigate = useNavigate();
  const cart = useAppSelector(state => state.cartReducer.cart)

  const createOrder = () => {
    navigate(`${process.env.REACT_APP_REPO}/cart`);
  }
  
  return (
    <Box className="restaurant">
        <Container sx={{ mt: "64px", mb: "48px", px: "0px !important" }} maxWidth="xl">
          <h1 className="restaurant__title">Корзина</h1>
          { cart.length === 0
            ? <h3>Вы еще ничего не добавили</h3>
            : null
          }
          <Grid container spacing={4}>
            {cart.map((card) => (
              <Grid item key={card.id} xs={12} sm={6} md={3}>
                <CardComponent card={card}></CardComponent>
              </Grid>
            ))}
          </Grid>
          { cart.length > 0
            ? <Box sx={{display: "flex", justifyContent: "center", marginTop: "40px"}}>
                <Button variant="contained" size="large" onClick={createOrder}>Перейти к оплате</Button>
              </Box>
            : null
          }
        </Container>
    </Box>
  );
}
