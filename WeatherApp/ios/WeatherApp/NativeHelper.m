//
//  NativeHelper.m
//  WeatherApp
//
//  Created by Prashant Tiwari on 30/04/2023.
//

#import <Foundation/Foundation.h>
#import "React/RCTBridgeModule.h"

@interface RCT_EXTERN_MODULE(NativeHelper, NSObject)
  RCT_EXTERN_METHOD(isLocationAuthorized:
    (RCTResponseSenderBlock) callback
  )
  + (BOOL)requiresMainQueueSetup
  {
    return NO;
  }
@end
