import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Announcement from "../components/Announcement";
import contact from "../images/contactus.gif";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import { queryRoute } from "../utils/APIRoutes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { USER_KEY } from "../utils/secretkeys";

const ContactUs = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState({
    name: "",
    email: "",
    ques: "",
    sug: "",
  });

  const sendQueryHandler = (e) => {
    e.preventDefault();
    if (localStorage.getItem(USER_KEY) === null) {
      alert('Please Login');
      navigate("/login");
      return;
    }
    axios
      .post(queryRoute, {
        name: query.name,
        email: query.email,
        ques: query.ques,
        sug: query.sug,
      },
      {
        headers: {
          authorization: `Bearer ${JSON.parse(localStorage.getItem(USER_KEY)).accessToken}`
        }
      })
      .then((res) => {
        if(res.data.status){
          alert("Your query sent successfully");
          return;
        }
        else{
          alert("Please enter your query evidently");
          return;
        }
      })
      .catch((err) => {
        if(err.response.status === 401 || err.response.status === 403){
          toast.error("Unauthorized Access", {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
          });
        }
        else{
          alert("Please enter your query evidently");
        }
        return;
      });
    setQuery({
      name: "",
      email: "",
      ques: "",
      sug: "",
    });
  };

  return (
    <>
      <Announcement />
      <Navbar />
      <Center>
        <Logo>ADD YOUR QUERY</Logo>
      </Center>
      <Container>
        <Img src={contact} alt="Contact us" />
        <FormDiv>
          <form onSubmit={sendQueryHandler}>
            <div class="form-group">
              <label for="exampleInputEmail1">Your Name</label>
              <input
                type="text"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter Name"
                value={query.name}
                onChange={(e) => {
                  setQuery({ ...query, name: e.target.value });
                }}
                required
              />
              <small id="emailHelp" class="form-text text-muted">
                We'll never share this information with anyone else.
              </small>
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Your Email</label>
              <input
                type="text"
                class="form-control"
                id="exampleInputPassword1"
                placeholder="Enter Email"
                value={query.email}
                onChange={(e) => {
                  setQuery({ ...query, email: e.target.value });
                }}
                required
              />
              <small id="emailHelp" class="form-text text-muted">
                We'll never share this information with anyone else.
              </small>
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Your Query</label>
              <textarea
                class="form-control"
                id="exampleInputPassword1"
                placeholder="Enter your queries"
                value={query.ques}
                onChange={(e) => {
                  setQuery({ ...query, ques: e.target.value });
                }}
                required
              />
              <small id="emailHelp" class="form-text text-muted">
                We'll never share this information with anyone else.
              </small>
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">
                Any Suggestions you want to give ?
              </label>
              <textarea
                class="form-control"
                id="exampleInputPassword1"
                placeholder="Suggestions"
                value={query.sug}
                onChange={(e) => {
                  setQuery({ ...query, sug: e.target.value });
                }}
                required
              />
              <small id="emailHelp" class="form-text text-muted">
                We'll never share this information with anyone else.
              </small>
            </div>
            <button type="submit" class="btn btn-primary">
              SEND QUERY
            </button>
          </form>
        </FormDiv>
      </Container>
      <ToastContainer />
      <Footer />
    </>
  );
};

const Container = styled.div`
  margin: 80px 30px 180px 80px;
  display: flex;
  justify-content: space-between;
`;

const Logo = styled.h1`
  font-weight: 500;
  font-size: 2rem;
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
  margin-top: 30px;
`;

const Img = styled.img`
  flex: 0.5;
  height: 500px;
  width: 600px;
  padding: 20px;
  &:hover {
    box-shadow: 0px 0px 2.3px -5px rgba(0, 0, 0, 0.02),
      0px 0px 5.6px -5px rgba(0, 0, 0, 0.028),
      0px 0px 10.5px -5px rgba(0, 0, 0, 0.035),
      0px 0px 18.8px -5px rgba(0, 0, 0, 0.042),
      0px 0px 35.1px -5px rgba(0, 0, 0, 0.05),
      0px 0px 84px -5px rgba(0, 0, 0, 0.07);
  }
`;

const FormDiv = styled.div`
  flex: 1.2;
  form {
    padding: 15px;
    margin-left: 100px;
    width: 80%;
    &:hover {
      box-shadow: 0px 0px 2.3px -5px rgba(0, 0, 0, 0.02),
        0px 0px 5.6px -5px rgba(0, 0, 0, 0.028),
        0px 0px 10.5px -5px rgba(0, 0, 0, 0.035),
        0px 0px 18.8px -5px rgba(0, 0, 0, 0.042),
        0px 0px 35.1px -5px rgba(0, 0, 0, 0.05),
        0px 0px 84px -5px rgba(0, 0, 0, 0.07);
    }
  }
`;

export default ContactUs;
