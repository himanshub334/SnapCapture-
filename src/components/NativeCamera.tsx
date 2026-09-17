import React, { useRef, useState } from 'react';
import { Alert, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { compressAndResize } from '../services/mediaProcessor';
import { CaptureResult } from '../types/media';
import { PermissionDenied } from './PermissionDenied';

type Props = { onCapture: (result: CaptureResult) => void };

export function NativeCamera({ onCapture }: Props) {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);
  const [busy, setBusy] = useState(false);

  if (!permission) return <View style={styles.loading}><Text>Checking camera permission…</Text></View>;

  if (!permission.granted) {
    return (
      <PermissionDenied
        platform={Platform.OS === 'ios' || Platform.OS === 'android' ? Platform.OS : 'other'}
        onRetry={requestPermission}
      />
    );
  }

  const capture = async () => {
    if (!cameraRef.current || busy) return;
    try {
      setBusy(true);
      const photo = await cameraRef.current.takePictureAsync({
        quality: 1,
        skipProcessing: false
      });
      if (!photo?.uri) return;

      // Process at the media boundary before feature-level JS uses the image.
      const processed = await compressAndResize(photo.uri);
      onCapture(processed);
    } catch (error) {
      Alert.alert('Capture failed', error instanceof Error ? error.message : 'Please try again.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <View style={styles.container}>
      <CameraView ref={cameraRef} style={StyleSheet.absoluteFill} facing="back" />
      <View style={styles.overlay}>
        <View style={styles.frame} />
        <Pressable accessibilityRole="button" onPress={capture} style={[styles.shutter, busy && styles.disabled]}>
          <View style={styles.inner} />
        </Pressable>
        <Text style={styles.hint}>{busy ? 'Processing…' : 'Tap to capture'}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  overlay: { flex: 1, justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 32 },
  frame: { position: 'absolute', top: '18%', width: '78%', height: '55%', borderWidth: 2, borderColor: '#fff', borderRadius: 24, opacity: 0.65 },
  shutter: { width: 76, height: 76, borderRadius: 38, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  inner: { width: 62, height: 62, borderRadius: 31, borderWidth: 4, borderColor: '#111827' },
  disabled: { opacity: 0.5 },
  hint: { color: '#fff', fontWeight: '800', marginTop: 12 },
  loading: { flex: 1, alignItems: 'center', justifyContent: 'center' }
});
