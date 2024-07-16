import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
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
import SubBodyParts from "../subBodyParts/SubBodyParts";
import useSubBodyParts from "../subBodyParts/hooks/useSubBodyParts";

const Exercises = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const p = route.params as any;
  const { loading, error, exercises } = useExercises(p.id);
  const [subBodyPartId, setSubBodyPartId] = useState<string>("");
  const [exercise, setExercise] = useState<IMovement[]>();
  const {
    loading: subbodypartloading,
    error: subbodyparterror,
    subbodyparts,
  } = useSubBodyParts(p.id);

  const filteredData = useMemo(() => {
    if (subBodyPartId !== "") {
      return exercise?.filter((e) => e.subBodyPartId === subBodyPartId);
    } else {
      return exercise;
    }
  }, [subBodyPartId, exercise]);

  useEffect(() => {
    if (exercises) {
      setExercise(exercises);
    }
  }, [exercises]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: `${p.name} Egzersizleri`,
    });
  }, []);

  if (loading || subbodypartloading) {
    return <LoadingScreen />;
  }

  if (error || subbodyparterror) {
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
        <View className="flex-1 flex-row justify-around">
          <TouchableOpacity
            onPress={() => {
              setSubBodyPartId("");
            }}
          >
            <Text
              className={`px-2 py-2 text-lg ${
                subBodyPartId === ""
                  ? "text-white bg-indigo-500"
                  : "text-gray-700 bg-gray-200"
              } rounded-full`}
            >
              Tümü
            </Text>
            {/* <Text className="px-5 py-2 ml-4 text-lg text-white bg-indigo-500 rounded-full shadow-md">
            {subBodyPart.name}
          </Text> */}
          </TouchableOpacity>
          {subbodyparts &&
            subbodyparts.map((sb, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    setSubBodyPartId(sb.id);
                  }}
                >
                  <Text
                    className={`px-2 py-2 text-lg ${
                      sb.id === subBodyPartId
                        ? "text-white bg-indigo-500"
                        : "text-gray-700 bg-gray-200"
                    } rounded-full`}
                  >
                    {sb.name}
                  </Text>
                  {/* <Text className="px-5 py-2 ml-4 text-lg text-white bg-indigo-500 rounded-full shadow-md">
            {subBodyPart.name}
          </Text> */}
                </TouchableOpacity>
              );
            })}
        </View>

        {exercise && (
          <FlatList
            numColumns={2}
            data={filteredData}
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
