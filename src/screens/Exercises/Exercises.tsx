import { View, Text, Image, FlatList } from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import useExercises from "./hooks/useExercises";
import LoadingScreen from "../../../lib/@core/components/LoadingScreen";
import ErrorScreen from "../../../lib/@core/components/ErrorScreen";
import ExerciseCard from "./ExerciseCard";
import { ScrollView } from "react-native-virtualized-view";

const Exercises = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const p = route.params as any;
  const { loading, error, exercises } = useExercises(p.id);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: `${p.name} Egzersizleri`,
    });
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ErrorScreen error={error} />;
  }

  return (
    <ScrollView>
      <Image
        src={`${process.env.EXPO_PUBLIC_API_URL}/api.gymguru.com.tr/bodyPart/${p.pictureUrl}`}
        style={{ width: wp(100), height: hp(40) }}
        className="rounded-b-[40px]"
      />
      <View className="mx-4 space-y-3 mt-4 flex-1">
        <Text
          style={{ fontSize: hp(3) }}
          className="font-semibold text-neutral-700"
        >
          {p.name} Egzersizleri
        </Text>
        {exercises && (
          <FlatList
            numColumns={2}
            data={exercises}
            renderItem={({ item, index }) => (
              <ExerciseCard exercise={item} index={index} />
            )}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 60,
              paddingTop: 20,
            }}
            columnWrapperStyle={{
              justifyContent: "space-between",
            }}
          />
        )}
      </View>
    </ScrollView>
  );
};

export default Exercises;
