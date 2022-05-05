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

public class HomeActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_home);
        final JSONArray[] complains = {new JSONArray()};
        final JSONArray[] reviewComplains = {new JSONArray()};


        JsonObjectRequest jsonObjectRequest = new JsonObjectRequest(Request.Method.GET,
                SplashActivity.baseURL + "/home/user-details?userUNID=261b6357-91c8-41c6-a00a-36d657c58fb7",null, new Response.Listener<JSONObject>() {
            @Override
            public void onResponse(JSONObject response) {
                try {
                    JSONObject getSth = response.getJSONObject("data");
                    System.out.println(getSth);
                    String name = "Name: " + getSth.getString("fullName");
                    TextView nameHolder = (TextView) findViewById(R.id.name);
                    nameHolder.setText(name);
                    String nsuId = "NSU ID: " + getSth.getString("nsuId");
                    TextView nsuIdHolder = (TextView) findViewById(R.id.id);
                    nsuIdHolder.setText(nsuId);
                    String email = "Email: " + getSth.getString("email");
                    TextView emailHolder = (TextView) findViewById(R.id.email);
                    emailHolder.setText(email);
                    String designation = "Designation: " + getSth.getString("userType");
                    TextView designationHolder = (TextView) findViewById(R.id.designation);
                    designationHolder.setText(designation);
                    complains[0] = getSth.getJSONArray("Complains");
                    reviewComplains[0] = getSth.getJSONArray("ComplainReviewers");
                    //System.out.println(complains[0].getJSONObject(0));
                } catch (JSONException e) {
                    e.printStackTrace();
                }


            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                Toast.makeText(HomeActivity.this, "DHUKBENA", Toast.LENGTH_SHORT).show();
                error.printStackTrace();
            }
        });
        MySingleton.getInstance(HomeActivity.this).addToRequestQueue(jsonObjectRequest);

        LinearLayout myComplainsLinearlayout = (LinearLayout) findViewById(R.id.myComplains);
        myComplainsLinearlayout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent myIntent = new Intent(HomeActivity.this, MyComplainsActivity.class);
                myIntent.putExtra("jsonArray", complains[0].toString());
                startActivity(myIntent);
            }
        });

        LinearLayout reviewComplainsLinearLayout = (LinearLayout) findViewById(R.id.reviewComplains);
        reviewComplainsLinearLayout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent myIntent = new Intent(HomeActivity.this, ReviewComplainsActivity.class);
                System.out.println(reviewComplains[0]);
                myIntent.putExtra("jsonArray", reviewComplains[0].toString());
                startActivity(myIntent);
            }
        });
    }
}