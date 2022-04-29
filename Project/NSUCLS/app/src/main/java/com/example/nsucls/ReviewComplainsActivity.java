package com.example.nsucls;

import android.content.Intent;
import android.graphics.Color;
import android.os.Bundle;
import android.widget.LinearLayout;
import android.widget.ListAdapter;
import android.widget.ListView;
import android.widget.SimpleAdapter;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class ReviewComplainsActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_review_complains);
        ListView l = findViewById(R.id.list);

        Intent intent = getIntent();
        String jsonArray = intent.getStringExtra("jsonArray");

        try {
            if (jsonArray.length() == 2){
                LinearLayout linearLayout = new LinearLayout(this);
                setContentView(linearLayout);
                linearLayout.setOrientation(LinearLayout.VERTICAL);
                TextView textView = new TextView(this);
                textView.setText("No complains to review");
                textView.setTextSize(40);
                textView.setTextColor(Color.parseColor("#000000"));
                linearLayout.addView(textView);
                return;
            }
            JSONArray array = new JSONArray(jsonArray);
            List<HashMap<String, String>> mylist =
                    new ArrayList<HashMap<String, String>>();

            for (int i = 0; i < array.length(); i++){
                JSONObject obj = array.getJSONObject(i);
                HashMap<String, String> map = new HashMap<String, String>();
                System.out.println("OY NOKA");
                map.put("title", obj.getJSONObject("Complain").getString("complainTitle"));
                map.put("status", "Status: " + obj.getJSONObject("Complain").getString("status"));
                map.put("complainer", "Complainer: " + ((obj.getJSONObject("Complain").getJSONObject("User").getString("fullName"))));
                mylist.add(map);
            }

            ListAdapter adapter = new SimpleAdapter(this, mylist , R.layout.fragment_review_complain_row,
                    new String[] { "title", "status", "complainer" },new int[] { R.id.title, R.id.status, R.id.complainer});
            l.setAdapter(adapter);
        } catch (JSONException e) {
            System.out.println("EIDI LAGBONA");
            e.printStackTrace();
        }
    }
}