import { useState, useEffect } from "react";
import * as React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link } from "@inertiajs/react";
import { axios } from "@/app";
import { restaurantType } from "@/types/common";


export default function HomePage() {
  const [restaurants, setRestaurants] = useState<restaurantType[]>([]);

  const getRestaurants = async () => {
    const url = "api/restaurants"
    axios
      .get(url)
      .then(({data}) => {
        setRestaurants(data.data);
      })
      .catch((error) => {
        console.log(error)
      });
  }

  useEffect(() => {
    getRestaurants();
  }, []);

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
                  <Link className="homepage__image-wrapper" href={`/restaurants/${card.id}`}>
                    <img className="homepage__image" src={`/storage/images/${card.image}`} alt={card.title}/>
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
                      <Link href={`/restaurants/${card.id}`}>
                          <Button size="large">Смотреть</Button>
                      </Link>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
    </Box>
  );
}
