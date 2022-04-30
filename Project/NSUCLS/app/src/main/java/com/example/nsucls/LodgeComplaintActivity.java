package com.example.nsucls;

import android.Manifest;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.AutoCompleteTextView;
import android.widget.Button;
import android.widget.MultiAutoCompleteTextView;

import androidx.appcompat.app.AppCompatActivity;

import com.karumi.dexter.Dexter;
import com.karumi.dexter.PermissionToken;
import com.karumi.dexter.listener.PermissionDeniedResponse;
import com.karumi.dexter.listener.PermissionGrantedResponse;
import com.karumi.dexter.listener.PermissionRequest;
import com.karumi.dexter.listener.single.PermissionListener;

import java.util.ArrayList;
import java.util.Arrays;

public class LodgeComplaintActivity extends AppCompatActivity {

    Button uploadFileButton;


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

        uploadFileButton = (Button) findViewById(R.id.evidence);
        uploadFileButton.setOnClickListener(new View.OnClickListener() {
            public void onClick(View view) {
                Dexter.withActivity(LodgeComplaintActivity.this).withPermission(Manifest.permission.READ_EXTERNAL_STORAGE)
                        .withListener(new PermissionListener() {
                            @Override
                            public void onPermissionGranted(PermissionGrantedResponse permissionGrantedResponse) {
                                Intent intent = new Intent(Intent.ACTION_PICK);
                                intent.setType("image/*");
                                startActivityForResult(Intent.createChooser(intent, "Upload File"), 1);
                            }

                            @Override
                            public void onPermissionDenied(PermissionDeniedResponse permissionDeniedResponse) {

                            }

                            @Override
                            public void onPermissionRationaleShouldBeShown(PermissionRequest permissionRequest, PermissionToken permissionToken) {
                                permissionToken.continuePermissionRequest();
                            }
                        });
            }
        });

//    public void Upload(View view) {
//        startActivity(new Intent(LodgeComplaintActivity.this, Upload.class));
//    }
    }
}
