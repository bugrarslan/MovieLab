import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Dimensions,
  Image,
} from "react-native";
import React from "react";
import { styles } from "../theme";
import { useNavigation } from "@react-navigation/native";
import { image185 } from "../api/moviedb";

var { width, height } = Dimensions.get("window");

export default function MovieList({ title, data, hideSeeAll }) {
  const navigation = useNavigation();
  const handleCardClick = (item) => {
    navigation.push("Movie", item);
  };

  return (
    <View className="mb-8 space-y-4">
      <View className="flex-row items-center justify-between mx-4">
        <Text className="text-xl text-white">{title}</Text>

        {!hideSeeAll && (
          <TouchableOpacity>
            <Text style={styles.text} className="text-lg">
              See all
            </Text>
          </TouchableOpacity>
        )}
      </View>
      {/* movie row */}
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingLeft: 15 }}
      >
        {data.map((item, index) => {
          // console.log("item", item);
          const movieName = item.original_title || item.title;
          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => navigation.navigate("Movie", item)}
            >
              <View className="mr-4 space-y-1">
                <Image
                  // source={require("../assets/images/moviePoster2.png")}
                  source={
                    item.poster_path
                      ? { uri: image185(item.poster_path) }
                      : require("../assets/images/emptyPoster.png")
                  }
                  style={{ width: width * 0.33, height: height * 0.22 }}
                  className="rounded-3xl"
                />
                <Text className="ml-1 text-neutral-300">
                  {movieName.length > 16
                    ? movieName.slice(0, 16) + "..."
                    : movieName}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>
    </View>
  );
}
