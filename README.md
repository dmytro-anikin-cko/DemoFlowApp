# **Comprehensive Guide to Setting Up React Native with Checkout.com's Flow SDK**

This guide provides a complete walkthrough for setting up a React Native development environment and integrating [Checkout.com's Android Flow SDK](https://www.checkout.com/docs/payments/accept-payments/accept-a-payment-on-your-mobile-app/get-started-with-flow-for-mobile). It includes detailed instructions, common troubleshooting steps, and essential tips to ensure a smooth and efficient setup process for your project.

---

## 1. Prerequisites

Before you begin, ensure the following tools and dependencies are installed:

- **Node.js**: Use Node.js 18.x LTS for compatibility. Avoid Node.js 20.x.
- **nvm**: To manage Node.js versions on macOS.
- **Java Runtime (JDK 17 or higher)**: React Native requires JDK 17 or higher for compatibility.
- **Android Studio**: Required for managing the Android SDK, emulators, and JDK.
- **Visual Studio Code (VSC)**: Used as the primary code editor for the React Native project.


## 2. Environment Setup

### 2.1 Install Android Studio

1. Download and install [Android Studio](https://developer.android.com/studio) along with [Command Line tools](https://developer.android.com/studio) (scroll to the bottom of the page).
2. Open Android Studio and configure:
    - **Android SDK**: Install the required SDK tools (e.g., Build Tools, Platform Tools).
    - **Emulator**: Use the Device Manager to create and configure an Android Virtual Device (AVD).
    - **Android SDK Version**: You must ensure that Android API levels **34** and **35** are installed for compatibility with the Flow SDK.
        - Open **File > Settings > Languages & Frameworks > Android SDK**.
        - In the **SDK Platforms** tab:
            - Check if **Android 13** and **Android 14** are listed and installed.
            - If they are not, select them, and click **Apply** to download and install the missing SDKs.
        - In the **SDK Tools** tab:
            - Ensure that tools like **Android SDK Build-Tools**, **Android SDK Platform-Tools**, and **Android Emulator** are installed.

> Note: Open the full project in Visual Studio Code, but open the android folder separately in Android Studio for managing Android-specific tasks.
>


### 2.2 Install Node.js and Manage Versions

React Native recommends Node.js 18.x LTS. If you are on Node.js 20.x, downgrade to Node.js 18.x using `nvm`.

### Steps to Install and Configure `nvm`:

1. **Install `nvm`:**
    
    ```bash
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
    ```
    
2. **Configure Shell for `nvm`:**
Reload the shell configuration:
    
    ```bash
    source ~/.zshrc
    ```
    
    If the `.zshrc` file doesn’t exist:
    
    - Create the file:
        
        ```bash
        touch ~/.zshrc
        ```
        
    - Add the following lines:
        
        ```bash
        export NVM_DIR="$HOME/.nvm"
        [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # Loads nvm
        [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion" # Loads nvm bash_completion
        ```
        
    - Save and reload:
        
        ```bash
        source ~/.zshrc
        ```
        
3. **Install Node.js 18.x:**
    
    ```bash
    nvm install 18
    nvm use 18
    ```
    
4. **Verify Installation:**
    
    ```bash
    node --version
    npm --version
    ```
    

### 2.3 Configure the Java Runtime

React Native requires JDK 17 or higher. Ensure JDK 17 is installed and configured properly.

### Steps for macOS:

1. Install JDK 17:
    
    ```bash
    brew install openjdk@17
    ```
    
2. Link Java to the system:
    
    ```bash
    sudo ln -sfn $(brew --prefix openjdk@17)/libexec/openjdk.jdk /Library/Java/JavaVirtualMachines/openjdk-17.jdk
    ```
    
3. Update `.zshrc`:
Add the following lines:
    
    ```bash
    export JAVA_HOME=$(/usr/libexec/java_home -v 17)
    export PATH=$JAVA_HOME/bin:$PATH
    ```
    
4. Reload and verify:
    
    ```bash
    source ~/.zshrc
    java -version
    ```
#### **Gradle JDK Configuration**

After setting up **JAVA_HOME**, ensure Android Studio uses the correct JDK for Gradle:


1. Open **File > Settings > Build, Execution, Deployment > Build Tools > Gradle**.
2. Under **Gradle JDK**, select the option that corresponds to your system's **JAVA_HOME**. For example:
    
    ```
    JAVA_HOME Homebrew OpenJDK 17.0.13
    ```
    

Refer to the screenshot above for clarity. If the JDK version is incorrect or missing, make sure to configure your **JAVA_HOME** correctly in your `.zshrc` file and reload it.


### 2.4 Configure the Android SDK

To ensure the Android SDK is properly configured:

1. Add the following lines to `.zshrc`:
    
    ```bash
    export ANDROID_HOME=$HOME/Library/Android/sdk
    export PATH=$ANDROID_HOME/platform-tools:$ANDROID_HOME/emulator:$ANDROID_HOME/tools:$ANDROID_HOME/tools/bin:$ANDROID_HOME/cmdline-tools/bin:$ANDROID_HOME/cmdline-tools/latest/bin:$PATH # Adds Android tools to the system PATH
    ```
    
2. Reload `.zshrc`:
    
    ```bash
    source ~/.zshrc
    ```
    
3. Verify SDK Installation:
    
    ```bash
    echo $ANDROID_HOME
    ls $ANDROID_HOME
    ```
    

### 2.5 Increase the System's File Limit (macOS)

To prevent Metro Bundler errors (e.g., `EMFILE: too many open files`):

1. Add the following line to `/etc/zshrc`:
    
    ```bash
    ulimit -n 8192
    ```
    
2. Reload the shell:
    
    ```bash
    source ~/.zshrc
    
    ```

### 2.6. (EXTRA) Understanding the `.zshrc` File

<details>

<summary>Learn More</summary>

The `.zshrc` file is a shell configuration file for macOS. It contains environment variable declarations and commands that are executed every time you open a new terminal session. Below is the final configuration I used, with explanations:

```bash
export NVM_DIR="$HOME/.nvm" # Path to Node Version Manager (nvm)
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # Loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion" # Loads nvm bash completion scripts

export JAVA_HOME=$(/usr/libexec/java_home -v 17) # Path to Java 17 installation
export PATH=$JAVA_HOME/bin:$PATH # Adds Java 17 binaries to the system PATH

export ANDROID_HOME=$HOME/Library/Android/sdk # Path to the Android SDK
export PATH=$ANDROID_HOME/platform-tools:$ANDROID_HOME/emulator:$ANDROID_HOME/tools:$ANDROID_HOME/tools/bin:$ANDROID_HOME/cmdline-tools/bin:$ANDROID_HOME/cmdline-tools/latest/bin:$PATH # Adds Android tools to the system PATH

ulimit -n 8192 # Increases the file descriptor limit to prevent Metro Bundler errors
```

</details>

### **2.7 (EXTRA) Understanding Gradle**

<details>

<summary>Learn More</summary>

Gradle is a powerful build system used for managing project dependencies and automating tasks in Android development. It plays a critical role in compiling, building, and running your React Native project on Android. Gradle handles the following key tasks:

### **Key Responsibilities of Gradle**

1. **Dependency Management**:
Gradle fetches and resolves all required libraries (e.g., Flow SDK, React Native dependencies) for the project from repositories like `mavenCentral()` and `google()`.
2. **Build Configuration**:
Gradle reads and applies the configuration defined in `build.gradle` and `gradle.properties` files, such as:
    - Minimum (`minSdkVersion`) and target (`targetSdkVersion`) Android versions.
    - Application ID, version code, and version name.
    - Additional configurations like enabling Hermes or Jetifier.
3. **Build Automation**:
Gradle automates the process of building APKs (Android application packages) by running tasks such as `assembleDebug`, `assembleRelease`, or custom tasks.
4. **Environment Management**:
Gradle ensures that the appropriate Java Development Kit (JDK) version and Android Build Tools are used during compilation.
5. **Integration with Android Studio**:
Gradle seamlessly integrates with Android Studio, allowing developers to:
    - Sync dependencies.
    - View and manage project structure.
    - Run tasks directly from the IDE.

---

### **Gradle Files in the Project**

1. **`settings.gradle`**:
    - Specifies the modules to include in the build process (e.g., `:app`).
    - Configures repositories where dependencies are resolved.
2. **`gradle.properties`**:
    - Contains global properties for the Gradle build system.
    - Examples: enabling Hermes, configuring JVM memory, or enabling AndroidX.
3. **`build.gradle`**:
    - **Project-level `build.gradle`**: Contains configurations shared across all modules, such as repository settings and Gradle plugin dependencies.
    - **Module-level `build.gradle` (e.g., `android/app/build.gradle`)**: Contains app-specific configurations like application ID, SDK versions, dependencies, and signing configurations.

---

### **Common Gradle Commands**

Here are some common Gradle commands and their purposes:

- **`./gradlew clean`**:
Cleans the build directory by removing all previously compiled files and build artifacts. This is useful when you encounter build errors or need to start fresh.
- **`./gradlew build`**:
Compiles the project, resolves dependencies, and packages the app into an APK or AAB (Android App Bundle).
- **`./gradlew assembleDebug`**:
Builds the debug version of the app. This is typically used for testing.
- **`./gradlew assembleRelease`**:
Builds the release version of the app, ready for deployment. Requires proper signing configuration.
- **`./gradlew dependencies`**:
Lists all dependencies for the project and their resolved versions.
- **`./gradlew tasks`**:
Lists all available Gradle tasks for the project.

---

### **Gradle Daemon and Hanging Processes**

Gradle uses a background process called the **Gradle Daemon** to speed up builds. However, sometimes the daemon can hang or cause issues. You can address this by:

- Stopping all Gradle processes:
    
    ```bash
    ./gradlew --stop
    ```
    
- Killing specific Gradle processes:
    
    ```bash
    ps aux | grep gradle
    kill -9 <PID>
    ```
    

### **Tips for Working with Gradle**

1. **Always Sync Gradle Files**:
Whenever you make changes to `build.gradle` or `gradle.properties`, use the **Elephant icon** in Android Studio to sync the Gradle files.
2. **Check Logs**:
If your build fails, inspect the logs in Android Studio or use `./gradlew build` in the terminal for detailed error messages.
3. **Configure Gradle JDK**:
Ensure the correct JDK version is set in Android Studio under **File > Settings > Build, Execution, Deployment > Build Tools > Gradle**.
4. **Cache Issues**:
If you encounter dependency or build errors, clear the Gradle cache:
    
    ```bash
    ./gradlew clean
    ```
    
5. **Use Gradle Wrapper**:
Always use `./gradlew` instead of `gradle` to ensure you’re using the Gradle version configured for the project.

</details>

## 3. Create a New React Native Project

### 3.1 Initialize the Project

Run the following command to create a pure React Native project (not Expo):

```bash
npx @react-native-community/cli init DemoFlowApp
```

> Note: Avoid placing the project inside the AndroidStudioProjects folder. This can cause conflicts with the Metro bundler.
> 

### 3.2 Navigate to the Project Directory

```bash
cd DemoFlowApp
```


## 4. Build and Run the Project

### 4.1 Start the Metro Bundler

Start the Metro bundler in one terminal:

```bash
npx react-native start
```

### 4.2 Launch the Emulator

1. Open Android Studio.
2. Go to **Tools > Device Manager** and start your AVD (Android Virtual Device).

### 4.3 Build and Run the App

In a separate terminal (zsh), run:

```bash
npx react-native run-android
```

> Note: Ensure the emulator is running before executing this command.
> 

### 4.4 (EXTRA) Understanding Metro

<details>
<summary>Learn More</summary>

Metro is the JavaScript bundler used by React Native. It processes your JavaScript code, bundles it into a format that your mobile app can understand, and serves it to the app via a development server.

### Key Features:

- **File Watching:** Metro continuously watches your JavaScript files for changes and updates the app in real-time during development.
- **Bundling:** It optimizes and bundles your JavaScript code for efficient app execution.
- **Error Reporting:** Provides real-time feedback on syntax or runtime errors during development.

### When to Use Metro:

- Start the Metro server whenever you work on the app by running:
    
    ```bash
    npx react-native start
    ```
    
- Ensure Metro is running in the background when building and testing your app.

### Common Metro Issues:

- **Too Many Open Files Error:**
    
    ```bash
    EMFILE: too many open files
    ```
    
    To resolve this, increase the system’s file limit (see Section 2.5).
    
- **Stale Cache:**
If Metro serves outdated files, reset its cache with:
    
    ```bash
    npx react-native start --reset-cache
    ```
    

Metro is a critical part of the React Native development process. Ensuring it runs smoothly will save time and help avoid unexpected issues.

</details>

## 5. Verify Setup

At this stage, you should see React Native welcome page on your emulator! If not, run the following command to ensure your environment is configured correctly:

```bash
npx react-native doctor
```
> Use the same terminal from step 4.3
>

Resolve any reported issues, such as missing Android SDK components or incompatible Java versions.

### 5.1 (EXTRA) Troubleshooting Common Issues

<details>
<summary>Learn More</summary>

#### Gradle Sync Errors

If you encounter errors related to Gradle or dependencies during the project setup, sync the Gradle files in Android Studio. This step is not required during project initialization but may be necessary when adding the Flow SDK.

#### Debugging Metro Bundler Errors

If the Metro Bundler throws `EMFILE: too many open files`, rebuild the bundler and reset the cache:

```bash
npx react-native start --reset-cache
```
In case it doesn't work, you might need to reinstall the node_modules folder. Do this by running:

```bash
rm -rf node_modules
npm install
npx react-native start --reset-cache
```
</details>

## 6. Integrating the Flow SDK and Configuring the Project

This section outlines the steps to integrate Checkout.com's Flow SDK into the React Native project, including Gradle configurations, Kotlin files, and troubleshooting common issues during the integration process.

### 6.1 Update Gradle Files

To integrate the Flow SDK, the following changes were made to the Gradle files:

#### `android/settings.gradle`

This file ensures the required repositories and plugins are included for resolving dependencies.

**Key Changes:**

- Added `mavenCentral()` to the `repositories` block to fetch the Flow SDK and other dependencies.
- Included the `react-native-gradle-plugin`.

---

#### `android/gradle.properties`

This file contains project-wide Gradle settings.

**Key Additions and Their Purpose:**

- `hermesEnabled=true`: Enables Hermes, React Native’s JavaScript engine, for better performance.
- `android.useAndroidX=true` and `android.enableJetifier=true`: Ensures compatibility with AndroidX libraries.
- `org.gradle.jvmargs=-Xmx2048m`: Increases Gradle's memory allocation to avoid build failures.

---

#### `android/build.gradle`

This file configures project-level Gradle settings.

**Key Changes:**

- Added `mavenCentral()` to the `repositories` block.
- Specified Kotlin and Gradle plugin versions compatible with the Flow SDK.

---

#### `android/app/build.gradle`

This file configures app-level Gradle settings.

**Key Additions and Their Purpose:**

- Added the Flow SDK dependency: `implementation("com.checkout:checkout-android-components:1.0.0-beta-1")`.
- Defined `FLOW_API_KEY` in `buildConfigField` for secure API key management.

#### Sync Gradle Files
After making changes to the Gradle files, it’s essential to sync them in Android Studio to ensure the configurations are applied correctly.

1. Open Android Studio.
2. Locate the Elephant icon in the top toolbar.
3. Click on it to sync your Gradle files with the project.

This step will fetch dependencies and apply the updated configurations. Any issues with the Gradle sync will be displayed in the Build output.

> Note: Ensure all Android SDK dependencies (e.g., Build Tools, Platform Tools) are installed as per Section 2.1 if the sync fails.
> 

### 6.2 Add Native Modules & Bridge

#### `FlowModule.kt`

The `FlowModule.kt` file bridges React Native's JavaScript with the Flow SDK.

**Thing to note:**
1. The following imports are required for proper integration of the Flow SDK. Missing these can lead to `Unresolved reference` errors.

```kotlin
import com.checkout.components.core.CheckoutComponentsFactory
import com.checkout.components.interfaces.Environment
import com.checkout.components.interfaces.component.CheckoutComponentConfiguration
import com.checkout.components.interfaces.error.CheckoutError
import com.checkout.components.interfaces.model.ComponentName
import com.checkout.components.interfaces.model.PaymentSessionResponse
import com.checkout.components.interfaces.api.CheckoutComponents
import com.checkout.components.interfaces.component.ComponentCallback
```

2. In the official documentation, the method `checkoutComponent.provideCheckoutComponentsLayout(containerView)` is suggested for rendering. However, this method is a typo. Use the following method instead:

```kotlin
val view = flowComponent.provideView(containerView)
```

---

#### `FlowPackage.kt`

The `FlowPackage.kt` file plays a critical role in making the native `FlowModule` accessible from JavaScript. It acts as a bridge initializer by registering the `FlowModule` with React Native.

**Key Responsibilities:**

1. **Register Native Modules**: It ensures `FlowModule` is exposed to React Native and can be accessed via `NativeModules.FlowModule` in JavaScript.
2. **Bridge Initialization**: Ensures smooth communication between JavaScript and native code.

---

#### Adding `FlowPackage` to MainApplication.kt

After creating `FlowPackage.kt`, we must register it in **MainApplication.kt**. This step connects the package to React Native's runtime, making the module available to the app.

**Steps to Add `FlowPackage`:**

1. Open `MainApplication.kt`.
2. Locate the `getPackages()` method.
3. Add the following line to include `FlowPackage`:

```kotlin
packages.add(FlowPackage())
```

---

### **Summary of the Bridging Process**

1. **`FlowModule.kt`**: Defines the native functionality and exposes it to JavaScript.
2. **`FlowPackage.kt`**: Registers `FlowModule` with React Native.
3. **MainApplication.kt**: Connects `FlowPackage` to React Native's runtime to make it available in the app.

By completing these steps, the native module `FlowModule` is fully integrated and ready to be accessed from JavaScript.

---

### Rebuild the Project
Once you’ve created and registered the native modules, it’s essential to rebuild your project to incorporate the changes. Follow these steps:

1. Clean the Gradle build cache:
```bash
./gradlew clean
```
This command removes all previously compiled files and build artifacts, ensuring a fresh build.

2. Build the project using Gradle:

```bash
./gradlew build
```
This resolves dependencies and compiles the project.

3. Rebuild and launch the app:

```bash
npx react-native run-android
```
Note: If any errors occur during the ./gradlew build process, check the logs in the terminal or Android Studio's Build Output tab to diagnose the issue. Always ensure your dependencies are synced (see Section 6.1) before proceeding.

---

### 6.3 (EXTRA) Common Issues and Resolutions

<details>
<summary>Learn More</summary>

- **Hanging Gradle Processes:**
Use `ps aux | grep gradle` to find Gradle processes and `kill -9 <PID>` to terminate them.
- **Cache Issues:**
Use the following commands to clear caches and rebuild the project:
    
    ```bash
    ./gradlew clean  # Clears build artifacts
    ./gradlew build  # Compiles the project and verifies dependencies
    ```
    
- **Lock File Issues:**
Remove lock files (e.g., `package-lock.json`) and reinstall dependencies:
    
    ```bash
    rm -rf node_modules package-lock.json
    npm install
    ```
    
- **Metro Bundler Issues:**
Reset the Metro bundler cache to resolve issues with stale files:
    
    ```bash
    npx react-native start --reset-cache
    ```
- **Gradle Sync Required:** After verifying or installing the necessary Android SDK versions, always sync the Gradle files in Android Studio. Click on the **Elephant icon** in the top toolbar to ensure the project is properly synchronized.

</details>


### 6.4 (EXTRA) Android Studio Tips and Tricks

<details>
<summary>Learn More</summary>

If you’re new to Android Studio, just like me, here are some helpful tips:

1. **Sync Gradle Files**: Use the **Elephant icon** in the top panel to sync Gradle files after modifying `gradle.properties` or `build.gradle`.
2. **Device Manager**: Open the **Device Manager** from the right panel to add a new AVD or start/stop existing emulators.
3. **Running Devices**: Click **Running Devices** in the right panel to view the current emulator screen.
4. **Logcat**: Open **View > Tool Windows > Logcat** to access application logs.
5. **SDK Location**: Modify the Android SDK path in **File > Project Structure > SDK Location** if necessary. I had to modify it to `/Users/dmytro.anikin/Library/Android/sdk`. 
6. **Project Dependencies**: Check dependencies in **File > Project Structure > Dependencies**. Verify that `checkout-android-components` is included after adding it as a dependency in `android/app/build.gradle`.

</details>
