import { View, Text, Image } from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { workouts } from "../../utils/types/datas";

const WorkoutDetail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { workoutId } = route.params as any;
  const { title, icon, video, description }: IWorkout | undefined =
    workouts.find((w) => w.id === workoutId);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: title ? title : {},
    });
  }, []);
  return (
    <View>
      <Image
        source={{
          uri: icon,
        }}
        width={400}
        height={400}
      />
      <Text className="text-xl mx-auto mt-4 font-bold">{description}</Text>
    </View>
  );
};

export default WorkoutDetail;
