import { Modal, Pressable, StyleSheet, View } from "react-native";
import {
  GestureDetector,
  gestureHandlerRootHOC,
} from "react-native-gesture-handler";
import AntIcon from "@expo/vector-icons/AntDesign";
import Animated from "react-native-reanimated";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useGestureHandler } from "./useGestureHandler";

type Props = {
  imageUri: string | null;
  onRequestClose: () => void;
};

const ModalContents = gestureHandlerRootHOC(
  ({ imageUri, onRequestClose }: Props) => {
    const inset = useSafeAreaInsets();

    const { gesture, animatedStyle, reset } = useGestureHandler();
    const onClose = () => {
      onRequestClose();
      reset();
    };
    return (
      <SafeAreaView style={styles.container}>
        {imageUri !== null && (
          <View style={styles.imageContainer}>
            <GestureDetector gesture={gesture}>
              <Animated.Image
                source={{ uri: imageUri }}
                resizeMode="contain"
                style={[styles.image, animatedStyle]}
                testID="preview-image"
              />
            </GestureDetector>
            <View
              style={[styles.closeIconContainer, { paddingTop: inset.top }]}
            >
              <Pressable onPress={onClose} style={styles.closeButton}>
                <AntIcon name="close" color="#CCC" size={24} />
              </Pressable>
            </View>
          </View>
        )}
      </SafeAreaView>
    );
  }
);

export const ImagePreviewModal = (props: Props) => {
  return (
    <Modal
      visible={props.imageUri !== null}
      animationType="slide"
      transparent
      onRequestClose={props.onRequestClose}
      presentationStyle="overFullScreen"
      statusBarTranslucent={true}
    >
      <ModalContents {...props} />
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
  },
  closeButton: {
    width: 40,
    height: 40,
    padding: 8,
    borderRadius: 40,
  },
  closeIconContainer: {
    width: 40,
    height: 40,
    position: "absolute",
    top: 0,
    left: 0,
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
});
