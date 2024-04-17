import React from "react";
import { Bounceable } from "rn-bounceable";
import { Ionicons } from "@expo/vector-icons";
import { Image, Pressable, Text, View } from "react-native";

type WorkoutPropTypes = {
  workout: IWorkout;
};

const Workout = (props: WorkoutPropTypes) => {
  const { title, description, bodyPartId, icon } = props.workout;

  return (
    <Pressable onPress={() => {}}>
      <View key={title} className="mb-1">
        <Bounceable onPress={() => {}}>
          <View className="bg-white p-3 flex flex-row justify-between items-center">
            {/* <Ionicons name={icon} size={24} /> */}
            {/* <Image
              style={{ width: 100, height: 100 }}
              source={{
                uri: "https://barbend.com/wp-content/uploads/2022/03/dumbbell-bench-press-barbend-movement-gif-masters.gif",
              }}
            /> */}
            <Image className="bg-indigo-200 w-28 h-28" />
            <View className="ml-3 flex flex-1">
              <Text className="text-base">{title}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} />
          </View>
        </Bounceable>
      </View>
    </Pressable>
  );
};

export default Workout;
