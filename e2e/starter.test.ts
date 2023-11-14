import { expect } from "detox";

describe("Example", () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it("should have text in the screen", async () => {
    await expect(element(by.text("image preview modal demo"))).toBeVisible();
  });

  it("should show preview modal after tap", async () => {
    const imageButton = element(by.id("image-button")).atIndex(0);
    await expect(imageButton).toBeVisible();
    await imageButton.tap();
    await expect(element(by.id("preview-image"))).toBeVisible();
  });

});
