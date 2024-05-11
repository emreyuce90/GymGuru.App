import { View, Text } from "react-native";
import React from "react";
import Carousel, { ParallaxImage } from "react-native-snap-carousel";
import { sliderImages } from "../../utils/types/constants";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

type ItemCardPropTypes = {
  item: any;
  index: number;
};
const ItemCard = ({ item, index }: ItemCardPropTypes, parallaxProps: any) => {
  return (
    <View
      style={{
        width: wp(100 - 20),
        height: hp(30),

        borderRadius: 30, // Burası zaten mevcut, gerekiyorsa düzenleyin
      }}
    >
      <ParallaxImage
        source={item}
        containerStyle={{
          borderRadius: 30,
          flex: 1,
          overflow: "hidden", // Kenarlıkların görünümünü düzeltmek için eklendi
          borderWidth: 2, // İç kenarlık kalınlığı
          borderColor: "#FFFFFF", // İç kenarlık rengi
        }}
        style={{ resizeMode: "contain" }}
        parallaxFactor={1}
        {...parallaxProps}
      />
    </View>
  );
};

const ImageSlider = () => {
  return (
    <Carousel
      data={sliderImages}
      loop
      autoplay
      renderItem={ItemCard as any}
      hasParallaxImages
      sliderWidth={wp(100)}
      firstItem={1}
      autoplayInterval={4000}
      itemWidth={wp(100) - 70}
      slideStyle={{ display: "flex", alignItems: "center" }}
    />
  );
};

export default ImageSlider;
