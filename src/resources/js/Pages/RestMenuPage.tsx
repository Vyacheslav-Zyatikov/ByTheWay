import axios from "axios";
import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
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
                <Typography>{card.description}</Typography>
            </CardContent>
            <CardActions>
                <div className="restaurant__card-add">
                    <h3>{card.price} РУБ.</h3>
                </div>
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
                console.log(res.data.data);
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
                    <h2 className="section__title">{section.title}</h2>

                </Grid>
                ))}
            </Grid>
        </Container>
    </Box>
    );
}