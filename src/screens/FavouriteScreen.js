import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import AppHeader from "../components/AppHeader";
import { useSelector } from "react-redux";
import { fetchMovieDetails } from "../api/moviedb";

export default function FavouriteScreen() {
  const [favouriteFilmIds, setFavouriteFilmIds] = useState([]);
  const [favouriteFilms, setFavouriteFilms] = useState([]);

  useEffect(() => {
  }, [])
  
  

  // for (let index = 0; index < favouriteFilmIds.length; index++) {
  //   result = getMovieDetails(favouriteFilmIds[index]);
  //   setFavouriteFilms(result);
  // }

  // const getMovieDetails = async (movieId) => {
  //   const data = await fetchMovieDetails(movieId);
  //   // console.log("got movie details", data);
  //   if (data) return data;
  // };

  return (
    <View className="flex-1 bg-neutral-800">
      <AppHeader />
    </View>
  );
}
