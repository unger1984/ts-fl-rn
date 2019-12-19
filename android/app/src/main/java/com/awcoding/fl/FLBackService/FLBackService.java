package com.awcoding.fl.FLBackService;

import android.app.Service;
import android.content.*;
import android.os.Handler;
import android.os.IBinder;
import android.util.Log;
import com.awcoding.fl.MainActivity;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.Timer;
import java.util.TimerTask;

public class FLBackService extends Service {

    SharedPreferences pref;
    Integer interval;
    Timer timer = null;
    private ArrayList<Integer> old;

    public void onCreate() {
        super.onCreate();

        old = new ArrayList<>();
        NotificationsHelper.init(this);
    }

    public void onDestroy() {
        super.onDestroy();
        Log.d("FLLog", "destory");

        if (timer != null) timer.cancel();
        NotificationsHelper.cancelAllNotifications();
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        Log.d("FLLog", "start");
        pref = getSharedPreferences("FL", MODE_PRIVATE);
        interval = pref.getInt("interval", 10);
        old = new ArrayList<>();

        new Run().run();
        return Service.START_NOT_STICKY;
    }

    class Run implements Runnable {

        @Override
        public void run() {
            final Handler handler = new Handler();
            TimerTask task = new TimerTask() {
                @Override
                public void run() {
                    handler.post(new Runnable() {
                        public void run() {
                            ws();
                        }
                    });
                }
            };
            timer = new Timer();
            timer.schedule(task, 0, 1000 * interval);
        }
    }

    private void ws() {
        Thread thread = new Thread() {
            @Override
            public void run() {
                Log.d("FLLog", "tick");
                try {
                    String res = getData("http://fl.awcoding.com/api/project");
                    JSONObject jObject = new JSONObject(res);
                    JSONObject data = jObject.getJSONObject("data");
                    JSONArray rows = data.getJSONArray("rows");

                    ArrayList<Integer> nold = new ArrayList<>();
                    for (int i = 0; i < rows.length(); i++) {
                        JSONObject pr = rows.getJSONObject(i);
                        int id = pr.getInt("id");
                        nold.add(new Integer(id));
                        if (old.size() > 0) {
                            if (old.indexOf(new Integer(id)) < 0) {
                                Log.d("FLLog", "new " + id);
                                sendNotify(pr);
                            }
                        }
                    }


                    old = new ArrayList<>((ArrayList<Integer>) nold.clone());
                } catch (IOException e) {
                    e.printStackTrace();
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }
        };
        thread.start();
    }

    public void sendNotify(JSONObject project) throws JSONException {
        NotificationsHelper.createNotification(project.getString("title"), MainActivity.class, 0);
    }

    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    private String getData(String urlString) throws IOException {
        InputStream is = null;
        try {
            URL url = new URL(urlString);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");
            conn.connect();

            is = conn.getInputStream();
            return convertToString(is);
        } finally {
            if (is != null) {
                is.close();
            }
        }
    }

    private String convertToString(InputStream is) throws IOException {
        BufferedReader r = new BufferedReader(new InputStreamReader(is));
        StringBuilder total = new StringBuilder();
        String line;
        while ((line = r.readLine()) != null) {
            total.append(line);
        }
        return new String(total);
    }
}