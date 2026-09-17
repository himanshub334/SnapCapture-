import React from 'react';
import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';

type Props = { platform: 'ios' | 'android' | 'other'; onRetry: () => void };

export function PermissionDenied({ platform, onRetry }: Props) {
  const message = platform === 'ios'
    ? 'Camera access is disabled. You can allow it in Settings, then return to SnapCapture.'
    : 'Camera access is disabled. Grant the permission and try again. If you selected “Don’t ask again”, open app settings.';

  return (
    <View style={styles.container}>
      <Text style={styles.icon}>⌁</Text>
      <Text style={styles.title}>Camera permission needed</Text>
      <Text style={styles.body}>{message}</Text>

      <Pressable onPress={onRetry} style={styles.primary}>
        <Text style={styles.primaryText}>Try again</Text>
      </Pressable>

      <Pressable onPress={() => Linking.openSettings()} style={styles.secondary}>
        <Text style={styles.secondaryText}>Open app settings</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 28, backgroundColor: '#0b1020' },
  icon: { fontSize: 52, color: '#fff' },
  title: { fontSize: 25, fontWeight: '900', color: '#fff', marginTop: 16, textAlign: 'center' },
  body: { color: '#cbd5e1', lineHeight: 22, textAlign: 'center', marginTop: 12, maxWidth: 480 },
  primary: { marginTop: 24, paddingHorizontal: 28, paddingVertical: 14, borderRadius: 14, backgroundColor: '#fff' },
  primaryText: { color: '#111827', fontWeight: '900' },
  secondary: { marginTop: 12, padding: 12 },
  secondaryText: { color: '#cbd5e1', fontWeight: '800' }
});
