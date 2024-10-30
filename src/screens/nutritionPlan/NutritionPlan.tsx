import { ScrollView, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { applicationColors } from "../../utils/types/constants";
import CustomInput from "../auth/components/CustomInput";
import { useState } from "react";

const NutritionPlan = () => {
  const [height, setHeight] = useState<string>("");
  const [weight, setWeight] = useState<string>("");

  const handleHeight = (value: string) => {
    const regex = /^[0-9]*\.?[0-9]*$/;
    if (regex.test(value)) {
      setHeight(value);
    }
  };

  const handleWeight = (value: string) => {
    const regex = /^[0-9]*\.?[0-9]*$/;
    if (regex.test(value)) {
      setWeight(value);
    }
  };
  return (
    <ScrollView>
      <View className="flex p-10 mt-10">
        {/* Beslenme programı oluşturma yazısı */}
        <View className="flex flex-row justify-between items-center px-4">
          <Text className="font-semibold text-gray-600 text-lg ">
            AI ile haftalık kişiselleştirilmiş beslenme programını oluştur
          </Text>
          <Ionicons
            name="nutrition-outline"
            size={36}
            color={`${applicationColors.ButtonColor}`}
          />
        </View>
        <View className="border mt-8 border-gray-300"></View>
        <View className="flex flex-row justify-between items-center">
          <CustomInput
            keyboardType="numeric"
            placeholder="Boy"
            value={height}
            setValue={handleHeight}
          />
          <CustomInput
            keyboardType="numeric"
            placeholder="Kilo"
            value={weight}
            setValue={handleWeight}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default NutritionPlan;
