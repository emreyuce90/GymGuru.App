import { useRoute } from "@react-navigation/native";
import { ScrollView, View, Text } from "react-native";
import CustomInput from "../auth/components/CustomInput";
import CustomButton from "../auth/components/CustomButton";
import { Button, Clipboard } from "react-native";

const Result = () => {
  const route = useRoute();
  const { nutritionPlan } = route.params as any;

  return (
    <ScrollView className="flex-1 m-12">
      <Text>{nutritionPlan}</Text>
      <View className="px-12">
        <CustomButton
          text="Kopyala"
          onPress={() => Clipboard.setString(nutritionPlan)}
          type="primary"
        />
      </View>
    </ScrollView>
  );
};

export default Result;
