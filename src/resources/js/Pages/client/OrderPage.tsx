import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import type {orderType, orderItemType} from "@/types/common";
import OrderItem from "@/components/client/order/OrderItem";
import axios from "axios";

export default function OrdersPage() {
  const [orders, setOrders] = useState<orderType[]>([])

  const getOrders = async () => {
    let sessionId = sessionStorage.getItem('sessionId');
    axios
        .get(`../api/sessionOrders/${sessionId}`)
        .then((res) => {
            setOrders(res.data.data);
        })
        .catch((error) => {
            console.log(error);
        });
  };

  const setStatus = async () => {
    sessionStorage.setItem('status', 'choice');
  };

  useEffect(() => {
    getOrders();
    setStatus();
  }, []);
  
  return (
    <Box className="restaurant">
        <Container sx={{ mt: "64px", mb: "48px", px: "0px !important" }} maxWidth="xl">
          <h1 className="restaurant__title">Заказы</h1>
          { orders.length === 0
            ? <h3>Здесь будут ваши заказы</h3>
            : null
          }
            {orders.map((order) => (
                <OrderItem key={order.id} order={order}></OrderItem>
            ))}
        </Container>
    </Box>
  );
}
