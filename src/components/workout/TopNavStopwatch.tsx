import { Text, View } from "react-native";
import StopWatch from "./StopWatch";
import { Bounceable } from "rn-bounceable";
import { Ionicons } from "@expo/vector-icons";

type TopNavStopwatchPropTypes = {
  workoutName: string;
};

const TopNavStopwatch = (props: TopNavStopwatchPropTypes) => {
  const { workoutName } = props;
  return (
    <View className="flex flex-col pb-3">
      <Text>{workoutName}</Text>
      <View className="flex flex-row items-center justify-center">
        <View>
          <StopWatch />
        </View>
        <Bounceable onPress={() => {}}>
          <View className="ml-2 flex flex-row items-center">
            <Ionicons name="pause" size={26} color="grey" />
            <Text>Durdur</Text>
          </View>
        </Bounceable>
      </View>
    </View>
  );
};

export default TopNavStopwatch;
