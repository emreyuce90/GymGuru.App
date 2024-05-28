import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Bounceable } from "rn-bounceable";

export function getFormattedTime(seconds: number) {
  let hour = Math.floor(seconds / 3600) as any;
  let minute = Math.floor((seconds % 3600) / 60) as any;
  let second = (seconds % 60) as any;

  if (minute < 10) {
    minute = `0${minute}`;
  }

  if (second < 10) {
    second = `0${second}`;
  }
  if (hour < 10) {
    hour = `0${hour}`;
  }
  return `${hour > 0 ? `${hour}:` : ""}${minute}:${second}`;
}

type StopWatchPropTypes = {
  workoutName: string;
  seconds: number;
  setSeconds: React.Dispatch<React.SetStateAction<number>>;
  isRunning: boolean;
  setIsRunning: React.Dispatch<React.SetStateAction<boolean>>;
};

const StopWatch = (props: StopWatchPropTypes) => {
  const { workoutName, seconds, setSeconds, isRunning, setIsRunning } = props;

  const handleStartPause = () => {
    setIsRunning(!isRunning);
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;
    if (isRunning) {
      intervalId = setInterval(() => setSeconds((prev) => prev + 1), 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isRunning]);

  return (
    <>
      <View className="flex flex-col">
        <Text>{workoutName}</Text>
      </View>
      <View className="flex flex-row items-center justify-center">
        <Text className="text-right text-2xl font-bold">
          {getFormattedTime(seconds)}
        </Text>
        <Bounceable onPress={() => handleStartPause()}>
          <View className="ml-2 flex flex-row items-center">
            <Ionicons
              name={isRunning ? "pause" : "play"}
              size={26}
              color="#FF6346"
            />
            <Text>{isRunning ? "Durdur" : "Devam Et"}</Text>
          </View>
        </Bounceable>
      </View>
      <View />
    </>
  );
};

export default StopWatch;
