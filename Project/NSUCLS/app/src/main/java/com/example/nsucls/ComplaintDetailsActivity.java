package com.example.nsucls;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class ComplaintDetailsActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_complaint_details);

        final JSONArray[] description = {new JSONArray()};
        final JSONArray[] reviewer = {new JSONArray()};


        JsonObjectRequest jsonObjectRequest = new JsonObjectRequest(Request.Method.GET,
                "http://10.0.2.2:8000/home/complain-latest-details/?complainUNID=e3b9555a-3681-48a8-b376-382188d47e05",null, new Response.Listener<JSONObject>() {
            @Override
            public void onResponse(JSONObject response) {
                try {
                    JSONObject getSth = response.getJSONObject("data");
                    System.out.println(getSth);

                    String title = getSth.getString("complainTitle");
                    TextView titleHolder = (TextView) findViewById(R.id.actualTitle);
                    titleHolder.setText(title);

                    description[0] = getSth.getJSONArray("ComplainDescriptions");
                    TextView descriptionHolder = (TextView) findViewById(R.id.actualDescription);
                    descriptionHolder.setText(description[0].toString());

                    reviewer[0] = getSth.getJSONArray("ComplainReviewers");
                    TextView reviewerHolder = (TextView) findViewById(R.id.actualReviewer);
                    descriptionHolder.setText(reviewer[0].toString());

                    String lodgerName = getSth.getJSONObject("User").getString("fullName");
                    TextView nameHolder = (TextView) findViewById(R.id.lodgerName);
                    nameHolder.setText(lodgerName);

                    String lodgerNsuId = getSth.getJSONObject("User").getString("nsuId");
                    TextView nsuIdHolder = (TextView) findViewById(R.id.lodgerNsuId);
                    nsuIdHolder.setText(lodgerNsuId);

                    String lodgerEmail = getSth.getJSONObject("User").getString("email");
                    TextView emailHolder = (TextView) findViewById(R.id.lodgerEmail);
                    emailHolder.setText(lodgerEmail);


                    String lodgerDesignation = getSth.getJSONObject("User").getString("userType");
                    TextView designationHolder = (TextView) findViewById(R.id.lodgerDesignation);
                    designationHolder.setText(lodgerDesignation);

                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                Toast.makeText(ComplaintDetailsActivity.this, "DHUKBENA", Toast.LENGTH_SHORT).show();
                error.printStackTrace();
            }
        });
        MySingleton.getInstance(ComplaintDetailsActivity.this).addToRequestQueue(jsonObjectRequest);

//        LinearLayout myComplainsLinearlayout = (LinearLayout) findViewById(R.id.myComplains);
//        myComplainsLinearlayout.setOnClickListener(new View.OnClickListener() {
//            @Override
//            public void onClick(View view) {
//                Intent myIntent = new Intent(HomeActivity.this, MyComplainsActivity.class);
//                myIntent.putExtra("jsonArray", complains[0].toString());
//                startActivity(myIntent);
//            }
//        });

//        LinearLayout reviewComplainsLinearLayout = (LinearLayout) findViewById(R.id.reviewComplains);
//        reviewComplainsLinearLayout.setOnClickListener(new View.OnClickListener() {
//            @Override
//            public void onClick(View view) {
//                Intent myIntent = new Intent(HomeActivity.this, ReviewComplainsActivity.class);
//                System.out.println(reviewComplains[0]);
//                myIntent.putExtra("jsonArray", reviewComplains[0].toString());
//                startActivity(myIntent);
//            }
//        });
    }

}