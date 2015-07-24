package com.chariotsolutions.nfc.plugin;

import android.content.Context;
import android.content.SharedPreferences;
import android.preference.PreferenceManager;
import android.util.Log;

/**
 * Created by kevin on 6/27/15.
 */
public class AccountStorage {
    private static final String DEFAULT_ACCOUNT_NUMBER = "00000000";
    private static final String TAG = "AccountStorage";
    private static String sAccount = null;
    private static final Object sAccountLock = new Object();

    public static void setAccount( String s) {
        synchronized(sAccountLock) {
            sAccount = s;
        }
    }

    public static String getAccount() {
        synchronized (sAccountLock) {
            if (sAccount == null) {
                sAccount = DEFAULT_ACCOUNT_NUMBER;
            }
            return sAccount;
        }
    }
}
