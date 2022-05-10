package com.example.nsucls;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.content.Intent;
import android.graphics.Color;
import android.os.Bundle;
import android.widget.LinearLayout;
import android.widget.TextView;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class ReviewedComplainsActivity extends AppCompatActivity {

    private RecyclerView mRecyclerView;
    private RecyclerView.Adapter mAdapter;
    private RecyclerView.LayoutManager mLayoutManager;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_reviewed_complains);

        mRecyclerView = (RecyclerView) findViewById(R.id.my_recycler_view);

        Intent intent = getIntent();
        String jsonArray = intent.getStringExtra("jsonArray");

        try {
            if (jsonArray.length() == 2){
                LinearLayout linearLayout = (LinearLayout) findViewById(R.id.parentLayout);
                TextView textView = new TextView(this);
                textView.setText("No complains reviewed");
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
                map.put("complainUNID", obj.getString("complainUNID"));
                map.put("title", obj.getJSONObject("Complain").getString("complainTitle"));
                map.put("status", "Status: " + obj.getJSONObject("Complain").getString("status"));
                map.put("latestComment", "Complainer: " + ((obj.getJSONObject("Complain").getJSONObject("User").getString("fullName"))));
                mylist.add(map);
            }

            mLayoutManager = new LinearLayoutManager(this);
            mRecyclerView.setLayoutManager(mLayoutManager);

            // specify an adapter (see also next example)
            mAdapter = new MyComplainsAdapter(mylist);
            mRecyclerView.setAdapter(mAdapter);


        } catch (JSONException e) {
            System.out.println("EIDI LAGBONA");
            e.printStackTrace();
        }
    }
}