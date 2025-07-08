import { Stack, Typography } from "@mui/material";
import React from "react";

export default function Footer() {
  return (
    <Stack
      component="footer"
      sx={{
        paddingTop: 4,
        paddingBottom: 4,
        flexDirection: { sm: "row" },
        justifyContent: { sm: "space-between" },
        alignItems: { sm: "center" },
        marginTop: "auto",
      }}
    >
      <Typography variant="body2" color="text.secondary">
        &copy;{new Date().getFullYear()} &laquo;GalaxyCinema&raquo; 18+ <br />
        Данный сайт создан исключительно для хорошего времяпровождения. <br />
        Все права принадлежат Славе.
      </Typography>
      <Typography variant="h5" color="primary.main">
        GalaxyCinema
      </Typography>
    </Stack>
  );
}
