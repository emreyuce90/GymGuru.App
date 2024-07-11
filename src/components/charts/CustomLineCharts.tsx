import { View, Dimensions } from "react-native";
import React from "react";
import { LineChart } from "react-native-gifted-charts";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

type CustomLineChartsPropTypes = {
  data: IUserMetricLog[] | undefined;
};

const CustomLineCharts = (props: CustomLineChartsPropTypes) => {
  const { data } = props;

  const chartData = data?.reduce(
    (acc: { value: number }[], curr: IUserMetricLog) => {
      acc.push({ value: curr.value });
      return acc;
    },
    []
  );

  return (
    <View
      style={{
        marginTop: wp(8),
        padding: 10, // Padding ekleyerek boşluk bırakma
        flex: 1,
        justifyContent: "center", // Dikey merkezleme
        alignItems: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      <LineChart
        dataPointsColor="#FF8265"
        width={wp(90)} // Genişliği biraz daraltarak ortalama
        height={220} // Yüksekliği belirleyerek görseli ortalama
        animationDuration={1200}
        isAnimated
        curved
        areaChart
        data={chartData}
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
        dataPointsHeight={10} // Data points height
        dataPointsWidth={10} // Data points width
        dataPointsRadius={5} // Data points radius
        xAxisLabelTextStyle={{ fontSize: 16, color: "#000" }} // X axis labels style
        // Y axis labels style
        textFontSize={20} // General text font size
        // General text font color
      />
    </View>
  );
};

export default CustomLineCharts;
