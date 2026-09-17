import * as ImageManipulator from 'expo-image-manipulator';
import { CaptureResult } from '../types/media';

/**
 * Processes media before it reaches feature-level JS code.
 * In the native-module version, this same boundary is implemented natively
 * with AVFoundation/CoreGraphics on iOS and Bitmap/ImageProxy on Android.
 */
export async function compressAndResize(uri: string): Promise<CaptureResult> {
  const result = await ImageManipulator.manipulateAsync(
    uri,
    [{ resize: { width: 1600 } }],
    { compress: 0.78, format: ImageManipulator.SaveFormat.JPEG }
  );

  return {
    uri: result.uri,
    width: result.width,
    height: result.height,
    mimeType: 'image/jpeg'
  };
}
