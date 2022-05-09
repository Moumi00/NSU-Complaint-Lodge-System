package com.example.nsucls;

import java.util.List;

import okhttp3.MultipartBody;
import okhttp3.RequestBody;
import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.http.Multipart;
import retrofit2.http.POST;
import retrofit2.http.Part;

public interface UploadApis {
//    @Multipart
//    @POST("upload")
//    Call<RequestBody> uploadImage(@Part MultipartBody.Part part, @Part("somedata") RequestBody requestBody);

    @Multipart
    @POST("lodge-complaint")
    Call<ResponseBody> callMultipleUploadApi(@Part List<MultipartBody.Part> image);
                                             //@Part("complainTitle") String complainTitle,
                                             //@Part("complainDescription") String complainDescription,
                                             //@Part("complainReviewerUserUNID") String complainReviewerUserUNID,
                                             //@Part("complainAgainstUserUNID") List<String> complainAgainstUserUNID);

}
