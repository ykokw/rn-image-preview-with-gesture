import { SafeAreaProvider } from "react-native-safe-area-context";
import { ImageList } from "./components/ImageList";


export default function App() {
  return (
    <SafeAreaProvider>
      <ImageList />
    </SafeAreaProvider>
  );
}
