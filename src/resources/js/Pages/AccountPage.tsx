import axios from "axios";
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function AccountPage({ restaurant }) {
    return (
        <Box className="restaurant">
            <div><h2>Личный кабинет ресторана</h2></div>
            <div className="restaurant__hero-image-wrapper">
                <img className="restaurant__hero-image" src={`/storage/images/${restaurant.data.image}`} alt={restaurant.data.title}/>
                <span className="restaurant__hero-title">{restaurant.data.title}</span>
            </div>
            <Typography mt={2} gutterBottom variant="h5" component="h2">{restaurant.data.title}</Typography>
            <Typography>{restaurant.data.description}</Typography>
        </Box>
    );
}

export default AccountPage;