import React from "react";
import useMoviesQuery from "../../../hooks/useMoviesQuery";
import AcroolCarousel, { AcroolSlideImage } from "@acrool/react-carousel";
import { Link, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function Movies() {
  const {
    isLoading,
    hasError,
    responsePopular,
    // responseBest,
    // responseFilms,
    // responseSerials,
    // responseCartons,
  } = useMoviesQuery();

  if (isLoading) return <p>Loading...</p>;
  if (hasError) return <p>ERROR</p>;

  const serializeDataForCarousel = (data) =>
    data.map((row) => (
      <AcroolSlideImage
        key={row.id}
        imageUrl={row.posterUrlPreview}
      ></AcroolSlideImage>
    ));

  const carouselArr = [
    {
      title: "Популярные фильмы",
      url: "/popular",
      data: serializeDataForCarousel(responsePopular.data.items), //???,
    },
  ];

  return (
    <div>
      <Stack>
        <Link
          variant="h4"
          sx={{ mb: 2 }}
          component={RouterLink}
          to={carouselArr[0].url}
        >
          {carouselArr[0].title}
        </Link>
        <AcroolCarousel
          data={carouselArr[0].data}
          // slidesPerView={2}
          slidesPerGroup={1}
          isEnableNavButton
          breakpoints={{
            435: {
              slidesPerView: 4,
            },
          }}
        />
      </Stack>
    </div>
  );
}
