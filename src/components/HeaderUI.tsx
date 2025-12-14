import { Typography } from "@mui/material";

//Componente -> fragmento de interfaz de usuario que tiene estados

export default function HeaderUI() {

    return (

        <Typography
            variant="h2"
            component="h1"
            sx={{ fontWeight: 'bold' }}>
            ECUAWEATHER
        </Typography>

    )

}

