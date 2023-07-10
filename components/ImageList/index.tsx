import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
  StatusBar,
} from "react-native";
import { useState } from "react";
import { Image } from "expo-image";

import { ImagePreviewModal } from "../ImagePreviewModal";
import { SafeAreaView } from "react-native-safe-area-context";

const WINDOW_WIDTH = Dimensions.get("window").width;

export const ImageList = () => {
  const images = [
    "https://picsum.photos/id/13/750/750",
    "https://picsum.photos/id/14/750/750",
  ];
  const [currentPage, setCurrentPage] = useState(1);
  const [previewImageUri, setPreviewImageUri] = useState<string | null>(null);

  const onMomentumScrollEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ): void => {
    const scrollX = event.nativeEvent.contentOffset.x;
    const page = Math.round(scrollX / WINDOW_WIDTH) + 1;
    setCurrentPage(page);
  };
  const onPressImage = (uri: string): void => {
    setPreviewImageUri(uri);
  };
  const width = (images.length * 2 - 1) * 8;
  const listIndicatorStyle = [styles.listIndicator, { width }];
  return (
    <SafeAreaView style={styles.container}>
      <ImagePreviewModal
        imageUri={previewImageUri}
        onRequestClose={() => setPreviewImageUri(null)}
      />
      <Text>image preview modal demo</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onMomentumScrollEnd={onMomentumScrollEnd}
        style={styles.scrollContainer}
      >
        {images.map((uri) => (
          <TouchableWithoutFeedback onPress={() => onPressImage(uri)} key={uri}>
            <Image source={uri} style={styles.image} />
          </TouchableWithoutFeedback>
        ))}
      </ScrollView>
      <View style={listIndicatorStyle}>
        {[...Array(images.length).keys()].map((i) => {
          const isActive = i === currentPage - 1;
          const unitStyle = [
            styles.indicatorItem,
            isActive && styles.activeIndicatorItem,
          ];
          return <View key={i} style={unitStyle} />;
        })}
      </View>
      <StatusBar barStyle="dark-content" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  scrollContainer: {
    flexGrow: 0,
    height: WINDOW_WIDTH,
  },
  image: {
    width: WINDOW_WIDTH,
    height: WINDOW_WIDTH,
  },
  listIndicator: {
    marginTop: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  indicatorItem: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: "#00000015",
    borderWidth: 1,
    borderColor: "#ffffff80",
  },
  activeIndicatorItem: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: "#333",
  },
});
