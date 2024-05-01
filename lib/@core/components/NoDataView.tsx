//import { useTranslation } from 'react-i18next';
import { Text, View } from "react-native";

type NoDataViewProps = {
  message?: string;
};

const NoDataView = (props: NoDataViewProps) => {
  //const { t } = useTranslation();
  return (
    <View className="flex-1 pt-24 px-5 items-center justify-center">
      <Text className="text-[#FF6346]">{props.message ?? "No Data"}</Text>
    </View>
  );
};

export default NoDataView;
