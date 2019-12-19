package com.awcoding.fl.FLBackService;

import android.content.Context;

import java.util.*;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

public class RNFLBackServicePackage implements ReactPackage {

    private Context mContext = null;
    private RNFLBackServiceModule mModuleInstance;

    public RNFLBackServicePackage(Context context){
        mContext = context;
    }

    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();
        mModuleInstance = new RNFLBackServiceModule(reactContext, mContext);
        modules.add(mModuleInstance);
        return modules;
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }
}