import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

type SubBodyPartPropTypes = {
  subBodyPart: ISubBodyPart;
};

const SubBodyPart = (props: SubBodyPartPropTypes) => {
  const { subBodyPart } = props;
  return (
    <TouchableOpacity onPress={() => {}}>
      <Text className="px-5 py-2 text-lg text-gray-700 bg-gray-200 rounded-full ml-4">
        {subBodyPart.name}
      </Text>
      {/* <Text className="px-5 py-2 ml-4 text-lg text-white bg-indigo-500 rounded-full shadow-md">
        {subBodyPart.name}
      </Text> */}
    </TouchableOpacity>
  );
};

export default SubBodyPart;
