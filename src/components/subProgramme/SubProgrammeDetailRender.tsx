import { View, Text, Pressable, Image } from "react-native";
import React, { useMemo, useState } from "react";
import { Bounceable } from "rn-bounceable";
import { Ionicons } from "@expo/vector-icons";
import YoutubeIframe from "react-native-youtube-iframe";

type SubProgrammeDetailPropTypes = {
  movement: ISubProgrammeMovement;
};

const SubProgrammeDetailRender = (props: SubProgrammeDetailPropTypes) => {
  const [isOpened, setIsOpened] = useState(false);
  const { reps, sets, movement } = props.movement;

  return (
    <View>
      <Pressable
        onPress={() => {
          setIsOpened((prev) => !prev);
        }}
      >
        <View className="mb-1 mt-1 px-5">
          <Bounceable onPress={() => {}}>
            <View className="bg-white p-5 flex flex-row justify-between items-center  rounded-lg ">
              <View>
                <Ionicons name="menu" color={"#FF6346"} size={20} />
              </View>
              <View className="bg-[#ff8a76] rounded-full ml-2">
                <Image
                  style={{ borderRadius: 50, padding: 3 }}
                  width={70}
                  height={70}
                  source={{
                    uri: `https://api.gymguru.com.tr/api.gymguru.com.tr/images/${movement.imageUrl}`,
                  }}
                />
              </View>
              <View className="ml-3 flex flex-1">
                <Text className="text-base text-[#696969]">
                  {movement.title}
                </Text>
              </View>
              <View className="ml-3 flex flex-1">
                <Text className="text-base text-[#696969]">{`${sets} x ${reps}`}</Text>
              </View>
              {movement.videoUrl && (
                <Ionicons name="chevron-down" color={"#FF6346"} size={20} />
              )}
            </View>
          </Bounceable>
        </View>
      </Pressable>
      {isOpened && movement?.videoUrl && (
        <View>
          <YoutubeIframe
            height={250}
            width={400}
            videoId={movement?.videoUrl}
          />
        </View>
      )}
    </View>
  );
};

export default SubProgrammeDetailRender;
