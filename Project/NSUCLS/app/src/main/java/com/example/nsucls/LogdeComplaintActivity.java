package com.example.nsucls;

import androidx.appcompat.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.ArrayAdapter;

import com.hootsuite.nachos.NachoTextView;

public class LogdeComplaintActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_logde_complaint);
        String[] suggestions = new String[]{"Tortilla Chips", "Melted Cheese", "Salsa", "Guacamole", "Mexico", "Jalapeno"};
        ArrayAdapter<String> adapter = new ArrayAdapter<>(this, android.R.layout.simple_dropdown_item_1line, suggestions);
        NachoTextView nachoTextView = (NachoTextView) findViewById(R.id.nacho_text_view);
        nachoTextView.setAdapter(adapter);
    }
}