import { View, Dimensions, StyleSheet, Text } from "react-native";
import React from "react";
import { LineChart } from "react-native-gifted-charts";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import moment from "moment";

type CustomLineChartsPropTypes = {
  data: IUserMetricLog[] | undefined;
};

const CustomLineCharts = (props: CustomLineChartsPropTypes) => {
  const { data } = props;

  const chartData = data?.reduce((acc: any, curr: IUserMetricLog) => {
    acc.push({
      value: curr.value,
      label: moment(curr.createdDate).format("DD-MMM"),
    });
    return acc;
  }, []);
  console.log("data", data);
  return (
    <View
      style={{
        padding: 10, // Padding ekleyerek boşluk bırakma
        flex: 1,
        justifyContent: "center", // Dikey merkezleme
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <Text className=" text-xl font-bold text-black mt-6 mb-6">
        Zamana göre ölçü değişim grafiği
      </Text>

      <LineChart
        backgroundColor={"white"}
        hideRules
        color="#FE5B61"
        dataPointsColor="#FE5B61"
        dataPointsRadius={4}
        width={wp(90)} // Genişliği biraz daraltarak ortalama
        height={220} // Yüksekliği belirleyerek görseli ortalama
        animationDuration={1200}
        isAnimated
        curved
        areaChart
        data={chartData?.reverse()}
        startFillColor="#FFDCDC"
        startOpacity={1}
        endFillColor="#f5f5f5"
        endOpacity={0.3}
        initialSpacing={30}
        thickness={2}
        yAxisTextStyle={{ color: "gray" }}
        yAxisColor="#FFDCDC"
        xAxisColor="#FFDCDC"
        showValuesAsDataPointsText
        dataPointsHeight={20}
        dataPointsWidth={10}
        xAxisLabelTextStyle={{ fontSize: 12, color: "grey" }}
        xAxisThickness={2}
        textFontSize={16}
      />
    </View>
  );
};

export default CustomLineCharts;
