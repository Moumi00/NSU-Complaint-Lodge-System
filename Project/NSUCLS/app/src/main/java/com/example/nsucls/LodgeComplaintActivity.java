package com.example.nsucls;

import android.Manifest;
import android.annotation.SuppressLint;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.database.Cursor;
import android.graphics.Color;
import android.net.Uri;
import android.os.Bundle;
import android.provider.OpenableColumns;
import android.text.Editable;
import android.text.TextWatcher;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.AutoCompleteTextView;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.MultiAutoCompleteTextView;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import com.android.volley.Request;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.w3c.dom.Text;

import java.util.ArrayList;
import java.util.Arrays;
import java.io.File;
import java.util.HashMap;
import java.util.List;
import okhttp3.MediaType;
import okhttp3.MultipartBody;
import okhttp3.RequestBody;
import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class LodgeComplaintActivity extends AppCompatActivity {

    private String complainTitle, complainDescription;
    private Button uploadFileButton;
    private int STORAGE_PERMISSION_CODE = 1;
    private List<Uri> images = new ArrayList<>();
    final ArrayList<User> reviewers = new ArrayList<User>();
    final ArrayList<User> complainAgainst = new ArrayList<User>();
    User reviewerName;
    private ArrayList<User> complainAgainstUsers = new ArrayList<User>();

    private static final String[] COUNTRIES = new String[] {
            "Belgium", "France", "Italy", "Germany", "Spain"
    };

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_lodge_complaint);

//        ArrayAdapter<String> adapter = new ArrayAdapter<String>(this,
//                android.R.layout.simple_dropdown_item_1line, COUNTRIES);
//        MultiAutoCompleteTextView textView = findViewById(R.id.edit);
//        textView.setAdapter(adapter);
//        textView.setTokenizer(new MultiAutoCompleteTextView.CommaTokenizer());


        MultiAutoCompleteTextView complainAgainstTextField = (MultiAutoCompleteTextView)
                findViewById(R.id.complainAgainst);
//        complainAgainstTextField.setTokenizer(new MultiAutoCompleteTextView.CommaTokenizer());
        complainAgainstTextField.setThreshold(1);

        complainAgainstTextField.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence charSequence, int i, int i1, int i2) {

            }

            @Override
            public void onTextChanged(CharSequence charSequence, int i, int i1, int i2) {

            }

            @Override
            public void afterTextChanged(Editable editable) {
                System.out.println(editable);
                String value = null;
                if (editable.toString().contains(",")) {
                    value = (editable).toString().substring(editable.toString().lastIndexOf(",") + 1).trim();
                }
                if (value == null){
                    value = editable.toString();
                }
                System.out.println(value);
                JsonObjectRequest jsonObjectRequest = new JsonObjectRequest(Request.Method.GET,
                        SplashActivity.baseURL + "/home/complain-against?query=" + value + "&userUNID=30d5cadb-89c0-4114-9368-9e0cb2942b75", null, new com.android.volley.Response.Listener<JSONObject>() {
                    @Override
                    public void onResponse(JSONObject response) {
                        System.out.println(response);
                        try {
                            JSONArray jsonArray = response.getJSONArray("data");
                            complainAgainst.clear();
                            for (int i = 0; i < jsonArray.length(); i++){
                                JSONObject obj = jsonArray.getJSONObject(i);
                                if (reviewerName != null && reviewerName.getName().equals(obj.getString("uniqueDetail").toString())){
                                    continue;
                                }
                                complainAgainst.add(new User(obj.getString("uniqueDetail").toString(), obj.getString("userUNID").toString()));
                            }
                            System.out.println(complainAgainst);
                            ArrayAdapter<User> adapter = new ArrayAdapter<User>(
                                    LodgeComplaintActivity.this, android.R.layout.simple_dropdown_item_1line, complainAgainst);
                            complainAgainstTextField.setAdapter(adapter);
                            complainAgainstTextField.setTokenizer(new MultiAutoCompleteTextView.CommaTokenizer());
                            complainAgainstTextField.setThreshold(1);
                            adapter.notifyDataSetChanged();

                        } catch (JSONException e) {
                            e.printStackTrace();
                        }


                    }
                }, new com.android.volley.Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        error.printStackTrace();
                    }
                }
                );
                MySingleton.getInstance(LodgeComplaintActivity.this).addToRequestQueue(jsonObjectRequest);
            }
        });

        complainAgainstTextField.setOnFocusChangeListener(new View.OnFocusChangeListener() {
            public void onFocusChange(View v, boolean hasFocus) {
                if (!hasFocus) {
                    complainAgainstUsers.clear();
                    String[] names = complainAgainstTextField.getText().toString().split("\\s*,\\s*");
                    for (int i = 0; i < complainAgainst.size(); i++){
                        if (Arrays.stream(names).anyMatch(complainAgainst.get(i).toString()::equals)){
                            complainAgainstUsers.add(complainAgainst.get(i));
                        }
                    }
                    if (complainAgainstUsers.isEmpty())
                        complainAgainstTextField.setError("Pick a correct user to review.");
                }
            }
        });


        AutoCompleteTextView complainReviewerTextField = (AutoCompleteTextView)
                findViewById(R.id.complainReviewer);
        complainReviewerTextField.setThreshold(1);
        complainReviewerTextField.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence charSequence, int i, int i1, int i2) {

            }

            @Override
            public void onTextChanged(CharSequence charSequence, int i, int i1, int i2) {

            }

            @Override
            public void afterTextChanged(Editable editable) {
                System.out.println(editable);
                JsonObjectRequest jsonObjectRequest = new JsonObjectRequest(Request.Method.GET,
                        SplashActivity.baseURL + "/home/reviewers?query=" + editable + "&userUNID=b1b04005-be0e-4e0e-8997-ba81a8434a3b", null, new com.android.volley.Response.Listener<JSONObject>() {
                    @Override
                    public void onResponse(JSONObject response) {
                        System.out.println(response);
                        try {
                            JSONArray jsonArray = response.getJSONArray("data");
                            reviewers.clear();
                            for (int i = 0; i < jsonArray.length(); i++){
                                JSONObject obj = jsonArray.getJSONObject(i);
                                User temp = new User(obj.getString("uniqueDetail").toString(), obj.getString("userUNID").toString());
                                System.out.println(temp);
                                int tempo = 0;
                                for (User user : complainAgainstUsers){
                                    if (user.getName().equals(temp.getName())){
                                        tempo = 1;
                                    }
                                }
                                if (tempo == 0)
                                    reviewers.add(temp);
                            }
                            System.out.println(reviewers);
                            ArrayAdapter<User> adapter = new ArrayAdapter<User>(
                                    LodgeComplaintActivity.this, android.R.layout.simple_dropdown_item_1line, reviewers);
                            complainReviewerTextField.setAdapter(adapter);
                            complainReviewerTextField.setThreshold(1);
                            adapter.notifyDataSetChanged();

                        } catch (JSONException e) {
                            e.printStackTrace();
                        }


                    }
                }, new com.android.volley.Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        error.printStackTrace();
                    }
                }
                );
                MySingleton.getInstance(LodgeComplaintActivity.this).addToRequestQueue(jsonObjectRequest);
            }
        });

        complainReviewerTextField.setOnFocusChangeListener(new View.OnFocusChangeListener() {
            public void onFocusChange(View v, boolean hasFocus) {
                if (!hasFocus) {

                    for (int i = 0; i < reviewers.size(); i++){
                        if (reviewers.get(i).toString().equals(complainReviewerTextField.getText().toString())){
                            reviewerName = reviewers.get(i);
                            return;
                        }
                    }
                    reviewerName = null;
                    complainReviewerTextField.setError("Pick a correct user to review.");
                }
            }
        });

        uploadFileButton = (Button) findViewById(R.id.evidence);
        uploadFileButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (ContextCompat.checkSelfPermission(LodgeComplaintActivity.this,
                        Manifest.permission.READ_EXTERNAL_STORAGE) == PackageManager.PERMISSION_GRANTED) {
                    Intent gallery = new Intent(Intent.ACTION_GET_CONTENT);
                    gallery.setType("image/*"); //allow any image file type.
                    gallery.putExtra(Intent.EXTRA_ALLOW_MULTIPLE, true);
                    startActivityForResult(gallery, 1);
                } else {
                    requestStoragePermission();
                }
            }
        });

        Button lodgeComplaintButton = (Button) findViewById(R.id.lodgeComplaintButton);
        lodgeComplaintButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if (checkValidity()) {
                    System.out.println(images.size());
//                    uploadToServer();
                }
            }
        });

    }

    private boolean checkValidity(){
        complainTitle = ((TextView)findViewById(R.id.complaintTile)).getText().toString();
        complainDescription = ((TextView)findViewById(R.id.complaintDescription)).getText().toString();

        if (complainTitle.isEmpty() || complainTitle.length() > 255) {
            ((TextView)findViewById(R.id.complaintTile)).setError("Must be less than 255 characters");
            return false;
        }
        if (complainDescription.isEmpty() || complainDescription.length() > 255) {
            ((TextView)findViewById(R.id.complaintDescription)).setError("Must be less than 255 characters");
            return false;
        }
        if (images.size() == 0){
            Toast.makeText(this, "No Image Selected", Toast.LENGTH_SHORT).show();
            return false;
        }
        if (complainAgainstUsers.size() == 0) {
            ((MultiAutoCompleteTextView)findViewById(R.id.complainAgainst)).setError("Select user(s) to complain against");
            return false;
        }
        if (reviewerName == null) {
            ((AutoCompleteTextView)findViewById(R.id.complainReviewer)).setError("Select user to review complaint");
            return false;
        }

        return true;
    }

    private void requestStoragePermission() {
        if (ActivityCompat.shouldShowRequestPermissionRationale(this,
                Manifest.permission.READ_EXTERNAL_STORAGE)) {

            new AlertDialog.Builder(this)
                    .setTitle("Permission needed")
                    .setMessage("This permission is needed because of this and that")
                    .setPositiveButton("ok", new DialogInterface.OnClickListener() {
                        @Override
                        public void onClick(DialogInterface dialog, int which) {
                            ActivityCompat.requestPermissions(LodgeComplaintActivity.this,
                                    new String[] {Manifest.permission.READ_EXTERNAL_STORAGE}, STORAGE_PERMISSION_CODE);
                        }
                    })
                    .setNegativeButton("cancel", new DialogInterface.OnClickListener() {
                        @Override
                        public void onClick(DialogInterface dialog, int which) {
                            dialog.dismiss();
                        }
                    })
                    .create().show();

        } else {
            ActivityCompat.requestPermissions(this,
                    new String[] {Manifest.permission.READ_EXTERNAL_STORAGE}, STORAGE_PERMISSION_CODE);
        }
    }


    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        if (requestCode == STORAGE_PERMISSION_CODE) {
            if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                Intent gallery = new Intent(Intent.ACTION_GET_CONTENT);
                gallery.setType("image/*"); //allow any image file type.
                gallery.putExtra(Intent.EXTRA_ALLOW_MULTIPLE, true);
                startActivityForResult(gallery, 1);
            } else {
                Toast.makeText(this, "Permission DENIED", Toast.LENGTH_SHORT).show();
            }
        }
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        if(resultCode != RESULT_CANCELED){

            switch (requestCode){
                case 1:
                    if(resultCode == RESULT_OK && data != null){
                        System.out.println("EDDUR AISE AND ");
                        LinearLayout linearLayout = (LinearLayout) findViewById(R.id.linearLayoutEvidence);
                        linearLayout.setOrientation(LinearLayout.VERTICAL);
                        LinearLayout.LayoutParams params1 = new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.WRAP_CONTENT);
                        params1.setMargins(150,50,10,50);
                        LinearLayout.LayoutParams textViewParams = new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.WRAP_CONTENT, 1.0F);
                        textViewParams.setMargins(50,50,10,50);
                        LinearLayout.LayoutParams buttonParams = new LinearLayout.LayoutParams(LinearLayout.LayoutParams.WRAP_CONTENT, LinearLayout.LayoutParams.WRAP_CONTENT);
                        buttonParams.setMargins(50,50,10,50);


                        if (data.getData() == null) {
                            int count = data.getClipData().getItemCount();
                            System.out.println(count);
                            for (int i = 0; i < count; i++) {
                                Uri image = data.getClipData().getItemAt(i).getUri();
                                String imagePath = FileUtils.getPath(LodgeComplaintActivity.this, image);
                                images.add(Uri.parse(imagePath));

                                //Layout for individual line
                                LinearLayout individualLineForEvidence = new LinearLayout(this);
                                individualLineForEvidence.setLayoutParams(new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.WRAP_CONTENT));
                                individualLineForEvidence.setOrientation(LinearLayout.HORIZONTAL);
                                individualLineForEvidence.setBackgroundColor((Color.parseColor("#ffffff")));
                                individualLineForEvidence.setLayoutParams(params1);
                                linearLayout.addView(individualLineForEvidence);


                                //Textview for file name
                                TextView textView = new TextView(this);
                                textView.setText(getFileName(image));
                                textView.setLayoutParams(textViewParams);
                                textView.setTextSize(15);
                                textView.setTextColor(Color.parseColor("#000000"));


                                //Button to remove file
                                Button myButton = new Button(this);
                                myButton.setText("X");
                                myButton.setLayoutParams(buttonParams);

                                myButton.setOnClickListener(new View.OnClickListener() {
                                    @Override
                                    public void onClick(View view) {
                                        System.out.println(images.size());
                                        images.remove(Uri.parse(imagePath));
                                        System.out.println(images.size());
                                        linearLayout.removeView(individualLineForEvidence);
                                    }
                                });

                                //Adding to parent
                                individualLineForEvidence.addView(textView);
                                individualLineForEvidence.addView(myButton);

                            }
                        } else {
                            Uri image = data.getData();
                            String imagePath = FileUtils.getPath(LodgeComplaintActivity.this, image);
                            images.add(Uri.parse(imagePath));

                            //Layout for individual line
                            LinearLayout individualLineForEvidence = new LinearLayout(this);
                            individualLineForEvidence.setLayoutParams(new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.WRAP_CONTENT));
                            individualLineForEvidence.setOrientation(LinearLayout.HORIZONTAL);
                            individualLineForEvidence.setBackgroundColor((Color.parseColor("#ffffff")));
                            individualLineForEvidence.setLayoutParams(params1);
                            linearLayout.addView(individualLineForEvidence);

                            //Textview for file name
                            TextView textView = new TextView(this);
                            textView.setText(getFileName(image));
                            textView.setLayoutParams(textViewParams);
                            textView.setTextSize(15);
                            textView.setTextColor(Color.parseColor("#000000"));

                            //Button to remove file
                            Button myButton = new Button(this);
                            myButton.setText("X");
                            myButton.setLayoutParams(buttonParams);

                            myButton.setOnClickListener(new View.OnClickListener() {
                                @Override
                                public void onClick(View view) {
                                    System.out.println(images.size());
                                    images.remove(Uri.parse(imagePath));
                                    System.out.println(images.size());
                                    linearLayout.removeView(individualLineForEvidence);
                                }
                            });

                            //Adding to parent
                            individualLineForEvidence.addView(textView);
                            individualLineForEvidence.addView(myButton);
                        }

                    }
            }

        }
    }

    @SuppressLint("Range")
    public String getFileName(Uri uri) {
        String result = null;
        if (uri.getScheme().equals("content")) {
            Cursor cursor = getContentResolver().query(uri, null, null, null, null);
            try {
                if (cursor != null && cursor.moveToFirst()) {
                    result = cursor.getString(cursor.getColumnIndex(OpenableColumns.DISPLAY_NAME));
                }
            } finally {
                cursor.close();
            }
        }
        if (result == null) {
            result = uri.getPath();
            int cut = result.lastIndexOf('/');
            if (cut != -1) {
                result = result.substring(cut + 1);
            }
        }
        return result;
    }

    public void uploadToServer(){

        String description="BHUT HARD";
        List<MultipartBody.Part> list = new ArrayList<>();
        for(Uri uri: images){
            list.add(prepareFiles("file", uri));
        }

        UploadApis service = RetrofitBuilder.getClient().create(UploadApis.class);
        Call<ResponseBody> call = service.callMultipleUploadApi(list, description);
        call.enqueue(new Callback<ResponseBody>() {
            @Override
            public void onResponse(Call<ResponseBody> call, Response<ResponseBody> response) {
                Toast.makeText(LodgeComplaintActivity.this, "Uploaded", Toast.LENGTH_LONG).show();
            }

            @Override
            public void onFailure(Call<ResponseBody> call, Throwable t) {
                Toast.makeText(LodgeComplaintActivity.this, "Failure", Toast.LENGTH_LONG).show();
            }
        });

    }

    @NonNull
    private MultipartBody.Part prepareFiles(String partName, Uri fileUri){
        File file = new File( fileUri.getPath());
        RequestBody requestBody = RequestBody.create(MediaType.parse("image/*"), file);

        return  MultipartBody.Part.createFormData(partName, file.getName(), requestBody);
    }



}

class User {

    private String name;
    private String UNID;

    public User(String name, String UNID) {
        this.name = name;
        this.UNID = UNID;
    }

    public String getName(){
        return this.name;
    }

    public String getUNID(){
        return this.UNID;
    }

    @Override
    public String toString() {
        return name;
    }

}



