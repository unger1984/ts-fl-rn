package com.awcoding.fl.FLBackService;

import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.graphics.BitmapFactory;
import android.os.Build;
import androidx.core.app.NotificationCompat;
import android.widget.RemoteViews;
import com.awcoding.fl.R;

import java.util.Random;

/**
 * Created by cobalt on 12.12.14.
 */
public class NotificationsHelper {

    private static Context appContext; // контекст приложения
    private static int lastNotificationId = 0; //уин последнего уведомления
    private static int batteryNotification = 1; // уин уведомления о заряде батареи


    private static NotificationManager manager; // менеджер уведомлений

    // метод инциализации данного хелпера
    public static void init(Context context) {
        if (manager == null) {
            appContext = context.getApplicationContext(); // на случай инициализации Base Context-ом
            manager = (NotificationManager) appContext.getSystemService(Context.NOTIFICATION_SERVICE);
        }
    }


    /**
     * Создает и возвращает общий NotificationCompat.Builder
     *
     * @return
     */
    public static NotificationCompat.Builder getNotificationBuilder() {
        final NotificationCompat.Builder nb = new NotificationCompat.Builder(appContext)
                .setAutoCancel(false) // чтобы уведомление закрылось после тапа по нему
                .setOngoing(true)
                .setOnlyAlertOnce(true) // уведомить однократно
                .setWhen(System.currentTimeMillis()) // время создания уведомления, будет отображено в стандартном уведомлении справа
                .setContentTitle(appContext.getString(R.string.app_name)) //заголовок
                .setDefaults(Notification.FLAG_GROUP_SUMMARY | Notification.DEFAULT_SOUND | Notification.FLAG_ONGOING_EVENT); // alarm при выводе уведомления: звук, вибратор и диод-индикатор - по умолчанию

        return nb;
    }

    // удаляет все уведомления, созданные приложением
    public static void cancelAllNotifications() {
        manager.cancelAll();
    }

    /**
     * @param message             - текст уведомления
     * @param targetActivityClass - класс целевой активити
     * @param iconResId           - R.drawable необходимой иконки
     * @return
     */
    public static int createNotification(final String message, final Class targetActivityClass, final int iconResId) {

        // некоторые проверки на null не помешают, зачем нам NPE?
        if (targetActivityClass == null) {
            new Exception("createNotification() targetActivity is null!").printStackTrace();
            return -1;
        }
        if (manager == null) {
            new Exception("createNotification() NotificationUtils not initialized!").printStackTrace();
            return -1;
        }

        final RemoteViews contentView = new RemoteViews(appContext.getPackageName(), R.layout.notify);
        contentView.setTextViewText(R.id.message, message); // сообщение уведомления
        contentView.setImageViewBitmap(R.id.notification_image, BitmapFactory.decodeResource(appContext.getResources(), (iconResId != 0 ? iconResId : R.drawable.fl)));


        final Intent notificationIntent = new Intent(appContext, targetActivityClass); // интент для запуска указанного Activity по тапу на уведомлении

        final NotificationCompat.Builder nb = getNotificationBuilder() // получаем из хелпера generic Builder, и далее донастраиваем его
                .setContentText(message) // сообщение, которое будет отображаться в самом уведомлении
                .setTicker(message) //сообщение, которое будет показано в статус-баре при создании уведомления, ставлю тот же
                .setSmallIcon(iconResId != 0 ? iconResId : R.drawable.fl) // иконка, если 0, то используется иконка самого аппа
                .setContent(contentView)
                .setAutoCancel(true)
                .setDefaults(Notification.FLAG_GROUP_SUMMARY | Notification.DEFAULT_ALL)
                .setContentIntent(PendingIntent.getActivity(appContext, 0, notificationIntent, PendingIntent.FLAG_UPDATE_CURRENT)); // создание PendingIntent-а

        Notification notification;
        if (Build.VERSION.SDK_INT > Build.VERSION_CODES.ICE_CREAM_SANDWICH_MR1) {
            notification = nb.build(); //генерируем уведомление, getNotification() - deprecated!
        } else {
            notification = nb.getNotification();
        }
        notification.defaults = Notification.DEFAULT_LIGHTS;
        //notification.contentView = contentView;
        Random random = new Random();

        manager.notify(random.nextInt(), notification); // "запускаем" уведомление

        return lastNotificationId;//++;
    }

    /**
     * Создает и возвращает общий NotificationCompat.Builder
     *
     * @return
     */
    private static NotificationCompat.Builder getNotificationBuilderCompat() {
        final NotificationCompat.Builder nb = new NotificationCompat.Builder(appContext)
                .setAutoCancel(true) // чтобы уведомление закрылось после тапа по нему
                .setOnlyAlertOnce(true) // уведомить однократно
                .setWhen(System.currentTimeMillis()) // время создания уведомления, будет отображено в стандартном уведомлении справа
                .setContentTitle(appContext.getString(R.string.app_name)) //заголовок
                .setDefaults(Notification.DEFAULT_ALL); // alarm при выводе уведомления: звук, вибратор и диод-индикатор - по умолчанию

        return nb;
    }
}
