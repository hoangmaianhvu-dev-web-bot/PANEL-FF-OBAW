package com.avudev.ffmod;

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
        layout.setBackgroundColor(android.graphics.Color.parseColor("#0A0A0A"));
        
        android.widget.TextView title = new android.widget.TextView(this);
        title.setText("AVU DEV - PREMIUM MOD MENU");
        title.setTextColor(android.graphics.Color.parseColor("#FFD700"));
        title.setTextSize(20);
        title.setGravity(android.view.Gravity.CENTER);
        title.setPadding(0, 0, 0, 50);
        layout.addView(title);

        Button btnRequest = new Button(this);
        btnRequest.setText("Yêu cầu quyền Overlay");
        btnRequest.setOnClickListener(v -> askPermission());
        layout.addView(btnRequest);

        Button btnStart = new Button(this);
        btnStart.setText("OPEN MENU PANEL FF OBAW");
        btnStart.setOnClickListener(v -> {
            if (Build.VERSION.SDK_INT < Build.VERSION_CODES.M || Settings.canDrawOverlays(this)) {
                startService(new Intent(MainActivity.this, MenuService.class));
                Toast.makeText(this, "Đã bật Menu!", Toast.LENGTH_SHORT).show();
                finish(); // Đóng app chính sau khi mở menu
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
}