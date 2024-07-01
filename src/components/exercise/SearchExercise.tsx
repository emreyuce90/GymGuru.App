import { View, Text, TextInput, Pressable } from "react-native";
import React, { useCallback, useState } from "react";
import useDebounce from "../../../lib/@core/hooks/useDebounce";
import { Ionicons } from "@expo/vector-icons";

type SearchComponentType = {
  onChange: (value: string) => void;
};

const SearchExercise = (props: SearchComponentType) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearch = useDebounce((v) => props.onChange(v), 250);

  const handleChange = useCallback((value: string) => {
    setSearchTerm(value);
    handleSearch(value);
  }, []);

  return (
    <View className="bg-[#f2f2f2]">
      <View className="bg-white flex flex-row items-center rounded px-1 my-1 pl-4 ">
        <Ionicons
          className="ml-2"
          name="search-outline"
          size={24}
          color="black"
        />
        <TextInput
          className="flex-1 px-5 py-2 text-base"
          placeholder="Hareket ara"
          value={searchTerm}
          onChangeText={handleChange}
        />
        {searchTerm?.length > 0 && (
          <Pressable onPress={() => handleChange("")}>
            <View className="px-2">
              <Ionicons
                className="ml-2"
                name="close-outline"
                size={24}
                color="black"
              />
            </View>
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default SearchExercise;
