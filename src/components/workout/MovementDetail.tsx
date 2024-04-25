import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  Pressable,
  Touchable,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { movements } from "../../utils/types/datas";
import YoutubeIframe from "react-native-youtube-iframe";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";

const MovementDetail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { workoutId } = route.params as any;
  const { title, icon, video, description }: IMovement | undefined =
    workouts.find((w) => w.id === workoutId);

  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: title ? title : {},
    });
  }, []);
  return (
    <SafeAreaView>
      <ScrollView className="flex p-1 bg-orange-100">
        {icon && (
          <Image
            resizeMode="contain"
            className="flex-1 mx-auto"
            source={{
              uri: icon,
            }}
            width={windowWidth * 0.75}
            height={windowHeight * 0.33}
          />
        )}
        <View className="mt-5">
          <Text className="text-xl mx-auto text-gray-500">
            Hareketin Yapılışı & Püf Noktalar
          </Text>
          <View className="flex flex-row px-4 py-1 items-center gap-3 mt-2">
            <Ionicons name="barbell" size={24} color="tomato" />
            <Text className="text-base mx-auto">{description}</Text>
          </View>
          <View className="flex flex-row px-4 py-1 items-center gap-3">
            <Ionicons name="bulb" size={24} color="tomato" />
            <Text className="text-base mx-auto">{description}</Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => {}}
          className="flex flex-row items-center mx-auto bg-indigo-100 rounded-lg p-2 mt-5 mb-2"
        >
          <Ionicons name="add-circle" size={36} color="tomato"></Ionicons>
          <Text className="ml-3 text-base text-gray-500">Programıma Ekle</Text>
        </TouchableOpacity>

        {video && (
          <View className="mt-5">
            <YoutubeIframe
              height={400}
              width={400}
              videoId="rT7DgCr-3pg?si=SBrif2OWaYpxz4JJ"
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default MovementDetail;
