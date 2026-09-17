# SnapCapture — Native Camera & Media Module for React Native

A portfolio-ready React Native + TypeScript camera project with a runnable Expo implementation and native AVFoundation/CameraX bridge reference modules.

## What is included

- Live camera capture
- Camera runtime permission flow
- Platform-specific denied-permission UX
- Image library fallback
- Resize + JPEG compression before feature-level use
- Swift/AVFoundation native module reference
- Kotlin/CameraX native module reference
- Native media-processing reference implementations
- TypeScript JS-facing service boundary
- Documentation and test plan

## Run

```bash
npm install
npm run typecheck
npx expo start
```

Then use Android/iOS/web as appropriate. A physical device is recommended for real camera testing.

Native builds:

```bash
npx expo prebuild
npx expo run:android
npx expo run:ios
```

## Important architecture note

The Expo app is the runnable path. The Swift/Kotlin files demonstrate the reusable native-module implementation and the intended JS bridge contract. They are not automatically injected into the Expo managed runtime.

For a production custom native module, migrate the native files into a bare React Native native-module package and wire the CameraX/AVFoundation preview and capture lifecycle as described in `docs/MIGRATION_TO_BARE_RN.md`.

## Production

For an app-store release, replace the example identifiers, configure signing, test permissions on physical devices, and use a production native build. Avoid storing camera/media data longer than necessary.

## Resume accuracy

Only claim a measured UI-jank reduction, specific lower-end-device improvement, or community-package replacement after you have actually benchmarked and documented it.
# SnapCapture-
