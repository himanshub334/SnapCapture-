import React, { useState } from 'react';
import { Alert, Image, Platform, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NativeCamera } from './components/NativeCamera';
import { pickAndProcessPhoto } from './services/photoPicker';
import { CaptureResult } from './types/media';

export default function App() {
  const [capture, setCapture] = useState<CaptureResult | null>(null);
  const [camera, setCamera] = useState(true);

  const handleCapture = (result: CaptureResult) => {
    setCapture(result);
    setCamera(false);
  };

  const choosePhoto = async () => {
    const result = await pickAndProcessPhoto();
    if (result) {
      setCapture(result);
      setCamera(false);
    }
  };

  if (camera) {
    return (
      <>
        <StatusBar style="light" />
        <NativeCamera onCapture={handleCapture} />
        <View style={styles.topBar}>
          <Text style={styles.logo}>SnapCapture</Text>
          <Pressable onPress={choosePhoto}><Text style={styles.library}>Library</Text></Pressable>
        </View>
      </>
    );
  }

  return (
    <SafeAreaView style={styles.result}>
      <StatusBar style="dark" />
      <Text style={styles.title}>Captured media</Text>
      {capture && <Image source={{ uri: capture.uri }} style={styles.preview} resizeMode="contain" />}
      {capture && (
        <View style={styles.meta}>
          <Text style={styles.metaText}>{capture.width} × {capture.height}</Text>
          <Text style={styles.metaText}>{capture.mimeType}</Text>
          <Text style={styles.metaText}>Processed before feature use</Text>
        </View>
      )}
      <View style={styles.actions}>
        <Pressable style={styles.primary} onPress={() => setCamera(true)}>
          <Text style={styles.primaryText}>Take another photo</Text>
        </Pressable>
        <Pressable style={styles.secondary} onPress={choosePhoto}>
          <Text style={styles.secondaryText}>Choose from library</Text>
        </Pressable>
      </View>
      <Text style={styles.platform}>Running on {Platform.OS}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  topBar: { position: 'absolute', top: 58, left: 20, right: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  logo: { color: '#fff', fontSize: 20, fontWeight: '900' },
  library: { color: '#fff', fontWeight: '800', backgroundColor: '#111827cc', paddingHorizontal: 14, paddingVertical: 9, borderRadius: 12 },
  result: { flex: 1, backgroundColor: '#f8fafc', padding: 20 },
  title: { fontSize: 27, fontWeight: '900', color: '#111827' },
  preview: { flex: 1, width: '100%', marginTop: 12 },
  meta: { paddingVertical: 12, gap: 4 },
  metaText: { color: '#6b7280', fontSize: 13 },
  actions: { gap: 10 },
  primary: { backgroundColor: '#111827', paddingVertical: 15, borderRadius: 14, alignItems: 'center' },
  primaryText: { color: '#fff', fontWeight: '900' },
  secondary: { borderWidth: 1, borderColor: '#d1d5db', paddingVertical: 14, borderRadius: 14, alignItems: 'center' },
  secondaryText: { color: '#111827', fontWeight: '800' },
  platform: { textAlign: 'center', color: '#9ca3af', marginTop: 12, fontSize: 11 }
});
