import { useEffect, useState } from "react";
import { Text } from "react-native";

function getFormattedTime(seconds: number) {
  let hour = Math.floor(seconds / 3600) as any;
  let minute = Math.floor(seconds / 60) as any;
  let second = (seconds - minute * 60) as any;

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

const StopWatch = () => {
  const [seconds, setSeconds] = useState<number>(0);

  useEffect(() => {
    setInterval(() => setSeconds((prev) => prev + 1), 1000);
  }, []);

  return (
    <Text className="text-right text-2xl font-bold">
      {getFormattedTime(seconds)}
    </Text>
  );
};
export default StopWatch;

//159

//2dk
//
