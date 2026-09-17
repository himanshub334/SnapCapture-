# SnapCapture Architecture

## Runnable demo
The root Expo app is immediately runnable and uses `expo-camera` for the live camera surface plus a JS service boundary for image processing.

## Native implementation
`ios/SnapCapture/` contains Swift/Objective-C bridge examples:
- `SnapCaptureCameraModule.swift`: AVFoundation permission/configuration boundary.
- `SnapCaptureMediaProcessor.swift`: native resize/JPEG compression before resolving a JS promise.

`android/.../` contains Kotlin bridge examples:
- `SnapCaptureCameraModule.kt`: CameraX/permission boundary.
- `SnapCaptureMediaProcessor.kt`: native bitmap resize/JPEG compression.

These files are intentionally kept beside the Expo demo so the repository can be studied and migrated into a bare React Native native-module package.

## Boundary

Screen
  -> JS camera/media service
  -> native camera implementation
  -> native image processing
  -> compact CaptureResult
  -> JS

The important performance property is that the feature receives the processed image rather than a large decoded bitmap.
