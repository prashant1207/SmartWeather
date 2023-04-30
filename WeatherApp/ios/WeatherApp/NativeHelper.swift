//
//  NativeHelper.swift
//  WeatherApp
//
//  Created by Prashant Tiwari on 30/04/2023.
//

import Foundation
import CoreLocation

@objc(NativeHelper) class NativeHelper: NSObject {
  @objc public func isLocationAuthorized(_ callback: RCTResponseSenderBlock) {
    let status = CLLocationManager.authorizationStatus()
    if status == .authorizedAlways || status == .authorizedWhenInUse {
      callback([true])
    } else {
      callback([false])
    }
  }
}

