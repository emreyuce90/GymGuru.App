//import { useTranslation } from 'react-i18next';
import { Text, View } from "react-native";

type NoDataViewProps = {
  message?: string;
};

const NoDataView = (props: NoDataViewProps) => {
  //const { t } = useTranslation();
  return (
    <View className="flex pt-24 px-5 items-center">
      <Text className="text-red-700">{t(props.message ?? "No Data")}</Text>
    </View>
  );
};

export default NoDataView;
