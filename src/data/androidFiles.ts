export const androidFiles = [
  {
    name: 'app/build.gradle',
    language: 'groovy',
    content: `plugins {
    id 'com.android.application'
}

android {
    namespace 'com.avudev.ffmod'
    compileSdk 34

    defaultConfig {
        applicationId "com.avudev.ffmod"
        minSdk 24
        targetSdk 34
        versionCode 1
        versionName "1.0"
    }

    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
    compileOptions {
        sourceCompatibility JavaVersion.VERSION_1_8
        targetCompatibility JavaVersion.VERSION_1_8
    }
}

dependencies {
    implementation 'androidx.appcompat:appcompat:1.6.1'
    implementation 'com.google.android.material:material:1.11.0'
    implementation 'androidx.constraintlayout:constraintlayout:2.1.4'
}`
  },
  {
    name: 'AndroidManifest.xml',
    language: 'xml',
    content: `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.avudev.ffmod">

    <uses-permission android:name="android.permission.SYSTEM_ALERT_WINDOW"/>
    <uses-permission android:name="android.permission.FOREGROUND_SERVICE"/>

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="AVU DEV FF"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/Theme.AppCompat.DayNight.NoActionBar">
        
        <activity
            android:name=".MainActivity"
            android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>

        <service
            android:name=".MenuService"
            android:enabled="true"
            android:exported="false"
            android:foregroundServiceType="specialUse" />
    </application>

</manifest>`
  },
  {
    name: 'res/layout/floating_menu.xml',
    language: 'xml',
    content: `<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:id="@+id/root_container"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:orientation="vertical">

    <!-- Icon để mở/đóng menu -->
    <ImageView
        android:id="@+id/icon_close_open"
        android:layout_width="50dp"
        android:layout_height="50dp"
        android:src="@android:drawable/ic_menu_preferences"
        android:background="@drawable/circle_bg"
        android:padding="10dp"
        android:elevation="5dp"/>

    <!-- Menu chính -->
    <LinearLayout
        android:id="@+id/menu_container"
        android:layout_width="250dp"
        android:layout_height="wrap_content"
        android:orientation="vertical"
        android:background="#DD000000"
        android:padding="10dp"
        android:visibility="gone">

        <TextView
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:text="AVU DEV - FREE"
            android:textColor="#FFD700"
            android:textSize="18sp"
            android:textStyle="bold"
            android:gravity="center"
            android:paddingBottom="10dp"/>

        <ScrollView
            android:layout_width="match_parent"
            android:layout_height="250dp">
            
            <LinearLayout
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:orientation="vertical">

                <!-- Nhóm 1 -->
                <TextView android:layout_width="wrap_content" android:layout_height="wrap_content" android:text="Nhóm 1" android:textColor="#00FF00" android:textStyle="bold"/>
                <Switch android:id="@+id/sw_regedit2" android:layout_width="match_parent" android:layout_height="wrap_content" android:text="Regedit 2.0" android:textColor="#FFFFFF"/>
                <Switch android:id="@+id/sw_regedit4" android:layout_width="match_parent" android:layout_height="wrap_content" android:text="Regedit 4.0" android:textColor="#FFFFFF"/>
                <Switch android:id="@+id/sw_nhetam" android:layout_width="match_parent" android:layout_height="wrap_content" android:text="Nhẹ tâm 1.0" android:textColor="#FFFFFF"/>

                <!-- Nhóm 2 -->
                <TextView android:layout_width="wrap_content" android:layout_height="wrap_content" android:text="Nhóm 2" android:textColor="#00FF00" android:textStyle="bold" android:layout_marginTop="10dp"/>
                <Switch android:id="@+id/sw_fixrung" android:layout_width="match_parent" android:layout_height="wrap_content" android:text="Fix rung 1.0" android:textColor="#FFFFFF"/>
                <Switch android:id="@+id/sw_fixlag" android:layout_width="match_parent" android:layout_height="wrap_content" android:text="Fix lag 1.0" android:textColor="#FFFFFF"/>
                <Switch android:id="@+id/sw_buffman" android:layout_width="match_parent" android:layout_height="wrap_content" android:text="Buff màn 1.1" android:textColor="#FFFFFF"/>

                <!-- Nhóm 3 -->
                <TextView android:layout_width="wrap_content" android:layout_height="wrap_content" android:text="Nhóm 3" android:textColor="#00FF00" android:textStyle="bold" android:layout_marginTop="10dp"/>
                <Switch android:id="@+id/sw_antiban" android:layout_width="match_parent" android:layout_height="wrap_content" android:text="Antiban 2.0" android:textColor="#FFFFFF"/>
                <Switch android:id="@+id/sw_aimdrag" android:layout_width="match_parent" android:layout_height="wrap_content" android:text="AimDrag 1.0" android:textColor="#FFFFFF"/>
                <Switch android:id="@+id/sw_fakeaim" android:layout_width="match_parent" android:layout_height="wrap_content" android:text="Fake Aim Data Headshot 2.1" android:textColor="#FFFFFF"/>

                <!-- Nhóm 4 -->
                <TextView android:layout_width="wrap_content" android:layout_height="wrap_content" android:text="Nhóm 4" android:textColor="#00FF00" android:textStyle="bold" android:layout_marginTop="10dp"/>
                <Switch android:id="@+id/sw_dns" android:layout_width="match_parent" android:layout_height="wrap_content" android:text="DNS (Có thể gây lag)" android:textColor="#FFFFFF"/>

                <!-- Buttons -->
                <LinearLayout android:layout_width="match_parent" android:layout_height="wrap_content" android:orientation="horizontal" android:layout_marginTop="15dp" android:gravity="center">
                    <Button android:id="@+id/btn_yt" android:layout_width="wrap_content" android:layout_height="wrap_content" android:text="YouTube" android:textSize="10sp"/>
                    <Button android:id="@+id/btn_tele" android:layout_width="wrap_content" android:layout_height="wrap_content" android:text="Telegram" android:textSize="10sp"/>
                    <Button android:id="@+id/btn_sp" android:layout_width="wrap_content" android:layout_height="wrap_content" android:text="Hỗ trợ" android:textSize="10sp"/>
                </LinearLayout>
            </LinearLayout>
        </ScrollView>
    </LinearLayout>
</LinearLayout>`
  },
  {
    name: 'MainActivity.java',
    language: 'java',
    content: `package com.avudev.ffmod;

import android.content.Intent;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.provider.Settings;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {

    private static final int SYSTEM_ALERT_WINDOW_PERMISSION = 2084;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        // Tạo layout bằng code cho đơn giản
        android.widget.LinearLayout layout = new android.widget.LinearLayout(this);
        layout.setOrientation(android.widget.LinearLayout.VERTICAL);
        layout.setGravity(android.view.Gravity.CENTER);
        
        android.widget.TextView title = new android.widget.TextView(this);
        title.setText("AVU DEV - FREE MOD");
        title.setTextSize(24);
        title.setGravity(android.view.Gravity.CENTER);
        layout.addView(title);

        Button btnRequest = new Button(this);
        btnRequest.setText("Yêu cầu quyền Overlay");
        btnRequest.setOnClickListener(v -> askPermission());
        layout.addView(btnRequest);

        Button btnStart = new Button(this);
        btnStart.setText("Bắt đầu Mod");
        btnStart.setOnClickListener(v -> {
            if (Build.VERSION.SDK_INT < Build.VERSION_CODES.M || Settings.canDrawOverlays(this)) {
                startService(new Intent(MainActivity.this, MenuService.class));
                Toast.makeText(this, "Đã bật Menu!", Toast.LENGTH_SHORT).show();
            } else {
                askPermission();
                Toast.makeText(this, "Vui lòng cấp quyền trước!", Toast.LENGTH_SHORT).show();
            }
        });
        layout.addView(btnStart);

        setContentView(layout);
    }

    private void askPermission() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M && !Settings.canDrawOverlays(this)) {
            Intent intent = new Intent(Settings.ACTION_MANAGE_OVERLAY_PERMISSION,
                    Uri.parse("package:" + getPackageName()));
            startActivityForResult(intent, SYSTEM_ALERT_WINDOW_PERMISSION);
        } else {
            Toast.makeText(this, "Đã có quyền Overlay!", Toast.LENGTH_SHORT).show();
        }
    }
}`
  },
  {
    name: 'MenuService.java',
    language: 'java',
    content: `package com.avudev.ffmod;

import android.app.Service;
import android.content.Intent;
import android.graphics.PixelFormat;
import android.net.Uri;
import android.os.Build;
import android.os.IBinder;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.MotionEvent;
import android.view.View;
import android.view.WindowManager;
import android.widget.Button;
import android.widget.CompoundButton;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.Switch;
import android.widget.Toast;

public class MenuService extends Service {

    private WindowManager mWindowManager;
    private View mFloatingView;
    private boolean isMenuOpen = false;

    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        mFloatingView = LayoutInflater.from(this).inflate(R.layout.floating_menu, null);

        int layoutFlag;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            layoutFlag = WindowManager.LayoutParams.TYPE_APPLICATION_OVERLAY;
        } else {
            layoutFlag = WindowManager.LayoutParams.TYPE_PHONE;
        }

        final WindowManager.LayoutParams params = new WindowManager.LayoutParams(
                WindowManager.LayoutParams.WRAP_CONTENT,
                WindowManager.LayoutParams.WRAP_CONTENT,
                layoutFlag,
                WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE,
                PixelFormat.TRANSLUCENT);

        params.gravity = Gravity.TOP | Gravity.LEFT;
        params.x = 0;
        params.y = 100;

        mWindowManager = (WindowManager) getSystemService(WINDOW_SERVICE);
        mWindowManager.addView(mFloatingView, params);

        final LinearLayout menuContainer = mFloatingView.findViewById(R.id.menu_container);
        final ImageView iconCloseOpen = mFloatingView.findViewById(R.id.icon_close_open);

        // Xử lý kéo thả
        iconCloseOpen.setOnTouchListener(new View.OnTouchListener() {
            private int initialX;
            private int initialY;
            private float initialTouchX;
            private float initialTouchY;
            private boolean isClick;

            @Override
            public boolean onTouch(View v, MotionEvent event) {
                switch (event.getAction()) {
                    case MotionEvent.ACTION_DOWN:
                        initialX = params.x;
                        initialY = params.y;
                        initialTouchX = event.getRawX();
                        initialTouchY = event.getRawY();
                        isClick = true;
                        return true;
                    case MotionEvent.ACTION_UP:
                        if (isClick) {
                            isMenuOpen = !isMenuOpen;
                            menuContainer.setVisibility(isMenuOpen ? View.VISIBLE : View.GONE);
                        }
                        return true;
                    case MotionEvent.ACTION_MOVE:
                        float dx = event.getRawX() - initialTouchX;
                        float dy = event.getRawY() - initialTouchY;
                        if (Math.abs(dx) > 10 || Math.abs(dy) > 10) {
                            isClick = false;
                        }
                        params.x = initialX + (int) dx;
                        params.y = initialY + (int) dy;
                        mWindowManager.updateViewLayout(mFloatingView, params);
                        return true;
                }
                return false;
            }
        });

        setupSwitches();
        setupButtons();
    }

    private void setupSwitches() {
        int[] switchIds = {
            R.id.sw_regedit2, R.id.sw_regedit4, R.id.sw_nhetam,
            R.id.sw_fixrung, R.id.sw_fixlag, R.id.sw_buffman,
            R.id.sw_antiban, R.id.sw_aimdrag, R.id.sw_fakeaim, R.id.sw_dns
        };

        for (int id : switchIds) {
            Switch sw = mFloatingView.findViewById(id);
            if (sw != null) {
                sw.setOnCheckedChangeListener((buttonView, isChecked) -> {
                    String msg = isChecked ? "Đã bật " : "Đã tắt ";
                    Toast.makeText(MenuService.this, msg + buttonView.getText(), Toast.LENGTH_SHORT).show();
                });
            }
        }
    }

    private void setupButtons() {
        Button btnYt = mFloatingView.findViewById(R.id.btn_yt);
        Button btnTele = mFloatingView.findViewById(R.id.btn_tele);
        Button btnSp = mFloatingView.findViewById(R.id.btn_sp);

        btnYt.setOnClickListener(v -> openLink("https://youtube.com"));
        btnTele.setOnClickListener(v -> openLink("https://t.me"));
        btnSp.setOnClickListener(v -> openLink("https://facebook.com"));
    }

    private void openLink(String url) {
        Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        startActivity(intent);
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        if (mFloatingView != null) mWindowManager.removeView(mFloatingView);
    }
}`
  },
  {
    name: '.github/workflows/android.yml',
    language: 'yaml',
    content: `name: Android CI

on:
  push:
    branches: [ "main" ]
  pull_request:
    branches: [ "main" ]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3
    - name: set up JDK 17
      uses: actions/setup-java@v3
      with:
        java-version: '17'
        distribution: 'temurin'
        cache: gradle

    - name: Grant execute permission for gradlew
      run: chmod +x gradlew

    - name: Build with Gradle
      run: ./gradlew assembleDebug

    - name: Upload APK
      uses: actions/upload-artifact@v3
      with:
        name: app-debug
        path: app/build/outputs/apk/debug/app-debug.apk`
  }
];
