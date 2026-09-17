# Migrating the native module

The runnable Expo app is useful for development and portfolio demonstration.

For a literal reusable React Native native-module package:
1. Move the Swift files into an iOS native-module target.
2. Add the Objective-C bridge declarations.
3. Register the module with the React Native bridge/new architecture as appropriate.
4. Add CameraX dependencies to Android.
5. Implement a CameraX PreviewView/ImageCapture host view.
6. Add the Kotlin module/package provider.
7. Expose a single JS API such as `capture(options): Promise<CaptureResult>`.
8. Perform JPEG resize/compression natively before resolving.
9. Add native tests and device permission tests.

Do not claim the Expo demo itself is a production custom AVFoundation/CameraX module; the repository contains both the runnable demo and the native reference implementation.
