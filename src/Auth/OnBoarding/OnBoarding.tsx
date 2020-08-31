import React, { useRef } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Animated,
  ScrollView,
} from "react-native";

import Slide, { SLIDE_HEIGHT } from "./Slide";
import SubSlide from "./SubSlide";

const { width } = Dimensions.get("window");
export const BORDER_RADIUS = 75;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  slider: {
    height: SLIDE_HEIGHT,
    borderBottomRightRadius: BORDER_RADIUS,
  },
  footer: {
    flex: 1,
  },
  footerContent: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "white",
    borderTopLeftRadius: BORDER_RADIUS,
  },
});
const slides = [
  {
    title: "Relaxed",
    color: "#BFEAF5",
    right: false,
    subtitle: "Find Your Outfits",
    description:
      "Top university in innovation to improve students’ educational experience",
  },
  {
    title: "Playful",
    color: "#BEECC4",
    right: true,
    subtitle: "Start in January",
    description:
      "High quality teaching, ranked in the top 6 national universities for undergraduate teaching",
  },
  {
    title: "Excentric",
    color: "#FFE4D9",
    right: false,
    subtitle: "Close to Washington",
    description:
      "Special admission opportunities to UMBC undergraduate programs without a TOEFL score",
  },
  {
    title: "Funky",
    color: "#FFDDDD",
    right: true,
    subtitle: "Free individual",
    description: "Well qualified instructors with TESOL background",
  },
];

const OnBoarding = () => {
  const scroll = useRef<ScrollView>(null);
  const x = new Animated.Value(0);
  const backgroundColor = x.interpolate({
    inputRange: slides.map((_, i) => i * width),
    outputRange: slides.map((slide) => slide.color),
  });
  const translateX = x.interpolate({
    inputRange: slides.map((_, i) => i * width),
    outputRange: slides.map((_, i) => i * -width),
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.slider, { backgroundColor }]}>
        <Animated.ScrollView
          ref={scroll}
          horizontal
          bounces={false}
          snapToInterval={width}
          decelerationRate="fast"
          scrollEventThrottle={1}
          disableIntervalMomentum={true}
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x } } }],
            { useNativeDriver: false }
          )}
        >
          {slides.map((slide) => (
            <Slide key={slide.title} title={slide.title} right={slide.right} />
          ))}
        </Animated.ScrollView>
      </Animated.View>
      <View style={styles.footer}>
        <Animated.View style={[StyleSheet.absoluteFill, { backgroundColor }]} />
        <Animated.View
          style={[
            styles.footerContent,
            {
              width: width * slides.length,
              flex: 1,
              transform: [{ translateX }],
            },
          ]}
        >
          {slides.map(({ subtitle, description }, index) => (
            <SubSlide
              key={index}
              {...{ subtitle, description }}
              last={index === slides.length - 1}
              onPress={() => {
                if (scroll.current) {
                  scroll.current.scrollTo({
                    x: width * (index + 1),
                    y: 0,
                    animated: true,
                  });
                }
              }}
            />
          ))}
        </Animated.View>
      </View>
    </View>
  );
};

export default OnBoarding;
