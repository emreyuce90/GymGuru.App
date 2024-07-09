import { Text, TouchableOpacity, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { Feather, Ionicons } from "@expo/vector-icons";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import Api from "../../../lib/@core/data/Api";
import LoadingScreen from "../../../lib/@core/components/LoadingScreen";

type UsersMeasurementsPropTypes = {
  measurement: IUserMeasurements;
};

const UsersMeasurement = (props: UsersMeasurementsPropTypes) => {
  const width = wp(100);
  const height = wp(40);
  const { measurement } = props;
  const [clicked, setClicked] = useState<boolean>(false);
  const [text, setText] = useState<string>(measurement.value);
  const [loading, setLoading] = useState<boolean>(false);

  const handleMeasureChange = async () => {
    const updateMetricChange = async () => {
      try {
        setLoading(true);
        const response = await Api.post(`/api/Metrics/`, {
          bodymetricId: measurement.bodyMetricsId,
          userId: "7aaf453f-56ea-4f7d-8877-4cec29072bfe",
          value: parseFloat(text),
        });

        if (response.Success) {
          console.log("response.Resource.resource", response.Resource.resource);
          setText(response.Resource.resource.value.toString());
          setClicked((prev) => !prev);
        } else {
          alert(response.Message);
        }
      } catch (error) {
        alert(error);
      } finally {
        setLoading(false);
      }
    };
    if (parseFloat(text) !== parseFloat(measurement.value)) {
      updateMetricChange();
    } else {
      setClicked((prev) => !prev);
    }
  };

  const handleClicked = () => {
    setClicked((prev) => !prev);
  };

  useEffect(() => {
    if (measurement) {
      setText(measurement.value.toString());
    }
  }, [measurement]);

  if (loading) {
    return <LoadingScreen />;
  }

  return !clicked ? (
    <TouchableOpacity
      onPress={handleClicked}
      style={{
        width: width,
        height: height,
      }}
      className="flex bg-white p-4 items-center mt-2 rounded-xl ml-1 justify-center"
    >
      <Text className="font-bold text-2xl">{text}</Text>
      <Text className="">{measurement.metricName}</Text>
      <Feather
        name="edit"
        color="#FF6346"
        size={24}
        style={{ position: "absolute", top: "50%", right: "10%" }}
      />
    </TouchableOpacity>
  ) : (
    <>
      <TouchableOpacity
        onPress={handleMeasureChange}
        style={{
          width: width,
          height: height,
        }}
        className="flex bg-white p-4 items-center mt-2 rounded-xl ml-1 justify-center"
      >
        <Text className="font-bold text-2xl"></Text>
        <TextInput
          keyboardType="numeric"
          onChangeText={setText}
          value={text}
          autoFocus
          style={{
            fontSize: 28,
            fontWeight: "500",
          }}
        />

        <Text className="">{measurement.metricName}</Text>
        {measurement?.value && parseInt(text) > 0 ? (
          <Ionicons
            name="checkmark-circle-outline"
            color="green"
            size={40}
            style={{ position: "absolute", top: 12, right: 14 }}
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
    </>
  );
};

export default UsersMeasurement;
