import React, { useState, useEffect } from "react";
import axios from "axios";
import { allCommentsRoute } from "../utils/APIRoutes";

const CustomerReviews = ({ productname }) => {
  const [comments, setComments] = useState([]);

  let flag = false;
  useEffect(() => {
    axios
      .get(allCommentsRoute)
      .then((res) => {
        // console.log(res.data);
        setComments(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <h4>Customer Reviews</h4>
      <div>
        {comments.map((comment) => {
          if (comment.product.productname === productname) {
            flag = true;
            return (
              <div>
                <h6 style={{ color: "orange" }}>{comment && comment.user && comment.user.username}</h6>
                <p>{comment && comment.comment}</p>
              </div>
            );
          }
        })}
        {flag === false && <h6 style={{ color: "gray" }}>0 Comments</h6>}
      </div>
    </>
  );
};

export default CustomerReviews;
