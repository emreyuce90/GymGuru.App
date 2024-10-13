import { View, Text, FlatList, SafeAreaView } from "react-native";
import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import useMovements from "../movement/hooks/useMovements";
import LoadingScreen from "../../../lib/@core/components/LoadingScreen";
import NoDataView from "../../../lib/@core/components/NoDataView";
import AddExercise from "../../components/exercise/AddExercise";
import ExerciseAddModal from "../../components/exercise/Modal/ExerciseAddModal";
import SearchExercise from "../../components/exercise/SearchExercise";

function HeaderTitle() {
  return (
    <SafeAreaView className="flex flex-row w-screen">
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
  //TODO:Hareketleri hooktan değil contextten oku!
  const { movements, loading, error } = useMovements();
  const [allMovements, setAllMovements] = useState<IMovement[]>([]);
  const { movementIds, index, from } = route.params as any;
  const [text, setText] = useState<string>("");

  const filteredMovements = useMemo(() => {
    if (!allMovements || !movementIds) {
      return [];
    }

    if (!text.trim()) {
      return allMovements
        .filter((m) => !movementIds.some((i: string) => i === m.id))
        .sort((a, b) => a.title.localeCompare(b.title));
    }

    return allMovements
      .filter((m) => !movementIds.some((i: string) => i === m.id))
      .filter((m) =>
        m.title.toLocaleLowerCase().includes(text.toLocaleLowerCase())
      )
      .sort((a, b) => a.title.localeCompare(b.title));
  }, [text, movementIds, allMovements]);

  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
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

  return (
    <>
      <View className="">
        {allMovements ? (
          <>
            <FlatList
              // ListHeaderComponent={<SearchExercises />}

              initialNumToRender={10}
              maxToRenderPerBatch={10}
              updateCellsBatchingPeriod={50}
              contentContainerStyle={{ paddingBottom: 32 }}
              ListHeaderComponent={<SearchExercise onChange={setText} />}
              stickyHeaderIndices={[0]}
              data={filteredMovements}
              renderItem={({ item }) => (
                <AddExercise
                  exercise={item}
                  handleItemStatusChange={handleItemStatusChange}
                />
              )}
              keyExtractor={(item) => item.id}
            />
            <ExerciseAddModal
              from={from}
              index={index}
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
