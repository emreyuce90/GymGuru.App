import { View, Text, Dimensions } from "react-native";
import React from "react";
import { LineChart } from "react-native-gifted-charts";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

const CustomLineCharts = (props: any) => {
  const data = [
    { value: 15 },
    { value: 30 },
    { value: 26 },
    { value: 40 },
    { value: 15 },
    { value: 30 },
    { value: 26 },
    { value: 40 },
    { value: 15 },
    { value: 30 },
    { value: 26 },
    { value: 40 },
    { value: 15 },
    { value: 30 },
    { value: 26 },
    { value: 40 },
    { value: 15 },
    { value: 30 },
    { value: 26 },
    { value: 40 },
    { value: 15 },
    { value: 30 },
    { value: 26 },
    { value: 40 },
    { value: 15 },
    { value: 30 },
    { value: 26 },
    { value: 40 },
    { value: 15 },
    { value: 30 },
    { value: 26 },
    { value: 40 },
  ];

  return (
    <View
      style={{
        marginTop: wp(8),
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      <LineChart
        dataPointsColor="#f5f5f5"
        width={wp(100)}
        animationDuration={1200}
        isAnimated
        curved
        areaChart
        data={data}
        startFillColor="#FF8265"
        startOpacity={1}
        endFillColor="#f5f5f5"
        endOpacity={0.3}
        initialSpacing={0}
        thickness={2}
        yAxisColor="#FF8265"
        color="#FF8265"
        xAxisColor="#FF8265"
        showValuesAsDataPointsText
        dataPointsHeight={20}
      />
    </View>
  );
};

export default CustomLineCharts;
