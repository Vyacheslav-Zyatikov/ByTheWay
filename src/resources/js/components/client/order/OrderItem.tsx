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

  return (
    <Card
      sx={{ height: "100%", display: "flex", flexDirection: "column", mb: "24px", }}
    >
      <List
      sx={{ width: "100%", bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center", p: "20px"}}>
          <Box sx={{display: "flex"}}>
            <span style={{fontSize: "16px", lineHeight: "24px"}}>
              Заказ № {order.id} {order.status}
            </span>
          </Box>
          <span style={{fontSize: "16px", lineHeight: "24px"}}>
            Цена {order.value} &#8381;
          </span>
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
          {order.dishes.map((dish) => (
            <div key={dish.id} className="order__card">
              <div className="order__card-wrap">
                <div className="order__card-image-wrapper">
                  <img className="order__card-image" src={dish.image} alt={dish.title}/>
                </div>
                <span className="order__card-text">{dish.title}</span>
              </div>
              <span className="order__card-text order__card-text--price">{dish.price} &#8381;</span>
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