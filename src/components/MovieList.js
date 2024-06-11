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
    // let movieName = "Ant-Man and the Wasp: Quantumania";
    const navigation = useNavigation();
    const handleCardClick = (item) => {
      navigation.push("Movie", item);
    };
  
    return (
      <View className="mb-8 space-y-4">
        <View className="mx-4 flex-row justify-between items-center">
          <Text className="text-white text-xl">{title}</Text>
  
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
          {
          data.map((item, index) => {
            // console.log("item", item);
            const movieName = item.original_title || item.title;
            return (
              <TouchableWithoutFeedback
                key={index}
                onPress={() => navigation.navigate("Movie", item)}
              >
                <View className="space-y-1 mr-4">
                  <Image
                    // source={require("../assets/images/moviePoster2.png")}
                    source={ item.poster_path ? { uri: image185(item.poster_path)} : require("../assets/images/emptyPoster.png") }
                    style={{ width: width * 0.33, height: height * 0.22 }}
                    className="rounded-3xl"
                  />
                  <Text className="text-neutral-300 ml-1">
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
  