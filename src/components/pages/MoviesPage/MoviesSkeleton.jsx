import { Box, Skeleton, Stack, useMediaQuery } from "@mui/material";
import React from "react";

export default function MoviesSkeleton() {
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <Stack spacing={4} mt={isMobile ? 1 : 4} mb={isMobile ? 3 : 4}>
      {new Array(3).fill(null).map((_, index) => (
        <Box key={index}>
          {/* Заголовок */}
          <Skeleton
            variant="text"
            height={60}
            width={250}
            sx={{ mb: 2, ml: 5 }}
          />

          {/* "Карточки" фильмов */}
          <Stack
            direction="row"
            spacing={2}
            flexWrap="wrap"
            justifyContent="center"
          >
            {new Array(4).fill(null).map((_, i) => (
              <Skeleton
                key={i}
                variant="rectangular"
                animation="wave"
                height={isMobile ? 200 : 350}
                width={isMobile ? "100%" : 230}
                sx={{
                  borderRadius: 2,
                  minWidth: isMobile ? "140px" : undefined,
                }}
              />
            ))}
          </Stack>
        </Box>
      ))}
    </Stack>
  );
}
