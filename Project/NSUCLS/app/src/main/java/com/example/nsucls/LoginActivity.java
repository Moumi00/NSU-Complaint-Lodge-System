package com.example.nsucls;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.content.SharedPreferences;
import android.net.Uri;
import android.os.Bundle;
import android.text.method.LinkMovementMethod;
import android.view.View;
import android.widget.ImageButton;
import android.widget.TextView;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.google.android.material.button.MaterialButton;

import org.json.JSONException;
import org.json.JSONObject;

public class LoginActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
        SharedPreferences settings = getApplicationContext().getSharedPreferences("localStorage", 0);
        if (settings.contains("userUNID")) {
            Intent myIntent = new Intent(LoginActivity.this, HomeActivity.class);
            startActivity(myIntent);
        }

        TextView username = (TextView) findViewById(R.id.username);
        TextView password = (TextView) findViewById(R.id.password);

        MaterialButton loginBtn = (MaterialButton) findViewById(R.id.loginButton);

        TextView registerTV = findViewById(R.id.registerNow);
        registerTV.setMovementMethod(LinkMovementMethod.getInstance());
        registerTV.setOnClickListener(view -> {
            Uri uri = Uri.parse(SplashActivity.frontendURL + "/register"); // missing 'http://' will cause crashed
            Intent intent = new Intent(Intent.ACTION_VIEW, uri);
            startActivity(intent);
        });

        ImageButton googleButton = findViewById(R.id.googleButton);
        googleButton.setOnClickListener(view -> {
            Uri uri = Uri.parse(SplashActivity.frontendURL + "/login"); // missing 'http://' will cause crashed
            Intent intent = new Intent(Intent.ACTION_VIEW, uri);
            startActivity(intent);
        });

        loginBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                String usernameVal = username.getText().toString();
                String passwordVal = password.getText().toString();

                JSONObject jsonBody = new JSONObject();

                try {
                    jsonBody.put("email", usernameVal);
                    jsonBody.put("password", passwordVal);
                } catch (JSONException e) {
                    e.printStackTrace();
                }
                JsonObjectRequest jsonObjectRequest = new JsonObjectRequest(Request.Method.POST,
                        SplashActivity.baseURL + "/auth/login", jsonBody, new Response.Listener<JSONObject>() {
                    @Override
                    public void onResponse(JSONObject response) {
                        System.out.println("AISE");

                        try {
                            if (response.getString("error").toString().isEmpty()) {
//                                Toast.makeText(LoginActivity.this, "Logged in", Toast.LENGTH_SHORT).show();
                                SharedPreferences settings = getApplicationContext().getSharedPreferences("localStorage", 0);
                                SharedPreferences.Editor editor = settings.edit();
                                editor.putString("userUNID", response.getJSONObject("data").getString("userUNID"));
                                editor.apply();

                                Intent myIntent = new Intent(LoginActivity.this, HomeActivity.class);
                                startActivity(myIntent);
                            } else {
                                Toast.makeText(LoginActivity.this, response.getString("error").toString(), Toast.LENGTH_SHORT).show();
                            }
//                            System.out.println(response.getString("data"));
//                            System.out.println(response.getString("error"));
                        } catch (Exception e){
                            e.printStackTrace();
                        }
                        //Toast.makeText(LoginActivity.this, "DHUKBE", Toast.LENGTH_SHORT).show();

                    }
                }, new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        Toast.makeText(LoginActivity.this, "DHUKBENA", Toast.LENGTH_SHORT).show();
                        error.printStackTrace();
                    }
                });
                MySingleton.getInstance(LoginActivity.this).addToRequestQueue(jsonObjectRequest);
            }
        });
    }
}