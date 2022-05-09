package com.example.nsucls;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.graphics.Color;
import android.os.Bundle;
import android.util.TypedValue;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.LinearLayout;
import android.widget.ListAdapter;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

public class ComplaintDetailsActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_complaint_details);

        final JSONArray[] description = {new JSONArray()};
        final JSONArray[] reviewer = {new JSONArray()};
        final JSONArray[] complainAgainstJson = {new JSONArray()};
        final JSONArray[] commentsJson = {new JSONArray()};

        Intent intent = getIntent();
        String complainUNID = intent.getStringExtra("complainUNID");


        JsonObjectRequest jsonObjectRequest = new JsonObjectRequest(Request.Method.GET,
                SplashActivity.baseURL + "/home/complain-latest-details/?complainUNID=" + complainUNID,null, new Response.Listener<JSONObject>() {
            @Override
            public void onResponse(JSONObject response) {
                try {
                    JSONObject getSth = response.getJSONObject("data");
                    System.out.println(getSth);

                    String title = getSth.getString("complainTitle");
                    TextView titleHolder = (TextView) findViewById(R.id.actualTitle);
                    titleHolder.setText(title);

                    description[0] = getSth.getJSONArray("ComplainDescriptions");
                    System.out.println(description[0].getJSONObject(0).getString("complainDescription"));
                    TextView descriptionHolder = (TextView) findViewById(R.id.actualDescription);
                    descriptionHolder.setText(description[0].getJSONObject(0).getString("complainDescription"));

                    reviewer[0] = getSth.getJSONArray("ComplainReviewers");
                    TextView reviewerHolder = (TextView) findViewById(R.id.actualReviewer);
                    reviewerHolder.setText(reviewer[0].getJSONObject(0).getJSONObject("User").getString("fullName"));

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

                    ListView complainAgainstListView = (ListView) findViewById(R.id.actualAgainst);

                    List<String> complainAgainst = new ArrayList<String>();
                    complainAgainstJson[0] = getSth.getJSONArray("ComplainAgainsts");
                    for (int i = 0; i < complainAgainstJson[0].length(); i++){
                        complainAgainst.add(complainAgainstJson[0].getJSONObject(i).getJSONObject("User").getString("fullName"));
                    }

                    String[] complainAgainstArr = new String[complainAgainst.size()];
                    complainAgainstArr = complainAgainst.toArray(complainAgainstArr);
                    ArrayAdapter<String> itemsAdapter =
                            new ArrayAdapter<String>(ComplaintDetailsActivity.this, android.R.layout.simple_list_item_1, complainAgainstArr){
                                @Override
                                public View getView(int position, View convertView, ViewGroup parent){
                                    /// Get the Item from ListView
                                    View view = super.getView(position, convertView, parent);

                                    TextView tv = (TextView) view.findViewById(android.R.id.text1);

                                    tv.setTextSize(TypedValue.COMPLEX_UNIT_SP,25);

                                    // Return the view
                                    return view;
                                }
                            };
                    complainAgainstListView.setAdapter(itemsAdapter);
                    setListViewHeightBasedOnChildren(complainAgainstListView);

                    ListView commentsListView = (ListView) findViewById(R.id.actualComments);

                    List<String> commentsList = new ArrayList<String>();
                    commentsJson[0] = getSth.getJSONArray("Comments");
                    System.out.println("PEPE" + commentsJson[0].length());
                    for (int i = 0; i < commentsJson[0].length(); i++){
                        commentsList.add(commentsJson[0].getJSONObject(i).getString("comment"));
                    }

                    if (commentsJson[0].length() == 0){
                        commentsList.add("No comments yet");
                    }

                    String[] commentsArr = new String[commentsList.size()];
                    commentsArr = commentsList.toArray(commentsArr);
                    System.out.println(commentsList);
                    ArrayAdapter<String> itemsAdapter1 =
                            new ArrayAdapter<String>(ComplaintDetailsActivity.this, android.R.layout.simple_list_item_1, commentsArr){
                                @Override
                                public View getView(int position, View convertView, ViewGroup parent){
                                    /// Get the Item from ListView
                                    View view = super.getView(position, convertView, parent);

                                    view.setBackgroundColor(Color.WHITE);

                                    TextView tv = (TextView) view.findViewById(android.R.id.text1);

                                    tv.setTextSize(TypedValue.COMPLEX_UNIT_SP,25);

                                    // Return the view
                                    return view;
                                }
                            };
                    commentsListView.setAdapter(itemsAdapter1);
                    setListViewHeightBasedOnChildren(commentsListView);

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

    }

    private static void setListViewHeightBasedOnChildren(ListView listView) {
        ListAdapter listAdapter = listView.getAdapter();
        if (listAdapter == null)
            return;

        int desiredWidth = View.MeasureSpec.makeMeasureSpec(listView.getWidth(), View.MeasureSpec.UNSPECIFIED);
        int totalHeight = 0;
        View view = null;
        for (int i = 0; i < listAdapter.getCount(); i++) {
            view = listAdapter.getView(i, view, listView);
            if (i == 0)
                view.setLayoutParams(new ViewGroup.LayoutParams(desiredWidth, ViewGroup.LayoutParams.WRAP_CONTENT));

            view.measure(desiredWidth, View.MeasureSpec.UNSPECIFIED);
            totalHeight += view.getMeasuredHeight();
        }
        ViewGroup.LayoutParams params = listView.getLayoutParams();
        params.height = totalHeight + (listView.getDividerHeight() * (listAdapter.getCount() - 1));
        listView.setLayoutParams(params);
    }

}