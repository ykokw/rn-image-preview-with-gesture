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

import { ImagePreviewModal } from "./components/ImagePreviewModal";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ImageList } from "./components/ImageList";


export default function App() {
  return (
    <SafeAreaProvider>
      <ImageList />
    </SafeAreaProvider>
  );
}
