import { View, Text, Pressable } from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

const Home = () => {
  const navigation = useNavigation<any>();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <View className="mx-4">
          <Pressable onPress={() => navigation.openDrawer()}>
            <Feather name="menu" size={24} color="black" />
          </Pressable>
        </View>
      ),
    });
  }, []);
  return (
    <View>
      <Text>Home</Text>
    </View>
  );
};

export default Home;
