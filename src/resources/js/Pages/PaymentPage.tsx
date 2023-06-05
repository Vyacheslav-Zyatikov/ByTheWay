import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import { router } from "@inertiajs/react";
import axios from "axios";
import { setCartCount, setCart } from "@/redux/reducers/cartReducer";
import { useAppDispatch, useAppSelector } from "@/redux/store";

export default function PaymentPage() {
  const dispatch = useAppDispatch();
  const [cartValue, setCartValue] = React.useState('');

  const addOrders = () => {
    let sessionId = sessionStorage.getItem('sessionId');

    axios.get(`../api/cart/${sessionId}`)
    .then((res) => {
      let cartDishes = res.data.data;
      let cartDishesIds = cartDishes.map(item => {
        return item.id;
      });
      let restaurantIds = cartDishes.map(item => {
        return item.dish.restaurant.id;
      });
      let uniqueIds = [...new Set(restaurantIds)];

      uniqueIds.forEach((restId) => {
        let restDishes = cartDishes.filter(item => {
          if (item.dish.restaurant.id == restId) {
            return item;
          }
        });
        let values = restDishes.map(item => {
            return Number(item.value);
        });
        let total = values.reduce(function(sum, elem) {
          return sum + elem;
        }, 0);

        const formData = new FormData();
        formData.append('session_id', String(sessionId));
        formData.append('restaurant_id', JSON.stringify(restId));
        formData.append('total', total);

        axios.post('../api/order', formData)
        .then((res) => {
          let dishes = restDishes.map(item => {
            let dish = {
              dish_id: item.dish_id,
              order_id: res.data.id,
              price: item.price,
              count: item.count,
              value: item.value,
              dish: {
                id: item.dish.id,
                section_id: item.dish.section_id,
                title: item.dish.title,
                description: item.dish.description,
                image: item.dish.image,
                price: item.dish.price,
                availability: item.dish.availability,
              },
            };
            return dish;
          });

          let restOrder = {
            id: res.data.id,
            session_id: res.data.session_id,
            restaurant_id: res.data.restaurant_id,
            total: res.data.total,
            status: res.data.status,
            dishes: dishes,
          };

          let orders = sessionStorage.getItem('orders');
          if (orders) {
            let newOrder = [...JSON.parse(orders), restOrder];
            sessionStorage.setItem('orders', JSON.stringify(newOrder));
          } else {
            let newOrder = [restOrder];
            sessionStorage.setItem('orders', JSON.stringify(newOrder));
          }

          const orderData = new FormData();
          orderData.append('dishes', JSON.stringify(dishes));

          axios.post('../api/dishOrder', orderData)
          .then((res) => {
            console.log(res.data);
          })
          .catch((error) => {
            console.log('Ошибка:', error);
          });
        })
        .catch((err) => {
          console.log('Ошибка:', err);
        });
      });

      cartDishesIds.forEach((id) => {
        axios.delete(`../api/cart/${id}`)
        .then((res) => {
          console.log(res.data);
        })
        .catch((error) => {
          console.log('Ошибка:', error);
        });
      });

      sessionStorage.removeItem('cart');
      sessionStorage.removeItem('count');
      sessionStorage.removeItem('cartValue');
      sessionStorage.setItem('status', 'choice');
      dispatch(setCartCount(0));
      router.visit("/order");
    })
    .catch((err) => {
      console.log('Ошибка:', err);
    });
  };

  const goToHome = () => {
    sessionStorage.setItem('status', 'choice');
    router.visit("/");
  };

  const goToCart = () => {
    sessionStorage.setItem('status', 'choice');
    router.visit("/cart");
  };

  const getCartValue = async () => {
    let cartValue = sessionStorage.getItem('cartValue');
    if (cartValue) {
      setCartValue(cartValue);
    }
  };

  const setStatus = async () => {
    sessionStorage.setItem('status', 'payment');
  };

  React.useEffect(() => {
    getCartValue();
    setStatus();
  }, []);

  return (
    <Box className="restaurant">
      <Container sx={{ mt: "64px", mb: "48px", px: "0px !important" }} maxWidth="xl">
        <h1 className="restaurant__title">Оплата заказа на сумму {cartValue} РУБ.</h1>

        <Box sx={{mt: "50px", display: "flex", flexDirection: "column", alignItems: "center"}}>
            <TextField defaultValue="1111222233334444" label="Номер карты" variant="outlined" sx={{mb: "20px", width: "400px"}}/>
            <Box sx={{ mb: "20px", flexGrow: 1, display: "flex", justifyContent: "flex"}}>
              <TextField defaultValue="09/24" label="Срок действия" variant="outlined" sx={{mr: "18px", width: "200px", display: "block"}}/>
              <TextField defaultValue="123" label="CVV" variant="outlined" sx={{width: "180px", display: "block"}}/>
            </Box>
            <TextField defaultValue="VLADIMIR IVANOV" label="Владелец" variant="outlined" sx={{mb: "20px", width: "400px"}}/>
        </Box>

        <Box sx={{mt: "20px", display: "flex", flexDirection: "column", alignItems: "center"}}>
          <Button variant="contained" size="large" onClick={addOrders}>Оплатить</Button>
          <Box sx={{ mt: "20px", flexGrow: 1, display: "flex", justifyContent: "flex-end"}}>
            <Button onClick={goToHome} variant="outlined" sx={{ mr: 2, display: "block" }}>
              К выбору блюд
            </Button>
            <Button onClick={goToCart} variant="outlined" sx={{ ml: 2, display: "block" }}>
              В корзину
            </Button>
          </Box>
        </Box>
      </Container> 
    </Box>
  );
}