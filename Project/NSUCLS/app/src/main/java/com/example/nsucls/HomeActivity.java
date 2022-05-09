package com.example.nsucls;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
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

public class HomeActivity extends AppCompatActivity implements View.OnClickListener{
    final JSONArray[] complains = {new JSONArray()};
    final JSONArray[] reviewComplains = {new JSONArray()};
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_home);
        SharedPreferences settings = getApplicationContext().getSharedPreferences("localStorage", 0);
        if (!settings.contains("userUNID")){
            Intent myIntent = new Intent(HomeActivity.this, LoginActivity.class);
            startActivity(myIntent);
        }
        String userUNID = settings.getString("userUNID", null);


        JsonObjectRequest jsonObjectRequest = new JsonObjectRequest(Request.Method.GET,
                SplashActivity.baseURL + "/home/user-details?userUNID=" + userUNID,null, new Response.Listener<JSONObject>() {
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
        LinearLayout reviewComplainsLinearLayout = (LinearLayout) findViewById(R.id.reviewComplains);
        LinearLayout lodgeComplainLayout = (LinearLayout) findViewById(R.id.lodgeComplain);
        ImageView myComplainsImage = (ImageView) findViewById(R.id.myComplainsImage);
        ImageView reviewedComplainsImage = (ImageView) findViewById(R.id.reviewedComplainsImage);
        ImageView lodgeComplainImage = (ImageView) findViewById(R.id.lodgeComplainImage);
        Button logoutButton = (Button) findViewById(R.id.logoutButton);

        myComplainsLinearlayout.setOnClickListener(this);
        reviewComplainsLinearLayout.setOnClickListener(this);
        lodgeComplainLayout.setOnClickListener(this);
        myComplainsImage.setOnClickListener(this);
        reviewedComplainsImage.setOnClickListener(this);
        lodgeComplainImage.setOnClickListener(this);
        logoutButton.setOnClickListener(this);



    }
    @Override
    public void onClick(View v) {
        switch(v.getId()){
            case R.id.myComplains:
            case R.id.myComplainsImage:
                Intent firstIntent = new Intent(HomeActivity.this, MyComplainsActivity.class);
                firstIntent.putExtra("jsonArray", complains[0].toString());
                startActivity(firstIntent);
                break;
            case R.id.reviewComplains:
            case R.id.reviewedComplainsImage:
                Intent secondIntent = new Intent(HomeActivity.this, ReviewComplainsActivity.class);
                System.out.println(reviewComplains[0]);
                secondIntent.putExtra("jsonArray", reviewComplains[0].toString());
                startActivity(secondIntent);
                break;
            case R.id.lodgeComplain:
            case R.id.lodgeComplainImage:
                System.out.println("POPO");
                Intent thirdIntent = new Intent(HomeActivity.this, LodgeComplaintActivity.class);
                startActivity(thirdIntent);
                break;
            case R.id.logoutButton:
                SharedPreferences settings = getApplicationContext().getSharedPreferences("localStorage", 0);
                SharedPreferences.Editor editor = settings.edit();
                System.out.println(settings.contains("userUNID"));
                editor.remove("userUNID");
                editor.apply();
                System.out.println(settings.contains("userUNID"));
                Intent myIntent = new Intent(HomeActivity.this, LoginActivity.class);
                startActivity(myIntent);
                break;
        }

    }
}