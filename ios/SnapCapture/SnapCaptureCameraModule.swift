import Foundation
import AVFoundation
import React

@objc(SnapCaptureCameraModule)
final class SnapCaptureCameraModule: NSObject {
  private let session = AVCaptureSession()
  private let output = AVCapturePhotoOutput()

  @objc
  func requestCameraPermission(_ resolve: @escaping RCTPromiseResolveBlock,
                               rejecter reject: @escaping RCTPromiseRejectBlock) {
    switch AVCaptureDevice.authorizationStatus(for: .video) {
    case .authorized:
      resolve(true)
    case .notDetermined:
      AVCaptureDevice.requestAccess(for: .video) { granted in
        resolve(granted)
      }
    default:
      resolve(false)
    }
  }

  // Native capture boundary: AVFoundation captures the image, then the module
  // can resize/compress it before resolving the JS promise.
  @objc
  func configure(_ resolve: @escaping RCTPromiseResolveBlock,
                 rejecter reject: @escaping RCTPromiseRejectBlock) {
    session.beginConfiguration()
    session.sessionPreset = .photo
    guard let device = AVCaptureDevice.default(for: .video) else {
      session.commitConfiguration()
      reject("NO_CAMERA", "No camera device is available.", nil)
      return
    }

    do {
      let input = try AVCaptureDeviceInput(device: device)
      if session.canAddInput(input) { session.addInput(input) }
      if session.canAddOutput(output) { session.addOutput(output) }
      session.commitConfiguration()
      resolve(true)
    } catch {
      session.commitConfiguration()
      reject("CAMERA_CONFIG", error.localizedDescription, error)
    }
  }

  @objc static func requiresMainQueueSetup() -> Bool { false }
}
