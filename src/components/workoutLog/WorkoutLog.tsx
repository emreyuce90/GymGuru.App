import { View, Text } from "react-native";
import React from "react";

type WorkoutLogPropTypes = {
  workout: IWorkout;
};

const WorkoutLog = (props: WorkoutLogPropTypes) => {
  const { workout } = props;
  return (
    <View className="flex flex-col bg-white px-4 border-gray-500 rounded-xl py-4 m-1">
      <Text className="font-bold text-2xl mb-6">{workout.movementName}</Text>
      <View className="flex flex-col">
        {workout.movementSets.map((ms, index) => {
          return (
            <View
              key={index}
              className="flex flex-row rounded-full items-center space-x-4 justify-start"
            >
              <View className="bg-[#ff6145] rounded-full w-8 h-8 mt-2">
                <Text className="font-bold mx-auto text-white text-xl">
                  {ms.setNumber}
                </Text>
              </View>
              <View>
                <Text className="text-base ">
                  {`${ms.weight} kg x ${ms.reps} tekrar`}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default WorkoutLog;

/*
    Dummydata
    [
    {
        "movementId": "81fb2a6f-9b08-4944-b50d-0505252c9ff4",
        "movementSets": [
            {
                "setNumber": 1,
                "reps": 8,
                "weight": 25,
                "checked": true
            },
            {
                "setNumber": 2,
                "reps": 8,
                "weight": 25,
                "checked": true
            },
            {
                "setNumber": 3,
                "reps": 8,
                "weight": 25,
                "checked": true
            },
            {
                "checked": true,
                "reps": 8,
                "weight": 25,
                "setNumber": 4
            }
        ]
    },
    {
        "movementId": "f34b93d7-b7b2-43ca-af6e-b38f1b55149a",
        "movementSets": [
            {
                "setNumber": 1,
                "reps": 8,
                "weight": 25,
                "checked": true
            },
            {
                "setNumber": 2,
                "reps": 8,
                "weight": 25,
                "checked": true
            },
            {
                "setNumber": 3,
                "reps": 8,
                "weight": 25,
                "checked": true
            },
            {
                "setNumber": 4,
                "reps": 8,
                "weight": 25,
                "checked": true
            }
        ]
    },
    {
        "movementId": "c464266b-9d1a-494b-b933-0c189b5ede40",
        "movementSets": [
            {
                "setNumber": 1,
                "reps": 8,
                "weight": 25,
                "checked": true
            },
            {
                "setNumber": 2,
                "reps": 8,
                "weight": 25,
                "checked": true
            },
            {
                "setNumber": 3,
                "reps": 8,
                "weight": 25,
                "checked": true
            },
            {
                "setNumber": 4,
                "reps": 8,
                "weight": 25,
                "checked": true
            }
        ]
    }
]

*/
