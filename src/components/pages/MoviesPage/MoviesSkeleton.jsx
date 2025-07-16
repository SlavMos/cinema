import { Box, Skeleton, Stack, useMediaQuery } from "@mui/material";
import React from "react";

export default function MoviesSkeleton() {
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <Stack spacing={4} mt={2} mb={2}>
      {new Array(3).fill(null).map((_, index) => (
        <Box key={index}>
          {/* Заголовок */}
          <Skeleton variant="text" height={40} width={200} sx={{ mb: 2 }} />

          {/* "Карточки" фильмов */}
          <Stack
            direction="row"
            spacing={2}
            flexWrap="wrap"
            justifyContent="center"
          >
            {new Array(isMobile ? 2 : 5).fill(null).map((_, i) => (
              <Skeleton
                key={i}
                variant="rectangular"
                animation="wave"
                height={isMobile ? 300 : 350}
                width={isMobile ? "100%" : 230}
                sx={{ borderRadius: 2 }}
              />
            ))}
          </Stack>
        </Box>
      ))}
    </Stack>
  );
}
