package com.awcoding.fl;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import com.awcoding.fl.FLBackService.FLBackService;

/**
 * Created by cobalt on 12.12.14.
 */
public class StartupReceiver extends BroadcastReceiver {
    SharedPreferences pref;

    @Override
    public void onReceive(Context context, Intent intent) {

        pref = context.getSharedPreferences("FL", context.MODE_PRIVATE);
        Boolean auto = pref.getBoolean("autostart", false);
        Boolean background = pref.getBoolean("background", false);
        if (auto && background) {
            context.startService(new Intent(context, FLBackService.class));
        }
    }
}
