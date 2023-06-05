import * as React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import type {restaurantType, dishType} from "@/types/common";
import { setCartCount, setCart } from "@/redux/reducers/cartReducer";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { router } from "@inertiajs/react";
import axios from "axios";

function CardComponent ({card}: {card: dishType}) {
  const count = useAppSelector(state => state.cartReducer.count)
  const cart = useAppSelector(state => state.cartReducer.cart)
  const dispatch = useAppDispatch()

  const addToCartHandle = () => {
    const cartItem = Object.assign({}, card);
    cartItem["quantity"] = 1;

    const formData = new FormData();
    let dish = JSON.stringify(cartItem);
    formData.append('dish', dish);

    axios.post('../api/session', formData)
    .then((res) => {
      sessionStorage.setItem('status', 'choice');

      let storedCount = Number(sessionStorage.getItem('count'));
      if (storedCount) {
        storedCount++;
        let strCount = String(storedCount);
        sessionStorage.setItem('count', strCount);
        dispatch(setCartCount(storedCount));
      } else {
        sessionStorage.setItem('count', '1');
        dispatch(setCartCount(1));
      }

      let newCartItem = res.data;
      let sessionId = res.data.session_id;
      sessionStorage.setItem('sessionId', sessionId);

      let storedCart = sessionStorage.getItem('cart');
      if (storedCart) {
        let newCartForStorage = [...JSON.parse(storedCart), newCartItem];
        dispatch(setCart(newCartForStorage));
        sessionStorage.setItem('cart', JSON.stringify(newCartForStorage));
      } else {
        let newCartForStorage = [newCartItem];
        dispatch(setCart(newCartForStorage));
        sessionStorage.setItem('cart', JSON.stringify(newCartForStorage));
      }
    })
    .catch((error) => {
      console.log('Ошибка:', error);
    });
  }

  return (
    <Card
      sx={{ height: "100%", display: "flex", flexDirection: "column" }}
    >
      <div className="restaurant__card-image-wrapper">
        <img className="restaurant__card-image" src={`/storage/images/${card.image}`} alt={card.title}/>
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
          <Button size="large" onClick={addToCartHandle}>Добавить</Button>
          <h3>{card.price} РУБ.</h3>
        </div>
      </CardActions>
    </Card>
  )
}

export default function RestaurantPage({ restaurant, dishes }:{restaurant:restaurantType, dishes:dishType}) {
  const count = useAppSelector(state => state.cartReducer.count)

  const goToCart = () => {
      router.visit("/cart");
  }

  const setStatus = async () => {
    sessionStorage.setItem('status', 'choice');
  };

  React.useEffect(() => {
    setStatus();
  }, []);

  return (
    <Box className="restaurant">
        <div className="restaurant__hero-image-wrapper">
          <img className="restaurant__hero-image" src={`/storage/images/${restaurant.image}`} alt={restaurant.title}/>
          <span className="restaurant__hero-title">{restaurant.title}</span>
        </div>

        <Container sx={{ mt: "25px", mb: "25px", px: "0px !important" }} maxWidth="xl">
          <h1 className="restaurant__title">Наши блюда</h1>
          <Grid container sx={{ mt: "15px", mb: "15px", px: "0px !important" }} maxWidth="xl">
            {Object.entries(dishes).map(([key, value]) => (
              <Grid container key={ key } sx={{ mt: "25px", mb: "25px", px: "0px !important" }}>
                  <h2 className="section__title">{ key }</h2>
                  <Grid container spacing={4}>
                      {value.map((card) => (
                          <Grid item key={card.id} xs={12} sm={6} md={3}>
                              <CardComponent card={card}></CardComponent>
                          </Grid>
                      ))}
                  </Grid>
              </Grid>
            ))}
          </Grid>
          {count > 0
            ? <Box sx={{display: "flex", justifyContent: "center", marginTop: "40px"}}>
                <Button variant="contained" size="large" onClick={goToCart}>Оформить заказ</Button>
              </Box>
            : null
          }
        </Container>
    </Box>
  );
}
