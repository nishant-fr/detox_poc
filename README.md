## Detox POC Android Setup

### Step 1: Install Dependencies

Install Node.js (if you don’t already have it installed):

- Download it from [nodejs.org](https://nodejs.org).

Install Detox CLI globally:

```bash
npm install -g detox-cli
```

Install Detox and React Native dependencies in your project:

```bash
npm install detox --save-dev
npm install react-native-testing-library --save-dev
```

For Android, you'll need Detox and React Native version compatibility.

If you're using React Native 0.71 or later, run:

```bash
npx react-native init DetoxPOC
```

### Step 2: Configure Detox in `package.json`

Now you need to configure Detox in your `package.json` file. Add the following Detox configuration for Android:

```json
"detox": {
  "configurations": {
    "android.emu.debug": {
      "device": {
        "type": "android.emulator",
        "name": "Pixel_4_API_30",  // Update with your emulator name
        "architecture": "x86_64"
      },
      "app": {
        "binaryPath": "android/app/build/outputs/apk/debug/app-debug.apk",
        "build": "gradle assembleDebug"
      },
      "tests": {
        "testRunner": "jest"
      }
    }
  }
}
```

### Step 3: Install Detox and Jest

Install Detox:

```bash
npm i -D detox
```

Initialize Detox:

```bash
npm detox init
```

Install Jest:

```bash
npm install --save-dev jest
```

### Step 4: Modify `android/build.gradle`

In the `android` folder, add the following block in your `build.gradle` file:

```gradle
allprojects {
  repositories {
    ...
    google()
    maven {
      url "$rootDir/../node_modules/detox/Detox-android"
    }
    maven { url 'https://www.jitpack.io' }
  }
}
```

Make sure the `minSdkVersion` is set to **24** or higher.

### Step 5: Modify `android/app/build.gradle`

In `android/app/build.gradle`, under the `defaultConfig` block, add the following:

```gradle
testBuildType System.getProperty('testBuildType', 'debug')
testInstrumentationRunner 'androidx.test.runner.AndroidJUnitRunner'
```

Under the `buildTypes` block, add:

```gradle
proguardFile "${rootProject.projectDir}/../node_modules/detox/android/detox/proguard-rules-app.pro"
```

In the `dependencies` block, add:

```gradle
androidTestImplementation('com.wix:detox:+')
implementation 'androidx.appcompat:appcompat:1.1.0'
```

### Step 6: Create Detox Test File

Create a folder under `android/app/src/` as `androidTest/java/com/detoxpoc/DetoxTest.java`. Add the content as per the [Detox project setup documentation](https://wix.github.io/Detox/docs/introduction/project-setup).

### Step 7: Configure Network Security

Under `android/app/src/main/res`, create a folder called `xml` and create the file `network_security_config.xml`. Paste the values as shown in the Detox documentation.

In `android/app/src/main/AndroidManifest.xml`, add the following line:

```xml
android:networkSecurityConfig="@xml/network_security_config"
```

### Step 8: Build with Detox

To build the app for testing, run:

```bash
npm run detox:build-android
```
