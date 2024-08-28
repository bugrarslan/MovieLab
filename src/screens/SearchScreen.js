import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Image,
    Dimensions,
    TouchableWithoutFeedback,
  } from "react-native";
  import { SafeAreaView } from "react-native-safe-area-context";
  import React, { useCallback, useState } from "react";
  import { XMarkIcon } from "react-native-heroicons/outline";
  import { useNavigation } from "@react-navigation/native";
  import Loading from "../components/Loading";
  import {debounce} from "lodash";
  import { fallbackMoviePoster, image185, searchMovies } from "../api/moviedb";
  
  const { width, height } = Dimensions.get("window");
  
  export default function SearchScreen() {
    const navigation = useNavigation();
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
  
    const handleSearch = value => {
      if (value && value.length > 2) {
        setLoading(true);
        searchMovies({
          query:value, 
          include_adult:false, 
          language:"en-US", 
          page:1
        }).then((data) => {
          setLoading(false);
          if (data && data.results) setResults(data.results);
        })
      } else {
        setLoading(false);
        setResults([]);
      }
    }
  
    const handleTextDebounce = useCallback(debounce(handleSearch, 400), [] );
  
    return (
      <SafeAreaView className="flex-1 bg-neutral-800">
        <View className="flex-row items-center justify-between mx-4 mb-3 border rounded-full border-neutral-500">
          <TextInput
          onChangeText={handleTextDebounce}
            placeholder="Search Movie"
            placeholderTextColor="lightgray"
            className="flex-1 pb-1 pl-6 text-base font-semibold tracking-wide text-white"
          />
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="p-3 m-1 rounded-full bg-neutral-500"
          >
            <XMarkIcon size={25} color="white" strokeWidth={2} />
          </TouchableOpacity>
        </View>
        {/* results */}
        {loading ? (
          <Loading />
        ) : results.length > 0 ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            className="space-y-3"
          >
            <Text className="ml-1 font-semibold text-white">
              Results ({results.length})
            </Text>
            <View className="flex-row flex-wrap justify-between">
              {results.map((item, index) => {
                return (
                  <TouchableWithoutFeedback
                    key={index}
                    onPress={() => navigation.navigate("Movie", item)}
                  >
                    <View className="mb-4 space-y-2">
                      <Image
                        className="rounded-2xl"
                        // source={require("../assets/images/moviePoster2.png")}
                        source={{ uri: image185(item?.poster_path) || fallbackMoviePoster}}
                        style={{ width: width * 0.44, height: height * 0.3 }}
                      />
                      <Text className="ml-1 text-neutral-300">
                        {item?.title.length > 22
                          ? item?.title.slice(0, 22) + "..."
                          : item?.title}
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                );
              })}
            </View>
          </ScrollView>
        ) : (
          <View className="flex-row justify-center">
            <Image
              source={require("../assets/images/movieTime.png")}
              className="h-96 w-96"
            />
          </View>
        )}
      </SafeAreaView>
    );
  }
  