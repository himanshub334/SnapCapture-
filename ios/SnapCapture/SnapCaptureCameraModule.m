#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(SnapCaptureCameraModule, NSObject)

RCT_EXTERN_METHOD(requestCameraPermission:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(configure:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

@end
