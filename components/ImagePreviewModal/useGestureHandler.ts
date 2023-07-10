import { Gesture } from 'react-native-gesture-handler'
import { useSharedValue, useAnimatedStyle } from 'react-native-reanimated'

export const useGestureHandler = () => {
  const offset = useSharedValue({ x: 0, y: 0 })
  const savedOffset = useSharedValue({ x: 0, y: 0 })
  const scale = useSharedValue(1)
  const savedScale = useSharedValue(1)

  const pinchGesture = Gesture.Pinch()
    .onUpdate((e) => {
      scale.value = Math.max(savedScale.value * e.scale, 1)
    })
    .onEnd(() => {
      savedScale.value = scale.value
    })

  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      offset.value = {
        x: e.translationX + savedOffset.value.x,
        y: e.translationY + savedOffset.value.y,
      }
    })
    .onEnd(() => {
      savedOffset.value = {
        x: offset.value.x,
        y: offset.value.y,
      }
    })

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: offset.value.x },
      { translateY: offset.value.y },
      {
        scale: scale.value,
      },
    ],
  }))

  const composedGesture = Gesture.Simultaneous(pinchGesture, panGesture)

  const reset = () => {
    offset.value = { x: 0, y: 0 }
    scale.value = 1
  }

  return {
    gesture: composedGesture,
    animatedStyle,
    reset,
  }
}
