import { ScrollView, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { applicationColors } from "../../utils/types/constants";
import CustomInput from "../auth/components/CustomInput";
import { useCallback, useState } from "react";
import ReusableRadioButton from "./ReusableRadioButton";
import CustomButton from "../auth/components/CustomButton";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useNavigation } from "@react-navigation/native";

const NutritionPlan = () => {
  const navigation = useNavigation<any>();

  const [height, setHeight] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [selectedValue, setSelectedValue] = useState("");
  const [calories, setCalories] = useState<string>("");
  const [aim, setAim] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [gender, setGender] = useState<string>("");

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

  const handleYear = (value: string) => {
    const regex = /^[0-9]*\.?[0-9]*$/;
    if (regex.test(value)) {
      setYear(value);
    }
  };

  const handleRadioPress = (value: string) => {
    setSelectedValue(value);
  };

  const handleCalories = (value: string) => {
    const regex = /^[0-9]*\.?[0-9]*$/;
    if (regex.test(value)) {
      setCalories(value);
    }
  };

  const handleAim = (value: string) => {
    setAim(value);
  };
  const isDisabled =
    !height ||
    !weight ||
    !aim ||
    !year ||
    loading ||
    !calories ||
    !selectedValue ||
    !gender;

  const handleButtonPressed = async () => {
    if (!isDisabled) {
      const prompt = ` Türkiye'de yaşayan ${year} yaşında ${height} cm boyunda ${weight} kilo ${selectedValue} ve amacı ${aim} olan  bir ${gender} için  ${calories} kalorilik bir üç öğünden oluşan bir haftalık kişiselleştirilmiş bir diyet listesi yazar mısın? `;

      const genAI = new GoogleGenerativeAI(
        "AIzaSyDxrQahA5AFLndA-BRoGxBAJXk3K8BLLbg"
      );
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      try {
        setLoading(true);
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        navigation.navigate("Result", { nutritionPlan: text });
      } catch (error) {
        console.error("Error generating nutrition plan:", error);
        alert(
          "Beslenme planı oluşturulurken bir hata oluştu. Lütfen tekrar deneyin."
        );
      } finally {
        setLoading(false);
      }
    }
  };

  const handleGender = (value: string) => {
    setGender(value);
  };

  return (
    <ScrollView>
      <View className="flex p-10 mt-10">
        {/* Beslenme programı oluşturma yazısı */}
        <View className="flex flex-row justify-between items-center space-x-4">
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
        {/* Amaç */}

        {/* Inputlar */}
        <View className="flex flex-row justify-between items-center mt-4">
          <View className="flex flex-row items-center space-x-2">
            <CustomInput
              width={20}
              keyboardType="numeric"
              placeholder="Boy"
              value={height}
              setValue={handleHeight}
            />
            <Text className="text-base">cm</Text>
          </View>
          <View className="flex flex-row items-center space-x-2">
            <CustomInput
              width={20}
              keyboardType="numeric"
              placeholder="Kilo"
              value={weight}
              setValue={handleWeight}
            />
            <Text className="text-base">kg</Text>
          </View>
          <CustomInput
            width={20}
            keyboardType="numeric"
            placeholder="Yaş"
            value={year}
            setValue={handleYear}
          />
        </View>
        <Text className="font-semibold text-gray-600 text-lg mt-4 ">
          Cinsiyet
        </Text>
        <View className="flex flex-row mt-2">
          <ReusableRadioButton
            label="Erkek"
            value="Erkek"
            selectedValue={gender}
            onPress={handleGender}
          />
          <ReusableRadioButton
            label="Kadın"
            value="Kadın"
            selectedValue={gender}
            onPress={handleGender}
          />
        </View>
        {/* Aktivite */}
        <Text className="font-semibold text-gray-600 text-lg mt-4 ">
          Aktivite Durumu
        </Text>
        <View className="flex flex-row mt-4">
          <ReusableRadioButton
            label="Sedanter"
            value="Sedanter"
            selectedValue={selectedValue}
            onPress={handleRadioPress}
          />
          <ReusableRadioButton
            label="Aktif"
            value="Aktif"
            selectedValue={selectedValue}
            onPress={handleRadioPress}
          />
          <ReusableRadioButton
            label="Çok aktif"
            value="Çok aktif"
            selectedValue={selectedValue}
            onPress={handleRadioPress}
          />
        </View>
        {/* Kalori */}
        <Text className="font-semibold text-gray-600 text-lg mt-4 ">
          Kalori
        </Text>
        <CustomInput
          placeholder=" örn. 1600"
          value={calories}
          setValue={handleCalories}
          keyboardType="numeric"
        />
        {/* Amaç */}
        <Text className="font-semibold text-gray-600 text-lg mt-4 ">Amaç</Text>
        <View className="flex flex-row mt-2">
          <ReusableRadioButton
            label="Kas Gelişimi"
            value="Kas Gelişimi"
            selectedValue={aim}
            onPress={handleAim}
          />
          <ReusableRadioButton
            label="Yağ Yakımı"
            value="Yağ Yakımı"
            selectedValue={aim}
            onPress={handleAim}
          />
        </View>
        <View></View>
      </View>
      <CustomButton
        type={isDisabled ? "disabled" : "primary"}
        loading={loading}
        text="Beslenme Programımı Oluştur"
        onPress={handleButtonPressed}
      />
    </ScrollView>
  );
};

export default NutritionPlan;
