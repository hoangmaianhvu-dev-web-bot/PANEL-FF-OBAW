package com.avudev.ffmod;

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
import android.widget.Switch;
import android.widget.Toast;

public class MenuService extends Service {

    private WindowManager mWindowManager;
    private View mFloatingView;
    private boolean isMenuOpen = false;
    private int clickCount = 0;
    private long lastClickTime = 0;

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

        final View menuContainer = mFloatingView.findViewById(R.id.menu_container);
        final View iconCloseOpen = mFloatingView.findViewById(R.id.icon_close_open);
        final View menuHeader = mFloatingView.findViewById(R.id.menu_header);

        if (menuHeader != null) {
            menuHeader.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    long currentTime = System.currentTimeMillis();
                    if (currentTime - lastClickTime > 1000) {
                        clickCount = 0;
                    }
                    clickCount++;
                    lastClickTime = currentTime;

                    if (clickCount >= 5) {
                        Toast.makeText(MenuService.this, "Đã tắt Menu hoàn toàn!", Toast.LENGTH_SHORT).show();
                        stopSelf();
                    }
                }
            });
        }

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
            R.id.sw_aimdrag, R.id.sw_fakeaim,
            R.id.sw_fixrung, R.id.sw_fixlag, R.id.sw_buffman,
            R.id.sw_antiban, R.id.sw_dns
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

        if(btnYt != null) btnYt.setOnClickListener(v -> openLink("https://youtube.com"));
        if(btnTele != null) btnTele.setOnClickListener(v -> openLink("https://t.me"));
        if(btnSp != null) btnSp.setOnClickListener(v -> openLink("https://facebook.com"));
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
}
