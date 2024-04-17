import { Text, FlatList } from "react-native";
import React from "react";
import Workout from "../../components/workout/Workout";

type WorkoutPropTypes = {
  workouts: IWorkout[];
};

const Workouts = (props: WorkoutPropTypes) => {
  return (
    <FlatList
      data={props.workouts}
      renderItem={({ item }: { item: IWorkout }) => <Workout workout={item} />}
    />
  );
};

export default Workouts;
