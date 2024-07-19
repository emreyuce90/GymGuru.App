import { View, Text, FlatList, ScrollView, Pressable } from "react-native";
import React from "react";
import Programme from "../../components/programme/Programme";
import { Bounceable } from "rn-bounceable";
import { Ionicons } from "@expo/vector-icons";
import useProgrammes from "./hooks/useProgrammes";
import LoadingScreen from "../../../lib/@core/components/LoadingScreen";
import ErrorScreen from "../../../lib/@core/components/ErrorScreen";
import { useNavigation } from "@react-navigation/native";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import { movementIds } from "../../components/workout";

const Programmes = () => {
  const { programmes, loading, error } = useProgrammes();
  const navigation = useNavigation<any>();

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ErrorScreen error={error} />;
  }
  return (
    <View>
      <FlatList
        className="mt-4"
        data={programmes}
        renderItem={({ item, index }) => (
          <Programme key={index} programme={item} index={index} />
        )}
        keyExtractor={(item) => item.id}
      />

      <Animated.View
        entering={FadeInDown.duration(600)
          .delay((programmes.length + 1) * 200)
          .springify()}
      >
        <Pressable
          onPress={() => {
            navigation.navigate("AddNewProgramme");
          }}
        >
          <View className="mb-1 mt-1 px-5">
            <Bounceable
            // onPress={() => {
            //   navigation.navigate("AddExercises", { movementIds: [] });
            // }}
            >
              <View className=" bg-[#FF6346] p-5 flex flex-row justify-between items-center  rounded-lg ">
                <View className="ml-3 flex flex-row items-center gap-2">
                  <Ionicons name="add-circle" size={40} color={"white"} />
                  <Text className="text-base text-white">
                    Yeni Program Ekle
                  </Text>
                </View>
              </View>
            </Bounceable>
          </View>
        </Pressable>
      </Animated.View>
    </View>
  );
};

export default Programmes;
