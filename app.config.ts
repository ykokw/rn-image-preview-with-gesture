import { ExpoConfig, ConfigContext } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  slug: "rn-image-preview-with-gesture",
  name: "Image Preview with Gesture",
  plugins: [
    [
      "@config-plugins/detox",
      {
        skipProguard: true,
      },
    ],
  ],
  android: {
    package: "com.ykokw2.rnimagepreviewwithgesture",
  },
  ios: {
    bundleIdentifier: "com.ykokw2.rnimagepreviewwithgesture",
  },
});
