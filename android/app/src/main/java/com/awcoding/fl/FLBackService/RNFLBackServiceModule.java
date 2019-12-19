package com.awcoding.fl.FLBackService;

import android.content.SharedPreferences;
import android.util.Log;
import android.content.*;
import android.app.ActivityManager;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;

public class RNFLBackServiceModule extends ReactContextBaseJavaModule {

    private Context mAContext = null;
    private ReactApplicationContext mContext;

    public RNFLBackServiceModule(ReactApplicationContext reactContext, Context context) {
        super(reactContext);
        this.mContext = reactContext;
        this.mAContext = context;
    }

    @Override
    public String getName() {
        return "FLBackService";
    }

    @ReactMethod
    public void setAutostart(Boolean status) {
        SharedPreferences pref = mAContext.getSharedPreferences("FL", mAContext.MODE_PRIVATE);
        SharedPreferences.Editor ed = pref.edit();
        ed.putBoolean("autostart", status);
        ed.commit();
    }

    @ReactMethod
    public void setBackground(Boolean status) {
        SharedPreferences pref = mAContext.getSharedPreferences("FL", mAContext.MODE_PRIVATE);
        SharedPreferences.Editor ed = pref.edit();
        ed.putBoolean("background", status);
        ed.commit();
    }

    @ReactMethod
    public void setInterval(Integer interval) {
        SharedPreferences pref = mAContext.getSharedPreferences("FL", mAContext.MODE_PRIVATE);
        SharedPreferences.Editor ed = pref.edit();
        ed.putInt("interval", interval);
        ed.commit();
    }

    @ReactMethod
    public void getAutostart(Promise promise) {
        SharedPreferences pref = mAContext.getSharedPreferences("FL", mAContext.MODE_PRIVATE);
        promise.resolve(pref.getBoolean("autostart", false));
    }

    @ReactMethod
    public void start() {
        if (!isServiceRunning(FLBackService.class)) mAContext.startService(new Intent(mAContext, FLBackService.class));
    }

    @ReactMethod
    public void stop() {
        if (isServiceRunning(FLBackService.class)) mAContext.stopService(new Intent(mAContext, FLBackService.class));
    }

    public boolean isServiceRunning(Class<?> serviceClass) {
        ActivityManager manager = (ActivityManager) mAContext.getSystemService(Context.ACTIVITY_SERVICE);
        for (ActivityManager.RunningServiceInfo service : manager.getRunningServices(Integer.MAX_VALUE)) {
            if (serviceClass.getName().equals(service.service.getClassName())) {
                return true;
            }
        }
        return false;
    }
}