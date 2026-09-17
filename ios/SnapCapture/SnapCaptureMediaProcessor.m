#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(SnapCaptureMediaProcessor, NSObject)
RCT_EXTERN_METHOD(process:(NSString *)path
                  maxDimension:(nonnull NSNumber *)maxDimension
                  quality:(nonnull NSNumber *)quality
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
@end
