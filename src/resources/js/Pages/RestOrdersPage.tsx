import axios from "axios";
import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import type {orderType, orderItemType} from "@/types/common";
import RestOrderItem from "@/components/client/order/RestOrderItem";

export default function RestOrdersPage({ restaurant }) {
    const [orders, setOrders] = React.useState<orderType[]>([]);

    const getOrders = async () => {
        axios
            .get(`../api/orders/${restaurant.data.id}`)
            .then((res) => {
                setOrders(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    React.useEffect(() => {
        getOrders();
    }, []);

    return (
        <Box className="restaurant">
            <Container sx={{ mt: "64px", mb: "48px", px: "0px !important" }} maxWidth="xl">
                <h1 className="restaurant__title">Заказы ресторана {restaurant.data.title}</h1>
                { orders.length === 0
                    ? <h3>У вас пока нет заказов</h3>
                    : null
                }
                {orders.map((order) => (
                    <RestOrderItem key={order.id} order={order}></RestOrderItem>
                ))}
            </Container>
        </Box>
    );
}