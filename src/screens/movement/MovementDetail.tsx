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
import YoutubeIframe from "react-native-youtube-iframe";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const MovementDetail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { title, bodyPartId, description, imageUrl, tip, videoUrl } =
    route.params as any;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: title ? title : {},
    });
  }, []);

  return (
    <>
      <View className="flex">
        {videoUrl && (
          <YoutubeIframe height={250} width={400} videoId={videoUrl} />
        )}
      </View>
      <ScrollView className="p-4">
        <Text
          className="text-neutral-700 tracking-wide font-bold mx-auto"
          style={{ fontSize: hp(3.5) }}
        >
          {title}
        </Text>
        <Text className="mt-3 text-neutral-700 text-base">{`* ${description}`}</Text>
        {tip && (
          <Text className="mt-3 text-neutral-700 text-base">{`* ${tip}`}</Text>
        )}
      </ScrollView>
    </>
  );
};

export default MovementDetail;
