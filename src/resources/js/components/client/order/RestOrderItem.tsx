import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Collapse from "@mui/material/Collapse";
import IconOpen from "@/components/icons/IconOpen";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { Link } from "@inertiajs/react";
import type {orderType} from "@/types/common"
import axios from "axios";

export default function OrderItem ({order}: {order: orderType}) {
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    const getStatusAlias = (status) => {
        if (status === 'choice') {
        return 'Выбор блюд';
        } else if (status === 'payment') {
        return 'Оплата';
        } else if (status === 'new') {
        return 'В очереди';
        } else if (status === 'cooking') {
        return 'Уже готовим';
        } else if (status === 'ready') {
        return 'Готов!';
        } else if (status === 'received') {
        return 'Получен';
        } else if (status === 'archive') {
        return 'Архив';
        }
    }

    const setCookingStatus = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('id', String(order.id));
        formData.append('status', 'cooking');

        axios.post(`../api/orders/${order.id}`, formData)
        .then((res) => {
            console.log(res.data);
        })
        .catch((error) => {
            console.log('Ошибка:', error.response);
        });
    }

    const setReadyStatus = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('id', String(order.id));
        formData.append('status', 'ready');

        axios.post(`../api/orders/${order.id}`, formData)
        .then((res) => {
            console.log(res.data);
        })
        .catch((error) => {
            console.log('Ошибка:', error.response);
        });
    }

    const setReceivedStatus = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('id', String(order.id));
        formData.append('status', 'received');

        axios.post(`../api/orders/${order.id}`, formData)
        .then((res) => {
            console.log(res.data);
        })
        .catch((error) => {
            console.log('Ошибка:', error.response);
        });
    }

    const setArchiveStatus = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('id', String(order.id));
        formData.append('status', 'archive');

        axios.post(`../api/orders/${order.id}`, formData)
        .then((res) => {
            console.log(res.data);
        })
        .catch((error) => {
            console.log('Ошибка:', error.response);
        });
    }

    return (
        <Card sx={{ height: "100%", display: "flex", flexDirection: "column", mb: "24px"}}>
        <List
        sx={{ width: "100%", bgcolor: "background.paper" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
            <Box>
            <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center", p: "20px"}}>
                <Box sx={{display: "flex"}}>
                <span style={{fontSize: "16px", lineHeight: "24px", fontWeight: "bold"}}>
                    Заказ № {order.id}: {getStatusAlias(order.status)}
                </span>
                </Box>
                <span style={{fontSize: "16px", lineHeight: "24px"}}>
                    Стоимость: {order.total} &#8381;
                </span>
            </Box>
            <Box sx={{display: "flex",  p: "20px"}}>
                <span style={{fontSize: "16px", lineHeight: "24px"}}>
                Телефон клиента: {order.userPhone}
                </span>
            </Box>
            </Box>
        }
        >
            {open
            ? null
            : <ListItemButton onClick={handleClick} sx={{px: "20px"}}>
                <ListItemIcon>
                    <IconOpen />
                </ListItemIcon>
                <ListItemText primary="Подробнее" />
            </ListItemButton>
            }

            <Collapse in={open} timeout="auto" unmountOnExit sx={{px: "20px"}}>
            {order.dishes.map((dishOrder) => (
                <div key={dishOrder.id} className="order__card">
                <div className="order__card-wrap">
                    <div className="order__card-image-wrapper">
                    <img className="order__card-image" src={`/storage/images/${dishOrder.dish.image}`} alt={dishOrder.dish.title}/>
                    </div>
                    <span className="order__card-text">{dishOrder.dish.title}</span>
                </div>
                <span className="order__card-text order__card-text--price">{dishOrder.price} &#8381; X {dishOrder.count} = {dishOrder.value} &#8381;</span>
                </div>
            ))}
            </Collapse>

            {open
            ? <ListItemButton onClick={handleClick} sx={{px: "20px", mt: "16px"}}>
                <ListItemIcon>
                <IconOpen />
                </ListItemIcon>
                <ListItemText primary="Скрыть" />
            </ListItemButton>
            : null
            }
            <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "flex-start", mb: 1, p: "20px" }}>
                <Typography sx={{ display: "block",  fontWeight: "bold", fontSize: "16px", pr: "10px" }}>Изменить статус на:</Typography>
                <Button onClick={(e) => setCookingStatus(e)} sx={{ mx: 1, display: "block" }} variant="outlined" size="large">{getStatusAlias('cooking')}</Button>
                <Button onClick={(e) => setReadyStatus(e)} sx={{ mx: 1, display: "block" }} variant="outlined" color="success" size="large">{getStatusAlias('ready')}</Button>
                <Button onClick={(e) => setReceivedStatus(e)} sx={{ mx: 1, display: "block" }} variant="outlined" size="large">{getStatusAlias('received')}</Button>
                <Button onClick={(e) => setArchiveStatus(e)} sx={{ mx: 1, display: "block" }} variant="outlined" color="error" size="large">{getStatusAlias('archive')}</Button>
            </Box>
        </List>
        </Card>
    )
}