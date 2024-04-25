import { Text, FlatList } from "react-native";
import React from "react";
import Movement from "../../components/workout/Movement";

type MovementPropTypes = {
  movements: IMovement[];
};

const Movements = (props: MovementPropTypes) => {
  return (
    <FlatList
      data={props.movements}
      renderItem={({ item }: { item: IMovement }) => (
        <Movement movement={item} />
      )}
    />
  );
};

export default Movements;
