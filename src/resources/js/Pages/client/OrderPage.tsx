import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import type {orderType, orderItemType} from "@/types/common"
import OrderItem from "@/components/client/order/OrderItem";

const dishesMock = ():orderItemType[] => [
  {
    id: 1,
    title: "Креветки по-карибкси",
    image: "https://images.unsplash.com/photo-1598514983318-2f64f8f4796c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    price: 1000,
    quantity: 1,
  },
  {
    id: 2,
    title: "Lorem ipsum",
    image: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    price: 800,
    quantity: 2,
  }
]

const ordersMock = ():orderType[] => [
  {
    id: 1,
    status: "Уже готовим",
    dishes: dishesMock(),
    value: 2600,
  },
  {
    id: 2,
    status: "Готов!",
    dishes: dishesMock(),
    value: 2600,
  }
]

export default function OrdersPage() {
  const [orders, setOrders] = useState<orderType[]>([])

  useEffect(() => {
    setOrders(ordersMock());
  }, []);
  
  return (
    <Box className="restaurant">
        <Container sx={{ mt: "64px", mb: "48px", px: "0px !important" }} maxWidth="xl">
          <h1 className="restaurant__title">Заказы</h1>
          { orders.length === 0
            ? <h3>Вы еще ничего не добавили</h3>
            : null
          }
            {orders.map((order) => (
                <OrderItem key={order.id} order={order}></OrderItem>
            ))}
        </Container>
    </Box>
  );
}
