package com.example.nsucls;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.content.Intent;
import android.graphics.Color;
import android.os.Bundle;
import android.util.TypedValue;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.ListAdapter;
import android.widget.ListView;
import android.widget.RelativeLayout;
import android.widget.SimpleAdapter;
import android.widget.TextView;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;

public class MyComplainsActivity extends AppCompatActivity {

    private RecyclerView mRecyclerView;
    private RecyclerView.Adapter mAdapter;
    private RecyclerView.LayoutManager mLayoutManager;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_my_complains);
        mRecyclerView = (RecyclerView) findViewById(R.id.my_recycler_view);

        Intent intent = getIntent();
        String jsonArray = intent.getStringExtra("jsonArray");

        try {
            if (jsonArray.length() == 2){
                LinearLayout linearLayout = (LinearLayout) findViewById(R.id.parentLayout);
                TextView textView = new TextView(this);
                textView.setText("No complains yet");
                textView.setTextSize(40);
                textView.setTextColor(Color.parseColor("#000000"));
                linearLayout.addView(textView, 2);
                return;
            }
            JSONArray array = new JSONArray(jsonArray);
            List<HashMap<String, String>> mylist =
                    new ArrayList<HashMap<String, String>>();

            for (int i = 0; i < array.length(); i++){
                JSONObject obj = array.getJSONObject(i);
                HashMap<String, String> map = new HashMap<String, String>();
                System.out.println("OY NOKA");
                map.put("title", "Title: " + obj.getString("complainTitle"));
                map.put("status", "Status: " + obj.getString("status"));

                map.put("latestComment", "Latest Comment: " + ((obj.getJSONArray("Comments").length() == 0) ? "No comments yet" : obj.getJSONArray("Comments").getJSONObject(0).getString("comment")));
                map.put("complainUNID", obj.getString("complainUNID"));
                mylist.add(map);
            }

            mLayoutManager = new LinearLayoutManager(this);
            mRecyclerView.setLayoutManager(mLayoutManager);

            mAdapter = new MyComplainsAdapter(mylist);
            mRecyclerView.setAdapter(mAdapter);



        } catch (JSONException e) {
            System.out.println("EIDI LAGBONA");
            e.printStackTrace();
        }

    }
}