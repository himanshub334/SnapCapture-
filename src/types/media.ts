export type CaptureResult = {
  uri: string;
  width: number;
  height: number;
  fileSize?: number;
  mimeType: string;
};

export type PermissionState = 'unknown' | 'granted' | 'denied';
