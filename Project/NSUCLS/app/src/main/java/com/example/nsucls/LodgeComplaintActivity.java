package com.example.nsucls;

import androidx.appcompat.app.AppCompatActivity;
import android.os.Bundle;
import android.view.MotionEvent;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.AutoCompleteTextView;
import android.widget.MultiAutoCompleteTextView;

import java.util.ArrayList;
import java.util.Arrays;

public class LodgeComplaintActivity extends AppCompatActivity {


    private static final String[] COUNTRIES = new String[] {
            "Belgium", "France", "Italy", "Germany", "Spain"
    };

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_lodge_complaint);

        ArrayAdapter<String> adapter1 = new ArrayAdapter<String>(this,
                android.R.layout.simple_dropdown_item_1line, COUNTRIES);
        MultiAutoCompleteTextView multiTextView = (MultiAutoCompleteTextView)
                findViewById(R.id.complainAgainst);
        multiTextView.setAdapter(adapter1);
        multiTextView.setTokenizer(new MultiAutoCompleteTextView.CommaTokenizer());

        ArrayAdapter<String> adapter2 = new ArrayAdapter<String>(this,
                android.R.layout.simple_dropdown_item_1line, COUNTRIES);
        AutoCompleteTextView autoTextView = (AutoCompleteTextView)
                findViewById(R.id.complainReviewer);
        autoTextView.setAdapter(adapter2);

        multiTextView.setOnFocusChangeListener(new View.OnFocusChangeListener() {
            public void onFocusChange(View v, boolean hasFocus) {
                if (!hasFocus) {
                    ArrayList<String> results = new ArrayList<>(Arrays.asList(COUNTRIES));
                    if (results.size() == 0 ||
                            results.indexOf(multiTextView.getText().toString()) == -1) {
                        multiTextView.setError("Invalid username." + multiTextView.getText().toString());
                    }
                }
            }
        });

        autoTextView.setOnFocusChangeListener(new View.OnFocusChangeListener() {
            public void onFocusChange(View v, boolean hasFocus) {
                if (!hasFocus) {
                    ArrayList<String> results = new ArrayList<>(Arrays.asList(COUNTRIES));
                    if (results.size() == 0 ||
                            results.indexOf(autoTextView.getText().toString()) == -1) {
                        autoTextView.setError("Invalid username.");
                    }
                }
            }
        });

    }
}
