# Runtime permissions

## iOS
Declare `NSCameraUsageDescription` in Info.plist. AVFoundation handles runtime authorization through `AVCaptureDevice.requestAccess`.

## Android
Declare CAMERA in the manifest and request it at runtime. CameraX should only bind after permission is granted.

The demo provides a platform-aware denied state and a Settings fallback.
