import React from "react";
import useMoviesQuery from "../../../hooks/useMoviesQuery";
import AcroolCarousel, { AcroolSlideImage } from "@acrool/react-carousel";
import { Link, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import ErrorMessage from "../../ui/ErrorMessage/ErrorMessage";
import MoviesSkeleton from "./MoviesSkeleton";

export default function Movies() {
  const {
    isLoading,
    hasError,
    responsePopular,
    responseBest,
    responseFilms,
    responseSerials,
    responseCartons,
  } = useMoviesQuery();

  if (isLoading) return <MoviesSkeleton />;
  if (hasError) return <ErrorMessage />;

  const serializeDataForCarousel = (data) =>
    data.map((row) => (
      <RouterLink key={row.id} to={`/movie/${row.kinopoiskId}`}>
        <AcroolSlideImage imageUrl={row.posterUrlPreview}></AcroolSlideImage>
      </RouterLink>
    ));

  const carouselArr = [
    {
      title: "Популярные фильмы",
      url: "/popular",
      data: serializeDataForCarousel(responsePopular.data.items),
    },
    {
      title: "Лучшие фильмы",
      url: "/best",
      data: serializeDataForCarousel(responseBest.data.items),
    },
    {
      title: "Фильмы",
      url: "/films",
      data: serializeDataForCarousel(responseFilms.data.items),
    },
    {
      title: "ТВ Шоу",
      url: "/serials",
      data: serializeDataForCarousel(responseSerials.data.items),
    },
    {
      title: "Мультфильмы",
      url: "/cartoons",
      data: serializeDataForCarousel(responseCartons.data.items),
    },
  ];

  return (
    <div>
      {carouselArr.map((section) => (
        <Stack key={section.url}>
          <Link
            variant="h4"
            sx={{ mb: 2 }}
            component={RouterLink}
            to={section.url}
          >
            {section.title}
          </Link>
          <AcroolCarousel
            data={section.data}
            // slidesPerView={2}
            isEnableAutoPlay
            autoPlayTime={5000}
            slidesPerGroup={1}
            isEnableNavButton
            isEnableLoop
            breakpoints={{
              435: {
                slidesPerView: 4,
              },
            }}
          />
        </Stack>
      ))}
    </div>
  );
}
