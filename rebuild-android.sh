#!/bin/bash
cordova platform rm android
cordova platform add android
cordova build android
cordova run