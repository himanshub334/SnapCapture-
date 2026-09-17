import * as ImagePicker from 'expo-image-picker';
import { compressAndResize } from './mediaProcessor';

export async function pickAndProcessPhoto() {
  const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (!permission.granted) return null;

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ['images'],
    quality: 1,
    allowsEditing: false
  });

  if (result.canceled || !result.assets[0]) return null;
  return compressAndResize(result.assets[0].uri);
}
