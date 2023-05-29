import axios from "axios";
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function RestMenuPage({ restaurant }) {
    return (
        <Box className="restaurant">
            <div><h2>Меню ресторана {restaurant.data.title}</h2></div>
        </Box>
    );
}

export default RestMenuPage;