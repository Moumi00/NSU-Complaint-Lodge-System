package com.example.nsucls;


import android.content.Context;
import android.content.Intent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;

import androidx.recyclerview.widget.RecyclerView;

import java.util.HashMap;
import java.util.List;

public class MyComplainsAdapter extends RecyclerView.Adapter<MyComplainsAdapter.ViewHolder> {
    List<HashMap<String, String>> mylist;
    private Context context;;

    // Provide a suitable constructor (depends on the kind of dataset)
    public MyComplainsAdapter(List<HashMap<String, String>> mylist) {
        this.mylist = mylist;
    }

    // Create new views (invoked by the layout manager)
    @Override
    public MyComplainsAdapter.ViewHolder onCreateViewHolder(ViewGroup parent,
                                                             int viewType) {
        // create a new view
        View itemLayoutView = LayoutInflater.from(parent.getContext()).inflate(
                R.layout.fragment_my_complain_row, null);

        // create ViewHolder

        ViewHolder viewHolder = new ViewHolder(itemLayoutView);
        return viewHolder;
    }

    @Override
    public void onAttachedToRecyclerView(RecyclerView recyclerView) {
        super.onAttachedToRecyclerView(recyclerView);
        context = recyclerView.getContext();
    }

    // Replace the contents of a view (invoked by the layout manager)
    @Override
    public void onBindViewHolder(ViewHolder viewHolder, int position) {

        // - get data from your itemsData at this position
        // - replace the contents of the view with that itemsData

        viewHolder.title.setText(mylist.get(position).get("title"));
        viewHolder.status.setText(mylist.get(position).get("status"));
        viewHolder.latestComment.setText(mylist.get(position).get("latestComment"));

        viewHolder.detailsButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent myIntent = new Intent(context, ComplaintDetailsActivity.class);
                myIntent.putExtra("complainUNID", mylist.get(viewHolder.getAbsoluteAdapterPosition()).get("complainUNID"));
                context.startActivity(myIntent);
            }
        });

    }

    // Return the size of your dataset (invoked by the layout manager)
    @Override
    public int getItemCount() {
        return mylist.size();
    }

    // inner class to hold a reference to each item of RecyclerView
    public static class ViewHolder extends RecyclerView.ViewHolder {

        public TextView title, status, latestComment;
        public Button detailsButton;

        public ViewHolder(View itemLayoutView) {
            super(itemLayoutView);
            title = (TextView) itemLayoutView
                    .findViewById(R.id.title);
            status = (TextView) itemLayoutView
                    .findViewById(R.id.status);
            latestComment = (TextView) itemLayoutView
                    .findViewById(R.id.latestComment);
            detailsButton = (Button) itemLayoutView
                    .findViewById(R.id.detailsButton);

        }
    }

}
