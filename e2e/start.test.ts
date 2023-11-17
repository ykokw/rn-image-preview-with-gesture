import { remote } from "webdriverio";
import type { Options } from "@wdio/types";

const capabilities = {
  platformName: "iOS",
  "appium:automationName": "XCUITest",
  "appium:deviceName": "iPhone 14",
  // NOTE: copied from Detox branch's .detox.config.js
  "appium:app": "ios/build/Build/Products/Release-iphonesimulator/ImagePreviewwithGesture.app",
};

const wdOpts = {
  hostname: "localhost",
  // hostname: process.env.APPIUM_HOST || "localhost",
  port: parseInt(process.env.APPIUM_PORT, 10) || 4723,
  logLevel: "info" as Options.WebDriverLogTypes,
  capabilities,
};

async function runTest() {
  const driver = await remote(wdOpts);
  try {
    // ~ is required to speicify the accessibility id
    const imageButton = await driver.$("~image-button");
    await imageButton.click();
  } finally {
    await driver.pause(1000);
    await driver.deleteSession();
  }
}

runTest().catch(console.error);
