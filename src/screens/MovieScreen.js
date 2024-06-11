import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Platform,
    Dimensions,
    Image,
  } from "react-native";
  import { SafeAreaView } from "react-native-safe-area-context";
  import React, { useEffect, useState } from "react";
  import { useNavigation, useRoute } from "@react-navigation/native";
  import { HeartIcon } from "react-native-heroicons/solid";
  import { ChevronLeftIcon } from "react-native-heroicons/outline";
  import { styles } from "../theme";
  import { theme } from "../theme";
  import {LinearGradient} from "expo-linear-gradient";
  import Cast from "../components/Cast";
  import MovieList from "../components/MovieList";
  import Loading from "../components/Loading";
  import { fetchMovieDetails, fetchMovieCredits, fetchSimilarMovies, image500 } from "../api/moviedb";
  import { useSelector, useDispatch } from "react-redux";
  import { addFavourite, removeFavourite } from "../store/redux/slices/filmSlice";
  
  
  var { width, height } = Dimensions.get("window");
  const ios = Platform.OS === "ios";
  const topMargin = ios ? '' : 'mt-3';
  
  export default function MovieScreen() {
    const { params: item } = useRoute();
    const navigation = useNavigation();
    const [isFavourite, setIsFavourite] = useState(false);
    const [cast, setCast] = useState([]);
    const [similarMovies, setSimilarMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [movie, setMovie] = useState({});
  
    const favouriteFilmsIds = useSelector((state) => state.favouriteFilms.ids);
    const dispatch = useDispatch();
  
    useEffect(() => {
      // console.log("item", item.id);
      getMovieDetails(item.id);
      getMovieCredits(item.id);
      getSimilarMovies(item.id);
    }, [item]);
  
    const getMovieDetails = async (movieId) => {
      const data = await fetchMovieDetails(movieId);
      // console.log("got movie details", data);
      if (data) setMovie(data);
      setLoading(false);
    };
  
    const getMovieCredits = async (movieId) => {
      const data = await fetchMovieCredits(movieId);
      // console.log("got movie credits", data);
      if (data && data.cast) setCast(data.cast);
    };
  
    const getSimilarMovies = async (movieId) => {
      const data = await fetchSimilarMovies(movieId);
      // console.log("got similar movies", data);
      if (data && data.results) setSimilarMovies(data.results);
    };
  
    const starHandler = () => {
      if (filmIsFavourite) {
        console.log("removing to favourites", item?.id);
  
        dispatch(removeFavourite({id: item?.id}));
      } else {
        console.log("adding to favourites", item?.id);
        dispatch(addFavourite({id: item?.id}));
      }
      setIsFavourite(!isFavourite);
    }
  
    const filmIsFavourite = favouriteFilmsIds.includes(item?.id);
  
    return (
      <ScrollView
        contentContainerStyle={{ paddingBottom: 20 }}
        className="flex-1 bg-neutral-900"
      >
        {/* back button and movie poster */}
        <View className="w-full">
          <SafeAreaView className="absolute z-20 w-full flex-row justify-between items-center px-4">
            <TouchableOpacity
              className="rounded-xl p-1"
              style={styles.background}
              onPress={() => navigation.goBack()}
            >
              <ChevronLeftIcon size={28} strikeWidth={2.5} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={starHandler}>
              {
                filmIsFavourite ? (
                  <HeartIcon
                  size={35}
                  color={theme.background}
              />
                ) : (
                  <HeartIcon
                    size={35}
                    color={"white"}
                  />
                )
              }
              
            </TouchableOpacity>
          </SafeAreaView>
  
          {loading ? (
            <Loading />
          ) : (
            <View>
              <Image
                // source={require("../assets/images/moviePoster2.png")}
                source={{ uri: image500(movie?.poster_path) }}
                style={{ width, height: height * 0.55 }}
              />
              <LinearGradient
                colors={["transparent", "rgba(23,23,23,0.8)", "rgba(23,23,23,1)"]}
                style={{ width: width, height: height * 0.4 }}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                className="absolute bottom-0"
              />
            </View>
          )}
        </View>
  
        {/* Movie Details */}
        <View style={{ marginTop: -(height * 0.09) }} className="space-y-3">
  
          {/* title */}
          <Text className="text-white text-center text-3xl font-bold tracking-wider">
            {movie?.title}
          </Text>
  
          {/* status, release, runtime */}
          {
            movie?.id?(
              <Text className="text-neutral-400 font-semibold text-base text-center">
                {movie?.status} · {movie?.release_date?.split('-')[0]} · {movie?.runtime} min
              </Text>
            ) : null
          }
          
          {/* genres */}
          <View className="flex-row justify-center mx-4 space-x-2">
            {
              movie?.genres?.map((genre, index) => {
                let showDot = index+1 != movie?.genres?.length;
                  return(
                  <Text key={index} className="text-neutral-400 font-semibold text-base text-center">
                    {genre?.name} {showDot? '·' : ''}
                  </Text>
                  )
                })
                
            }
          </View>
          
          {/* description */}
          <Text className="text-neutral-400 mx-4 tracking-wide">
            {movie?.overview}
          </Text>
        </View>
  
        {/* cast */}
        {cast?.length > 0 && <Cast navigation={navigation} cast={cast} />}
  
        {/* similar movies */}
        {
          similarMovies.length>0 && 
            <MovieList
              title={"Similar Movies"}
              hideSeeAll={true}
              data={similarMovies}
            />
        }
      </ScrollView>
    );
  }
  