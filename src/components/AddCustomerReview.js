import React, { useState } from "react";
import { addCommentRoute } from "../utils/APIRoutes";
import axios from "axios";
import RateReviewIcon from "@mui/icons-material/RateReview";

const AddCustomerReview = ({ username, productname }) => {
  const [comment, setComment] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (username) {
      if (comment) {
        axios
          .post(addCommentRoute, { comment, username, productname })
          .then((res) => {
            if (res.data.status) {
              alert("Comment added successfully");
              window.location.reload();
              return;
            }
          })
          .catch((err) => {
            alert("Error in adding comment");
            return;
          });
      } else {
        alert("Please enter comment");
        return;
      }
    } else {
      alert("Please login to add comment");
    }
  };

  return (
    <div>
      <h4>
        <RateReviewIcon /> Comments
      </h4>

      <form onSubmit={submitHandler} style={{ marginBottom: "5%" }}>
        <textarea
          rows="2"
          cols="80"
          placeholder="Type a comment"
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
        ></textarea>
        <button type="submit" class="btn btn-success">
          ADD COMMENT
        </button>
      </form>
    </div>
  );
};

export default AddCustomerReview;
