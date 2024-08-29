import {
    View,
    Text,
    Dimensions,
    Platform,
    ScrollView,
    TouchableOpacity,
  } from "react-native";
  import { SafeAreaView } from "react-native-safe-area-context";
  import React, { useEffect, useState } from "react";
  import { styles } from "../theme";
  import { ChevronLeftIcon } from "react-native-heroicons/outline";
  import { HeartIcon } from "react-native-heroicons/solid";
  import { useNavigation, useRoute } from "@react-navigation/native";
  import MovieList from "../components/MovieList";
  import Loading from "../components/Loading";
  import { fallbackPersonImage, fetchPersonDetails, fetchPersonMovies, image342 } from "../api/moviedb";
import { Image } from "expo-image";
  
  const { width, height } = Dimensions.get("window");
  const ios = Platform.OS === "ios";
  const verticalMargin = ios ? "" : "";
  
  export default function PersonScreen() {
    const {params : item} = useRoute();
    const navigation = useNavigation();
    const [isFavourite, setIsFavourite] = useState(false);
    const [person, setPerson] = useState({})
    const [moviesForThisPerson, setMoviesForThisPerson] = useState([]);
    const [loading, setLoading] = useState(true);
    
  
    useEffect(() => {
      getPersonDetails(item.id);
      getPersonMovies(item.id);
    }, [item])
    
    const getPersonDetails = async (personId) => {
      const data = await fetchPersonDetails(personId);
      // console.log("got person details", data);
      if (data) setPerson(data);
      setLoading(false);
    }
  
    const getPersonMovies = async (personId) => {
      const data = await fetchPersonMovies(personId);
      // console.log("got person movies", data);
      if (data && data.cast) setMoviesForThisPerson(data.cast);
      setLoading(false);
    }
  
    return (
      <ScrollView
        className="flex-1 bg-neutral-900"
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <SafeAreaView
          className={
            " z-20 w-full flex-row justify-between items-center px-4" +
            verticalMargin
          }
        >
          <TouchableOpacity
            className="p-1 rounded-xl"
            style={styles.background}
            onPress={() => navigation.goBack()}
          >
            <ChevronLeftIcon size={28} strikeWidth={2.5} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsFavourite(!isFavourite)}>
            <HeartIcon size={35} color={isFavourite ? "red" : "white"} />
          </TouchableOpacity>
        </SafeAreaView>
  
        {/* person details */}
  
        {loading ? (
          <Loading />
        ) : (
          <View>
            <View
              className="flex-row justify-center"
              style={{
                shadowColor: "gray",
                shadowOffset: { width: 0, height: 5 },
                shadowOpacity: 1,
                shadowRadius: 40,
              }}
            >
              <View className="items-center overflow-hidden border-2 rounded-full h-72 w-72 border-neutral-500">
                <Image
                  source={{uri: image342(person?.profile_path) || fallbackPersonImage}}
                  style={{ height: height * 0.43, width: width * 0.74 }}
                  contentFit="cover"
                  transition={1000}
                />
              </View>
            </View>
  
            <View className="mt-6">
              <Text className="text-3xl font-bold text-center text-white">
                {person?.name}
              </Text>
              <Text className="text-base text-center text-neutral-500">
                {person?.place_of_birth}
              </Text>
            </View>
  
            <View className="flex-row items-center justify-between p-4 mx-3 mt-6 rounded-full bg-neutral-700">
              <View className="items-center px-2 border-r-2 border-r-neutral-400">
                <Text className="font-semibold text-white">Gender</Text>
                <Text className="text-sm text-neutral-300">{person?.gender === 1 ? 'Female' : 'Male'}</Text>
              </View>
              <View className="items-center px-2 border-r-2 border-r-neutral-400">
                <Text className="font-semibold text-white">Birthday</Text>
                <Text className="text-sm text-neutral-300">{person?.birthday}</Text>
              </View>
              <View className="items-center px-2 border-r-2 border-r-neutral-400">
                <Text className="font-semibold text-white">Known For</Text>
                <Text className="text-sm text-neutral-300">{person?.known_for_department}</Text>
              </View>
              <View className="items-center px-2 ">
                <Text className="font-semibold text-white">Popularity</Text>
                <Text className="text-sm text-neutral-300">{person?.popularity?.toFixed(2)} %</Text>
              </View>
            </View>
  
            <View className="mx-4 my-6 space-y-2">
              <Text className="text-lg text-white">Biography</Text>
              <Text className="tracking-wide text-neutral-400">
                {person?.biography || "No biography available"}
              </Text>
            </View>
  
            {/* movies */}
            <MovieList
              title={"Movies For This Person"}
              data={moviesForThisPerson}
              hideSeeAll={true}
            />
          </View>
        )}
      </ScrollView>
    );
  }
  