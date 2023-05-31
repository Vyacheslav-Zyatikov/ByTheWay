import axios from "axios";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Link } from "@inertiajs/react";
import { sectionType } from "@/types/common";

function CardComponent ({ card }) {
    return (
        <Card
            sx={{ height: "100%", display: "flex", flexDirection: "column" }}
        >
            <div className="restaurant__card-image-wrapper">
                <img className="restaurant__card-image" src={`/storage/images/${card.image}`} alt={card.title}/>
            </div>
            <CardContent sx={{ flexGrow: 1 }}>
                <h2>{card.title}</h2>
                <h3>{card.price} РУБ.</h3>
                {card.availability === 1
                    ? <h3>В наличии: ДА</h3>
                    : <h3>В наличии: НЕТ</h3>
                }
                <Typography>{card.description}</Typography>
            </CardContent>
            <CardActions>
                <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "flex-start" }}>
                    <Link href={`#`}>
                        <Button sx={{ mx: 1, display: "block" }} variant="outlined" size="large">Изменить</Button>
                    </Link>
                    <Link href={`#`}>
                        <Button sx={{ mx: 1, display: "block" }} variant="outlined" color="error" size="large">Удалить</Button>
                    </Link>
                </Box>
            </CardActions>
        </Card>
    )
}

export default function RestMenuPage({ restaurant }) {
    const [menu, setMenu] = React.useState<sectionType[]>([]);

    const getMenu = async () => {
        axios
            .get(`../api/sections/${restaurant.data.id}`)
            .then((res) => {
                setMenu(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    React.useEffect(() => {
        getMenu();
    }, []);

    return (
    <Box className="restaurant">
        <div><h2>Меню ресторана {restaurant.data.title}</h2></div>

        <Container sx={{ mt: "25px", mb: "25px", px: "0px !important" }} maxWidth="xl">
            <Grid container sx={{ mt: "15px", mb: "15px", px: "0px !important" }} maxWidth="xl">
                {menu.map((section) => (
                <Grid container key={section.id} sx={{ mt: "25px", mb: "25px", px: "0px !important" }}>
                    <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "flex-start", mb: 3 }}>
                        <Typography sx={{ mx: 1, display: "block",  fontWeight: "bold" }} component="h1">{section.title}</Typography>
                        <Link href={`#`}>
                            <Button sx={{ mx: 1, display: "block" }} variant="outlined" size="large">Изменить</Button>
                        </Link>
                        <Link href={`#`}>
                            <Button sx={{ mx: 1, display: "block" }} variant="outlined" color="error" size="large">Удалить всю категорию</Button>
                        </Link>
                    </Box>
                    <Grid container spacing={4}>
                        {section.dishes.map((card) => (
                            <Grid item key={card.id} xs={12} sm={6} md={3}>
                                <CardComponent card={card}></CardComponent>
                            </Grid>
                        ))}
                        <Grid item xs={12} sm={6} md={3}>
                            <Link href={`#`}>
                                <Button variant="outlined" color="success" size="large">Добавить блюдо</Button>
                            </Link>
                        </Grid>
                    </Grid>
                </Grid>
                ))}
                <Grid item xs={12} sm={6} md={3}>
                    <Link href={`#`}>
                        <Button variant="outlined" color="success" size="large">Добавить категорию</Button>
                    </Link>
                </Grid>
            </Grid>
        </Container>
    </Box>
    );
}