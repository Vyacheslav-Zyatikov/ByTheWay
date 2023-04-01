import "../../css/pages/_homepage.scss";
import * as React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link } from '@inertiajs/react';

const restaurants = [
  {
    id: 1,
    title: "Чилим Seafood",
    image: "https://images.unsplash.com/photo-1515669097368-22e68427d265?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    // image: "/images/restaurants/seafood.jpg",
    description: "РЫБА, МОРЕПРОДУКТЫ. Проект-привет с Дальнего Востока. Содержателен с точки зрения белков. Харизматичен, как магаданская креветка. Вызывает привыкание к гребешку, крабу и вонголе. Кормим, поим, доставляем. Из Японского моря прямо в ваши тарелки!"
  },
  {
    id: 2,
    title: "Lorem Ipsum",
    image: "https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    description: "РЫБА, МОРЕПРОДУКТЫ. Проект-привет с Дальнего Востока. Содержателен с точки зрения белков. Харизматичен, как магаданская креветка. Вызывает привыкание к гребешку, крабу и вонголе. Кормим, поим, доставляем. Из Японского моря прямо в ваши тарелки!"
  },
  {
    id: 3,
    title: "Lorem Ipsum",
    image: "https://images.unsplash.com/photo-1494346480775-936a9f0d0877?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1116&q=80",
    description: "РЫБА, МОРЕПРОДУКТЫ. Проект-привет с Дальнего Востока. Содержателен с точки зрения белков. Харизматичен, как магаданская креветка. Вызывает привыкание к гребешку, крабу и вонголе. Кормим, поим, доставляем. Из Японского моря прямо в ваши тарелки!"
  },
  {
    id: 4,
    title: "Lorem Ipsum",
    image: "https://images.unsplash.com/photo-1521917441209-e886f0404a7b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1760&q=80",
    description: "РЫБА, МОРЕПРОДУКТЫ. Проект-привет с Дальнего Востока. Содержателен с точки зрения белков. Харизматичен, как магаданская креветка. Вызывает привыкание к гребешку, крабу и вонголе. Кормим, поим, доставляем. Из Японского моря прямо в ваши тарелки!"
  },
  {
    id: 5,
    title: "Lorem Ipsum",
    image: "https://images.unsplash.com/photo-1587574293340-e0011c4e8ecf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80",
    description: "РЫБА, МОРЕПРОДУКТЫ. Проект-привет с Дальнего Востока. Содержателен с точки зрения белков. Харизматичен, как магаданская креветка. Вызывает привыкание к гребешку, крабу и вонголе. Кормим, поим, доставляем. Из Японского моря прямо в ваши тарелки!"
  }
];

export default function HomePage() {
  return (
    <Box className="homepage">
        <Box
          sx={{
            bgcolor: "background.paper",
            mt: "48px",
            mb: "48px",
          }}
        >
          <Container maxWidth="md">
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Добро пожаловать на наш фудкорт! Мы рады предложить вам множество вкусных блюд, разных кухонь и на любой вкус. Наша команда шеф-поваров тщательно отбирает качественные продукты и готовит каждое блюдо с любовью. Вы можете наслаждаться вкусом у нас на месте или заказать с собой.
            </Typography>
          </Container>
        </Box>

        <Container sx={{ mt: "64px", mb: "48px", px: "0px !important" }} maxWidth="xl">
          <Grid container spacing={4}>
            {restaurants.map((card) => (
              <Grid item key={card.id} xs={12} sm={12} md={6}>
                <Card
                  sx={{ height: "100%", display: "flex", flexDirection: "column" }}
                >
                  <Link className="homepage__image-wrapper" to='/'>
                    <img className="homepage__image" src={card.image} alt={card.title}/>
                  </Link>{" "}
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.title}
                    </Typography>
                    <Typography>
                      {card.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="large">Смотреть</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
    </Box>
  );
}