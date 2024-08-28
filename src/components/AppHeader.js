import { View, Text, TouchableOpacity, Platform } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import {
  Bars3CenterLeftIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import { styles } from "../theme";
import { useNavigation } from "@react-navigation/native";

const ios = Platform.OS === "ios";

export default function AppHeader() {
  const navigation = useNavigation();
  return (
    <SafeAreaView className={ios ? "mb-2" : "mb-3"}>
      <StatusBar style="light" />
      <View className="flex-row items-center justify-between mx-4">
        <TouchableOpacity>
          <Bars3CenterLeftIcon size={30} color="white" strokeWidth={2} />
        </TouchableOpacity>
        <Text className="text-3xl font-bold text-white">
          <Text style={styles.text}>M</Text>ovie
          <Text style={styles.text}>L</Text>ab
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Search")}>
          <MagnifyingGlassIcon size={30} color="white" strokeWidth={2} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
