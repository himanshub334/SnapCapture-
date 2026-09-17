package com.example.snapcapture

import android.graphics.BitmapFactory
import android.graphics.Bitmap
import android.graphics.Matrix
import android.net.Uri
import com.facebook.react.bridge.*
import java.io.File
import java.io.FileOutputStream
import kotlin.math.max
import kotlin.math.min

class SnapCaptureMediaProcessor(private val context: ReactApplicationContext) :
  ReactContextBaseJavaModule(context) {

  override fun getName() = "SnapCaptureMediaProcessor"

  @ReactMethod
  fun process(path: String, maxDimension: Int, quality: Int, promise: Promise) {
    try {
      val source = BitmapFactory.decodeFile(Uri.parse(path).path ?: path)
        ?: throw IllegalArgumentException("Unable to decode image")

      val scale = min(1f, maxDimension.toFloat() / max(source.width, source.height))
      val bitmap = if (scale < 1f) {
        Bitmap.createScaledBitmap(source, (source.width * scale).toInt(), (source.height * scale).toInt(), true)
      } else source

      val output = File(context.cacheDir, "snapcapture-${System.currentTimeMillis()}.jpg")
      FileOutputStream(output).use { bitmap.compress(Bitmap.CompressFormat.JPEG, quality, it) }

      val result = Arguments.createMap()
      result.putString("uri", Uri.fromFile(output).toString())
      result.putInt("width", bitmap.width)
      result.putInt("height", bitmap.height)
      result.putInt("fileSize", output.length().toInt())
      result.putString("mimeType", "image/jpeg")
      promise.resolve(result)
    } catch (e: Exception) {
      promise.reject("MEDIA_PROCESSING", e.message, e)
    }
  }
}
