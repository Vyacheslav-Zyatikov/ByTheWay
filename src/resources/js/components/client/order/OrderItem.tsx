import { useState } from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import IconOpen from "@/components/icons/IconOpen";
import Card from "@mui/material/Card";
import type {orderType} from "@/types/common"
import Box from "@mui/material/Box";

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

  return (
    <Card
      sx={{ height: "100%", display: "flex", flexDirection: "column", mb: "24px", }}
    >
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
              Ресторан: {order.restaurant}
            </span>
          </Box>
        </Box>
      }
      >
        {open
          ? null
          : <ListItemButton onClick={handleClick} sx={{ px: "20px"}}>
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

      </List>
    </Card>
  )
}