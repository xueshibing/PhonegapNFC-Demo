package com.chariotsolutions.nfc.plugin;

import android.nfc.tech.MifareUltralight;
import android.util.Log;

import java.io.IOException;

/**
 * Created by kevin on 5/27/15.
 */
public class InitNTAG213 {
    private static final String TAG = "InitNTAG213" ;
    private MifareUltralight mc;
    private String password;

    public InitNTAG213(MifareUltralight mc, String password) {
        this.mc = mc;
        this.password = password;
    }

    public boolean run() {
        byte[] type = new byte[]{(byte) 0xA2, (byte) 0x2A, (byte) 0x80, (byte) 0x00, (byte) 0x00, (byte) 0x00};
        byte[] pwd = new byte[]{(byte) 0xA2, (byte) 0x2B, (byte) 0xFF, (byte) 0xFF, (byte) 0xFF, (byte) 0xFF};
        if (this.password != null && !"".equals(this.password)) {
            byte[] auth = new byte[]{(byte) 0x1B, (byte) 0x0, (byte) 0x0, (byte) 0x0, (byte) 0x0};
            int l = Math.min(this.password.length(), 4);
            byte[] p = this.password.substring(0, l).getBytes();
            System.arraycopy(p,0,auth,1,l);
            System.arraycopy(auth,0,pwd,1,5);
        }
        byte[] pack = new byte[]{(byte) 0xA2, (byte) 0x2C, (byte) 0x33, (byte) 0x33, (byte) 0x00, (byte) 0x00};

        byte[] range = new byte[]{(byte) 0xA2, (byte) 0x29, (byte) 0x04, (byte) 0x00, (byte) 0x00, (byte) 0x04};

        if (transmit(type) && transmit(pwd) && transmit(pack) && transmit(range)) {
            return true;
        } else {
            return false;
        }
    }

    public boolean transmit(byte[] cmd){
        Log.d(TAG,"CMD----------");
        Log.d(TAG, Util.ByteArrayToHexString(cmd));

        try {
            byte[] response = this.mc.transceive(cmd);
            Log.d(TAG,Util.ByteArrayToHexString(response));
        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }
        return true;
    }
}
