package com.example.nsucls;

import androidx.appcompat.app.AppCompatActivity;

import android.app.DownloadManager;
import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.graphics.Paint;
import android.net.Uri;
import android.os.Bundle;
import android.os.Environment;
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

public class ComplaintDetailsActivity extends AppCompatActivity implements View.OnClickListener{

    //To store the JSON Arrays received
    final JSONArray[] description = {new JSONArray()};
    final JSONArray[] reviewer = {new JSONArray()};
    final JSONArray[] complainAgainstJson = {new JSONArray()};
    final JSONArray[] commentsJson = {new JSONArray()};
    final JSONArray[] evidenceJson = {new JSONArray()};
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_complaint_details);



        Intent intent = getIntent();
        String complainUNID = intent.getStringExtra("complainUNID");

        //API call to backend to receive data
        JsonObjectRequest jsonObjectRequest = new JsonObjectRequest(Request.Method.GET,
                SplashActivity.baseURL + "/home/complain-latest-details/?complainUNID=" + complainUNID,null, new Response.Listener<JSONObject>() {
            @Override
            public void onResponse(JSONObject response) {
                try {
                    JSONObject getSth = response.getJSONObject("data");
                    System.out.println(getSth);

                    //Storing backend data in variables
                    String title = getSth.getString("complainTitle");
                    description[0] = getSth.getJSONArray("ComplainDescriptions");
                    reviewer[0] = getSth.getJSONArray("ComplainReviewers");
                    String lodgerName = getSth.getJSONObject("User").getString("fullName");
                    String lodgerNsuId = getSth.getJSONObject("User").getString("nsuId");
                    String lodgerEmail = getSth.getJSONObject("User").getString("email");
                    String lodgerDesignation = getSth.getJSONObject("User").getString("userType");
                    complainAgainstJson[0] = getSth.getJSONArray("ComplainAgainsts");
                    commentsJson[0] = getSth.getJSONArray("Comments");
                    evidenceJson[0] = getSth.getJSONArray("Evidence");


                    //Showing values in textview
                    TextView titleHolder = (TextView) findViewById(R.id.actualTitle);
                    titleHolder.setText(title);
                    TextView descriptionHolder = (TextView) findViewById(R.id.actualDescription);
                    descriptionHolder.setText(description[0].getJSONObject(0).getString("complainDescription"));
                    TextView reviewerHolder = (TextView) findViewById(R.id.actualReviewer);
                    reviewerHolder.setText(reviewer[0].getJSONObject(0).getJSONObject("User").getString("fullName"));
                    TextView nameHolder = (TextView) findViewById(R.id.lodgerName);
                    nameHolder.setText(lodgerName);
                    TextView nsuIdHolder = (TextView) findViewById(R.id.lodgerNsuId);
                    nsuIdHolder.setText(lodgerNsuId);
                    TextView emailHolder = (TextView) findViewById(R.id.lodgerEmail);
                    emailHolder.setText(lodgerEmail);
                    TextView designationHolder = (TextView) findViewById(R.id.lodgerDesignation);
                    designationHolder.setText(lodgerDesignation);
                    ListView complainAgainstListView = (ListView) findViewById(R.id.actualAgainst);
                    List<String> complainAgainst = new ArrayList<String>();
                    for (int i = 0; i < complainAgainstJson[0].length(); i++){
                        complainAgainst.add(complainAgainstJson[0].getJSONObject(i).getJSONObject("User").getString("fullName"));
                    }
                    String[] complainAgainstArr = new String[complainAgainst.size()];
                    complainAgainstArr = complainAgainst.toArray(complainAgainstArr);
                    ArrayAdapter<String> itemsAdapter =
                            new ArrayAdapter<String>(ComplaintDetailsActivity.this, android.R.layout.simple_list_item_1, complainAgainstArr){
                                @Override
                                public View getView(int position, View convertView, ViewGroup parent){
                                    View view = super.getView(position, convertView, parent);
                                    TextView tv = (TextView) view.findViewById(android.R.id.text1);
                                    tv.setTextSize(TypedValue.COMPLEX_UNIT_SP,25);
                                    return view;
                                }
                            };
                    complainAgainstListView.setAdapter(itemsAdapter);
                    setListViewHeightBasedOnChildren(complainAgainstListView);
                    ListView commentsListView = (ListView) findViewById(R.id.actualComments);
                    List<String> commentsList = new ArrayList<String>();
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
                                    View view = super.getView(position, convertView, parent);
                                    view.setBackgroundColor(Color.WHITE);
                                    TextView tv = (TextView) view.findViewById(android.R.id.text1);
                                    tv.setTextSize(TypedValue.COMPLEX_UNIT_SP,25);
                                    return view;
                                }
                            };
                    commentsListView.setAdapter(itemsAdapter1);
                    setListViewHeightBasedOnChildren(commentsListView);
                    LinearLayout evidenceLayout = ((LinearLayout) findViewById(R.id.evidenceLayout));
                    for (int i = 0; i < evidenceJson[0].length(); i++){

                        TextView textView = new TextView(ComplaintDetailsActivity.this);
                        textView.setPaintFlags(textView.getPaintFlags() | Paint.UNDERLINE_TEXT_FLAG);
                        textView.setText("Evidence " + (i + 1));
                        textView.setTextSize(TypedValue.COMPLEX_UNIT_SP,25);
                        textView.setClickable(true);
                        textView.setTextColor(Color.parseColor("#4fadfa"));

                        textView.setOnClickListener(ComplaintDetailsActivity.this);
                        evidenceLayout.addView(textView);

                    }
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

    //OnClick for evidence
    @Override
    public void onClick(View v){
        TextView tv = (TextView) v;
        System.out.println(tv.getText().toString());
        String parts[] = tv.getText().toString().split(" ", 2);
        DownloadManager downloadManager = (DownloadManager) getSystemService(Context.DOWNLOAD_SERVICE);
        Uri uri = null;
        try {
            uri = Uri.parse(SplashActivity.baseURL + "/uploads/Evidence/" + evidenceJson[0].getJSONObject(Integer.parseInt(parts[1]) - 1).getString("evidence"));
        } catch (JSONException e) {
            e.printStackTrace();
        }
        DownloadManager.Request request = new DownloadManager.Request(uri);
        request.setVisibleInDownloadsUi(true);
        request.setNotificationVisibility(DownloadManager.Request.VISIBILITY_VISIBLE_NOTIFY_COMPLETED);
        request.setDestinationInExternalPublicDir(Environment.DIRECTORY_DOWNLOADS, uri.getLastPathSegment());
        downloadManager.enqueue(request);
    }



    //Used for dynamically setting height of the list view
    //This is required because we cant set a listview inside scroll view
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