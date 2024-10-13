import {
  View,
  Text,
  FlatList,
  ScrollView,
  Pressable,
  Alert,
} from "react-native";
import React, { useCallback, useEffect, useRef } from "react";
import Programme from "../../components/programme/Programme";
import { Bounceable } from "rn-bounceable";
import { Ionicons } from "@expo/vector-icons";
import useProgrammes from "./hooks/useProgrammes";
import LoadingScreen from "../../../lib/@core/components/LoadingScreen";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import { movementIds } from "../../components/workout";
import { Swipeable } from "react-native-gesture-handler";
import { deleteProgramme } from "./hooks";

const Programmes = () => {
  const { programmes, loading, error, fetchData } = useProgrammes();
  const navigation = useNavigation<any>();
  const swipeableRefs = useRef<any>([]);

  const rightSwipeActions = (
    // spIndex: number,
    // index: number,
    // swipeableRef: any,
    programmeId: string
  ) => {
    return (
      <Pressable
        className="flex-row items-center justify-center bg-red-500 rounded-md px-3 mt-2 mr-1"
        onPress={() => {
          //programların içerisinden sp bul
          if (programmeId) {
            handleDelete(programmeId);
          }
          // swipeableRef.current?.close();
        }}
      >
        <Ionicons name="remove-circle-outline" size={24} color="white" />
        <Text className="font-bold text-white">Sil</Text>
      </Pressable>
    );
  };

  const handleDelete = async (programmeId: string) => {
    try {
      const isSuccess: boolean = await deleteProgramme(programmeId);
      if (isSuccess) {
        await fetchData();
      } else {
        Alert.alert("Silme işlemi esnasında bir hata meydana geldi");
      }
    } catch (error) {
      Alert.alert(`Bir hata meydana geldi`);
    }
  };

  useFocusEffect(
    useCallback(() => {
      // Sayfa odaklandığında veriyi çek
      fetchData();
    }, [])
  );
  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <View>
      <FlatList
        className="mt-12"
        data={programmes}
        renderItem={({ item, index }) => (
          <Swipeable renderRightActions={() => rightSwipeActions(item.id)}>
            <Programme key={index} programme={item} index={index} />
          </Swipeable>
        )}
        keyExtractor={(item) => item.id}
      />

      <Animated.View
        entering={FadeInDown.duration(600)
          .delay((programmes.length + 1) * 200)
          .springify()}
      >
        <Pressable
          onPress={() => {
            navigation.navigate("AddNewProgramme");
          }}
        >
          <View className="mb-1 mt-1 px-5">
            <Bounceable
            // onPress={() => {
            //   navigation.navigate("AddExercises", { movementIds: [] });
            // }}
            >
              <View className=" bg-[#FF6346] p-5 flex flex-row justify-between items-center  rounded-lg ">
                <View className="ml-3 flex flex-row items-center gap-2">
                  <Ionicons name="add-circle" size={40} color={"white"} />
                  <Text className="text-base text-white">
                    Yeni Program Ekle
                  </Text>
                </View>
              </View>
            </Bounceable>
          </View>
        </Pressable>
      </Animated.View>
    </View>
  );
};

export default Programmes;
