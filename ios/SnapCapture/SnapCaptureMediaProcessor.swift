import Foundation
import UIKit

@objc(SnapCaptureMediaProcessor)
final class SnapCaptureMediaProcessor: NSObject {
  @objc
  func process(_ path: String,
                maxDimension: NSNumber,
                quality: NSNumber,
                resolver resolve: @escaping RCTPromiseResolveBlock,
                rejecter reject: @escaping RCTPromiseRejectBlock) {
    guard let image = UIImage(contentsOfFile: path) else {
      reject("IMAGE_READ", "Unable to read image.", nil)
      return
    }

    let maxSide = CGFloat(truncating: maxDimension)
    let scale = min(1.0, maxSide / max(image.size.width, image.size.height))
    let size = CGSize(width: image.size.width * scale, height: image.size.height * scale)

    UIGraphicsBeginImageContextWithOptions(size, true, 1)
    image.draw(in: CGRect(origin: .zero, size: size))
    let resized = UIGraphicsGetImageFromCurrentImageContext()
    UIGraphicsEndImageContext()

    guard let jpeg = resized?.jpegData(compressionQuality: CGFloat(truncating: quality)) else {
      reject("IMAGE_ENCODE", "Unable to encode JPEG.", nil)
      return
    }

    let output = FileManager.default.temporaryDirectory
      .appendingPathComponent(UUID().uuidString)
      .appendingPathExtension("jpg")

    do {
      try jpeg.write(to: output)
      resolve([
        "uri": output.absoluteString,
        "width": size.width,
        "height": size.height,
        "fileSize": jpeg.count,
        "mimeType": "image/jpeg"
      ])
    } catch {
      reject("IMAGE_WRITE", error.localizedDescription, error)
    }
  }

  @objc static func requiresMainQueueSetup() -> Bool { false }
}
