import { Skeleton, Stack } from "@mui/material";
import React from "react";

export default function MoviesListSkeleton() {
  return (
    <>
      <Skeleton
        animation="wave"
        variant="rectangular"
        height="32px"
        width="215px"
        sx={{ mt: 2, mb: 2, ml: 8 }}
      />
      <Stack direction="row" justifyContent="center" flexWrap="wrap">
        {Array(15)
          .fill(null)
          .map((_, index) => (
            <Stack key={index}>
              <Skeleton
                animation="wave"
                variant="rectangular"
                height="322px"
                width="215px"
              />
              <Skeleton variant="text" animation="wave" width="120px" />
              <Skeleton variant="text" animation="wave" width="100px" />
            </Stack>
          ))}
      </Stack>
    </>
  );
}
