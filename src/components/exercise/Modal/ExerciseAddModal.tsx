import { View, Text, Modal, Image, Pressable, ScrollView } from "react-native";
import React, { useCallback } from "react";
import { useNavigation } from "@react-navigation/native";

type ExerciseAddModalPropTypes = {
  checkedMovements: IMovement[];
  index: number;
  from: string;
};

const ExerciseAddModal = (props: ExerciseAddModalPropTypes) => {
  const navigation = useNavigation<any>();
  const { checkedMovements, index, from } = props;

  const handleGoBack = () => {
    if (from === "AddNewProgramme") {
      navigation.navigate("AddNewProgramme", {
        checkedMovements: checkedMovements,
        index: index,
      });
    } else if (from === "Workouts") {
      navigation.navigate("Workouts", {
        checkedMovements: checkedMovements,
      });
    } else {
      navigation.goBack();
    }
  };

  {
    return (
      checkedMovements.length > 0 && (
        <View className="absolute bottom-0 w-full bg-slate-50 p-2">
          <View className="flex flex-col mb-2">
            <Text className="text-lg text-slate-500 mb-3 pl-2">
              Eklenecek olan egzersizler:
            </Text>
            <ScrollView
              horizontal={true}
              className="flex flex-row mb-2 mt-2 space-x-2"
            >
              {checkedMovements.map((c, i) => {
                return (
                  <Image
                    key={i}
                    className="rounded-full p-1"
                    width={60}
                    height={60}
                    source={{
                      uri: `https://api.gymguru.com.tr/api.gymguru.com.tr/images/${c.imageUrl}`,
                    }}
                  />
                );
              })}
            </ScrollView>
          </View>
          <Pressable onPress={handleGoBack}>
            <View className="bg-[#ff6145] flex items-center p-2 rounded-xl">
              <Text className="font-bold text-xl text-white">{`+${checkedMovements?.length} Egzersiz Ekle`}</Text>
            </View>
          </Pressable>
        </View>
      )
    );
  }
};

export default React.memo(ExerciseAddModal);
