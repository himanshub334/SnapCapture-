package com.example.snapcapture

import android.Manifest
import android.content.pm.PackageManager
import androidx.activity.result.ActivityResultLauncher
import androidx.camera.core.CameraSelector
import androidx.camera.core.ImageCapture
import androidx.camera.lifecycle.ProcessCameraProvider
import androidx.core.content.ContextCompat
import com.facebook.react.bridge.*

class SnapCaptureCameraModule(private val context: ReactApplicationContext) :
  ReactContextBaseJavaModule(context) {

  override fun getName() = "SnapCaptureCamera"

  @ReactMethod
  fun hasCameraPermission(promise: Promise) {
    promise.resolve(
      ContextCompat.checkSelfPermission(
        context, Manifest.permission.CAMERA
      ) == PackageManager.PERMISSION_GRANTED
    )
  }

  // A production module wires an ActivityResultLauncher into the host Activity,
  // then binds CameraX Preview + ImageCapture to the lifecycle.
  @ReactMethod
  fun describeCameraX(promise: Promise) {
    promise.resolve("CameraX ImageCapture + lifecycle binding ready")
  }
}
