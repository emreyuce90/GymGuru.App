import { Text, TouchableOpacity, TextInput } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Feather, Ionicons } from "@expo/vector-icons";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import LoadingScreen from "../../../lib/@core/components/LoadingScreen";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import { IMeasureUpdate } from "./types/IMeasureUpdate";

type UsersMeasurementsPropTypes = {
  measurement: IUserMeasurements;
  index: number;
  handleMeasurementUpdate: (data: IMeasureUpdate) => void;
};

const UsersMeasurement: React.FC<UsersMeasurementsPropTypes> = React.memo(
  ({ measurement, index, handleMeasurementUpdate }) => {
    const navigation = useNavigation<any>();
    const width = wp(100);
    const height = wp(40);

    const [clicked, setClicked] = useState<boolean>(false);
    const [text, setText] = useState<string>(measurement.value);
    const [loading, setLoading] = useState<boolean>(false);

    const handleMeasureChange = async () => {
      const dataToSend: IMeasureUpdate = {
        bodyMetricId: measurement.bodyMetricsId,
        metricId: measurement.metricId,
        value: parseFloat(text),
      };
      await handleMeasurementUpdate(dataToSend);
    };

    const handleClicked = useCallback(() => {
      setClicked((prev) => !prev);
    }, []);

    useEffect(() => {
      if (measurement) {
        setText(measurement.value.toString());
      }
    }, [measurement]);

    if (loading) {
      return <LoadingScreen />;
    }
    return !clicked ? (
      <Animated.View
        entering={FadeInDown.duration(400)
          .delay(index * 200)
          .springify()}
      >
        <LinearGradient
          colors={[`${measurement.color}`, `${measurement.color2}`]}
        >
          <TouchableOpacity
            onPress={() => {
              if (measurement.metricId != null) {
                navigation.navigate(`${measurement.metricName}`);
              }
            }}
            style={{
              width: width,
              height: height,
              //backgroundColor: `${measurement.color}`,
            }}
            className={`flex p-4 items-center mt-2 rounded-xl ml-1 justify-center`}
          >
            <Text className="font-bold text-white text-3xl">
              {text}
              {measurement.metricName === "Kilo" ? "kg" : "cm"}
            </Text>
            <Text className="font-semibold text-white text-base">
              {measurement.metricName}
            </Text>
            <Feather
              onPress={handleClicked}
              name="edit"
              color="white"
              size={28}
              style={{ position: "absolute", top: "50%", right: "10%" }}
            />
          </TouchableOpacity>
        </LinearGradient>
      </Animated.View>
    ) : (
      <>
        <LinearGradient
          colors={[`${measurement.color}`, `${measurement.color2}`]}
        >
          <TouchableOpacity
            onPress={() => {}}
            style={{
              width: width,
              height: height,
              //backgroundColor: `${measurement.color}`,
            }}
            className="flex p-4 items-center mt-2 rounded-xl ml-1 justify-center"
          >
            <Text className="font-bold text-2xl"></Text>
            <TextInput
              keyboardType="numeric"
              onChangeText={setText}
              value={text}
              autoFocus
              style={{
                color: "white",
                fontSize: 28,
                fontWeight: "500",
              }}
            />

            <Text className="font-semibold text-base text-white">
              {measurement.metricName}
            </Text>
            {text && parseInt(text) > 0 ? (
              <Ionicons
                onPress={handleMeasureChange}
                name="checkmark-circle-outline"
                color="white"
                size={40}
                style={{ position: "absolute", top: "50%", right: "30%" }}
              />
            ) : (
              <Ionicons
                name="close-circle-outline"
                color="red"
                size={40}
                style={{ position: "absolute", top: 12, right: 14 }}
              />
            )}
          </TouchableOpacity>
        </LinearGradient>
      </>
    );
  }
);

export default UsersMeasurement;
