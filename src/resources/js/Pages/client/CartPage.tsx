import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import type {cartType} from "@/types/common";
import { useAppSelector } from "@/redux/store";
import IconPlus from "@/components/icons/IconPlus";
import IconMinus from "@/components/icons/IconMinus";
import { router } from "@inertiajs/react";
import { useEffect, useState } from "react";
import axios from "axios";

function CardComponent ({card}: {card: cartType}) {

  return (
    <Card
      sx={{ height: "100%", display: "flex", flexDirection: "column" }}
    >
      <div className="restaurant__card-image-wrapper">
        <img className="restaurant__card-image" src={`/storage/images/${card.dish.image}`} alt={card.dish.title}/>
      </div>
      <CardContent sx={{ flexGrow: 1 }}>
        <h2>{card.dish.title}</h2>
        <Typography>{card.dish.description}</Typography>
      </CardContent>
      <CardActions>
        <div className="restaurant__card-add">
          <Button size="large" sx={{display: "flex", alignItems: "center"}}>
            <IconMinus height="24"/>
          </Button>
          <h3 style={{marginBottom: "0px"}}>{card.count} шт.</h3>
          <Button size="large" sx={{display: "flex", alignItems: "center"}}>
            <IconPlus height="24"/>
          </Button>
          <h3 style={{marginBottom: "0px"}}>{card.value} РУБ.</h3>
        </div>
      </CardActions>
    </Card>
  )
}

export default function Cart() {
  // const navigate = useNavigate();
  const cart = useAppSelector(state => state.cartReducer.cart);
  const [cartValue, setCartValue] = useState('');

  const goToPayment = () => {
    sessionStorage.setItem('status', 'payment');
    router.visit("/payment");
  };

  const getCartValue = async () => {
    sessionStorage.setItem('status', 'choice');
    let sessionId = sessionStorage.getItem('sessionId');

    axios.get(`../api/cartValue/${sessionId}`)
    .then((res) => {
      setCartValue(JSON.stringify(res.data));
      sessionStorage.setItem('cartValue', JSON.stringify(res.data));
    })
    .catch((err) => {
      console.log('Ошибка:', err);
    });
  };

  const setStatus = async () => {
    sessionStorage.setItem('status', 'choice');
  };

  useEffect(() => {
    getCartValue();
    setStatus();
  }, []);

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
            ? <Box sx={{mt: "50px", display: "flex", flexDirection: "column", alignItems: "center"}}>
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>Стоимость заказа: {cartValue} РУБ.</Typography>
                <Button sx={{mt: "30px"}} variant="contained" size="large" onClick={goToPayment}>Перейти к оплате</Button>
              </Box>
            : null
          }
        </Container>
    </Box>
  );
}
