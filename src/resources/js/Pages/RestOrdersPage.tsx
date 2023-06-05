import axios from "axios";
import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import type {orderType, orderItemType} from "@/types/common";

function RestOrdersPage({ restaurant }) {
    const [orders, setOrders] = React.useState<orderType[]>([]);

    const getOrders = async () => {
        axios
            .get(`../api/orders/${restaurant.data.id}`)
            .then((res) => {
    console.log(res.data.data);
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
                <div><h2>Заказы ресторана {restaurant.data.title}</h2></div>
            </Container>
        </Box>
    );
}

export default RestOrdersPage;