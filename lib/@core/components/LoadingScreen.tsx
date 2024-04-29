import React, { useState } from "react";
import { ActivityIndicator, View, Text } from "react-native";
//import { useTranslation } from 'react-i18next';
import useTimeout from "../hooks/useTimeout";

const LoadingScreen = (props: {
  hideText?: boolean;
  text?: string;
  delay?: number;
}) => {
  const { delay = 0, hideText, text } = props;
  //const { t } = useTranslation();
  const [showLoading, setShowLoading] = useState(!delay);

  useTimeout(() => {
    setShowLoading(true);
  }, delay);

  return (
    <View
      className={
        "flex-1 justify-center items-center opacity-80 " +
        (!showLoading ? "hidden" : "")
      }
    >
      {!hideText && <Text className="text-lg mb-8">{text ?? "Loading"}</Text>}
      <ActivityIndicator size="large" color="#3b82f6" />
    </View>
  );
};

export default LoadingScreen;
