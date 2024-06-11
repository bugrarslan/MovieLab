import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import AppNavigation from "./src/navigation/AppNavigator";

export default function App() {
  return (
    <View className="flex-1 ">
      <AppNavigation/>
    </View>
  );
}