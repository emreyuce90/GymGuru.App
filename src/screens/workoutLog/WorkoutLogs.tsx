import { View, Text, Image, Pressable, FlatList } from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import NoDataView from "../../../lib/@core/components/NoDataView";
import WorkoutLog from "../../components/workoutLog/WorkoutLog";

/*
Konfeti patlama efekti
  1- 9.antrenmanınız tamamlandı
  Bu bilgiyi geçmek için bu ekrana gelmeden evvel son yapılan requesste kullanıcının antrenmanlarına count atılır buraya prop olarak geçilir
  2- Antrenman adı yine üst componentten geçilir . Örn: FullBody | 1. Gün
  3- Antrenman hacmi , tüm antrenmandaki set sayıları ile kg çarpılarak hacim elde edilir
  4-Duration bilgisi üst componentten gelir
  5-Tarih o günkü tarihten elde edilir propa gerek yok
  6-FlatList tanımlanır flat list içerisine antrenmandaki hareket adı set sayıları ve tekrar sayıları verilir   
*/

const calculateVolume = (data: IWorkout[]): number => {
  return data.reduce((total, movement) => {
    const movements = movement.movementSets.reduce((subTotal, set) => {
      return (subTotal += set.reps * set.weight);
    }, 0);
    return total + movements;
  }, 0);
};

function HeaderTitle() {
  return (
    <View className="flex flex-row items-center justify-between">
      <View className="flex flex-col">
        <Text className="text-base text-white">Harika!</Text>
        <Text className="text-xl font-extrabold text-white">
          9.ANTRENMANINIZI
        </Text>
        <Text className="text-xl font-extrabold text-white">
          TAMAMLANDINIZ!
        </Text>
      </View>
      <View className="flex items-center justify-center w-full pr-20">
        <Image
          source={require("../../../assets/images/workoutLog/prize.png")}
          style={{ width: 150, height: 150 }}
          resizeMode="cover"
        />
      </View>
    </View>
  );
}

const WorkoutLogs = () => {
  const route = useRoute();
  const { workout, duration, workoutName, workoutCount } = route.params as any;
  console.log("workout", workout);
  //volume
  //date , o anki tarih formatlı bir şekilde elde edilir
  const navigation = useNavigation<any>();
  useLayoutEffect(() => {
    navigation.setOptions({
      style: {},
      headerLeft: null,
      headerStyle: {
        backgroundColor: "#ff6145",
        height: 200,
      },
      headerTitle: (props: any) => <HeaderTitle {...props} />,
    });
  }, [navigation]);

  return (
    <View className="flex-1 justify-between">
      <View className="bg-white flex flex=col px-7 py-5">
        <View className="flex flex-col space-y-4">
          <Text className="font-bold text-2xl">{`${workoutName} Programı`}</Text>
          <View className="flex flex-row justify-between items-center">
            <View className="flex flex-col items-center justify-center">
              <Text className="font-extrabold text-2xl">{`${calculateVolume(
                workout
              )}kg`}</Text>
              <Text className="text-base">Hacim</Text>
            </View>
            <View className="flex flex-col items-center justify-center">
              <Text className="font-extrabold text-2xl">34:00</Text>
              <Text className="text-base">Süre</Text>
            </View>
            <View className="flex flex-col items-center justify-center">
              <Text className="font-extrabold text-2xl">27 May</Text>
              <Text className="text-base">19:32</Text>
            </View>
          </View>
        </View>
      </View>
      <View className="flex-1">
        {workout ? (
          <FlatList
            data={workout}
            renderItem={({ item }) => (
              <WorkoutLog key={item.movementId} workout={item} />
            )}
            keyExtractor={(w: IWorkout) => w.movementId}
          />
        ) : (
          <NoDataView />
        )}
      </View>
      <Pressable
        onPress={() => {
          navigation.navigate("Home");
        }}
        className={"bg-[#FF6346]"}
      >
        <View className="w-full flex flex-row items-center justify-center  rounded-xl py-3 px-4 space-x-3 mb-2">
          <Text className=" text-white font-bold uppercase text-xl ">
            🏁 BİTTİ
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

export default WorkoutLogs;
