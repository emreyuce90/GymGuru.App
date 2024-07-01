import { View, Text, FlatList, SafeAreaView } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import useMovements from "../movement/hooks/useMovements";
import LoadingScreen from "../../../lib/@core/components/LoadingScreen";
import ErrorScreen from "../../../lib/@core/components/ErrorScreen";
import NoDataView from "../../../lib/@core/components/NoDataView";
import AddExercise from "../../components/exercise/AddExercise";
import ExerciseAddModal from "../../components/exercise/Modal/ExerciseAddModal";

function HeaderTitle() {
  return (
    <SafeAreaView className="flex flex-col w-screen">
      <View>
        <Text className="font-bold text-xl mx-auto text-white">
          Egzersiz Ekle
        </Text>
      </View>
    </SafeAreaView>
  );
}

const AddExercises = () => {
  const route = useRoute();
  const { movements, loading, error } = useMovements();
  const [allMovements, setAllMovements] = useState<IMovement[]>([]);
  const { movementIds } = route.params as any;
  console.log("allMovements", movementIds);

  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: null,
      headerStyle: {
        backgroundColor: "#ff6145",
        height: 100,
      },
      headerTitle: (props: any) => <HeaderTitle {...props} />,
    });
  });

  const handleItemStatusChange = (item: IMovement) => {
    setAllMovements((prev) => {
      const copy = [...prev];
      //find the changed movements
      const m = copy.find((mov) => mov.id === item.id);
      //movement'ın checked olma durumunu mevcudun tersi yap
      if (m !== undefined) {
        m.isChecked = !m.isChecked;
        return copy;
      }
      return copy;
    });
  };

  useEffect(() => {
    if (movements) {
      setAllMovements((prev) => {
        return movements.map((m) => {
          return { ...m, isChecked: false };
        });
      });
    }
  }, [movements]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ErrorScreen error={error} />;
  }

  return (
    <>
      <View className="flex-1">
        {allMovements ? (
          <>
            <FlatList
              contentContainerStyle={{ paddingBottom: 32 }}
              data={allMovements
                .filter((m) => !movementIds.some((i: string) => i === m.id))
                .sort((a, b) => a.title.localeCompare(b.title))}
              renderItem={({ item }) => (
                <AddExercise
                  exercise={item}
                  handleItemStatusChange={handleItemStatusChange}
                />
              )}
              keyExtractor={(item) => item.id}
            />
            <ExerciseAddModal
              checkedMovements={allMovements.filter(
                (m) => m.isChecked === true
              )}
            />
          </>
        ) : (
          <NoDataView />
        )}
      </View>
    </>
  );
};

export default AddExercises;
