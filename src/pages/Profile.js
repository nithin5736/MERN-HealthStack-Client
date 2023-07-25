import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Announcement from "../components/Announcement";
import profileImg from "../images/profile.gif";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { profilePicRoute, updateProfileRoute, profileDetailsRoute } from "../utils/APIRoutes";
import { Avatar, TextField } from "@mui/material";
import { storage } from "../utils/firebase"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { USER_KEY, PROFILE_PHOTO_KEY } from "../utils/secretkeys";

const Profile = () => {
  const [profile, setProfile] = useState(
    JSON.parse(localStorage.getItem(USER_KEY))
  );
  const [actualName, setActualName] = useState(JSON.parse(localStorage.getItem(USER_KEY)) && JSON.parse(localStorage.getItem(USER_KEY)).username);
  const [actualEmail, setActualEmail] = useState(JSON.parse(localStorage.getItem(USER_KEY)) && JSON.parse(localStorage.getItem(USER_KEY)).email);
  const [image, setImage] = useState(null);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [url, setUrl] = useState(localStorage.getItem(PROFILE_PHOTO_KEY) && JSON.parse(localStorage.getItem(PROFILE_PHOTO_KEY)).url);
  const navigate = useNavigate();

  
  useEffect(() => {
    axios.post(profileDetailsRoute, {
      email : actualEmail
    })
    .then((res) => {
      setPhone(res.data.user.phone);
      setAddress(res.data.user.address);
    })
    .catch((err) => {
      console.log(err);
    })
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post(updateProfileRoute, {
        username : profile.username,
        email : profile.email,
        password : profile.password,
        actualName : actualName,
        phone : phone,
        address : address
      })
      .then((res) => {
        if(res.data.status) {
          localStorage.setItem(process.env.REACT_USER_KEY, JSON.stringify(profile));
          alert(res.data.msg);
          window.location.reload();
          return;
        }
        else{
          alert(res.data.msg);
          return;
        }
      })
      .catch(() => {
        alert("Something went wrong. Please try again.");
        return;
      });
    navigate("/profile");
  };

  const imageChangeHandler = (e) => {
    if(e.target.files[0]){
      setImage(e.target.files[0])
    }
  }

  const imageSubmitHandler = async () => {
    const imageRef = ref(storage, profile.username);
    const data = new FormData();
    data.append("file", image);
    uploadBytes(imageRef, image)
    .then(()=>{
      getDownloadURL(imageRef)
      .then((url)=>{
          setUrl(url)
          localStorage.setItem(PROFILE_PHOTO_KEY, JSON.stringify({url: url}));
        })
       .catch((error)=>{ 
          console.log(error)
       })
      axios.post(profilePicRoute,{ url, username: profile.username, data })
      .then((res)=>{
        // console.log(res)
      })
      .catch((err)=>{
        console.log(err)
      })
      setImage(null)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  return (
    <>
      <Announcement />
      <Navbar />
      <Center>
        <Logo>YOUR PROFILE</Logo>
      </Center>
      <Container>
        <Div>
          <Avatar
            alt="Proile Pic"
            src={url}
            sx={{ width: 330, height: 300 }}
          />
            <TextField 
              type="file"
              name="file"
              accept="image/*" 
              onChange={imageChangeHandler}
              style = {{margin: "20px 15px"}}
            />
            <button 
              type="submit" class="btn btn-primary" 
              style = {{margin: "0px 110px"}}
              onClick = {imageSubmitHandler}
            >
                UPLOAD PROFILE
            </button>
        </Div>
        <FormDiv>
          <form  onSubmit={submitHandler}>
            <div class="form-group">
              <label for="exampleInputEmail1">Username</label>
              <input
                type="text"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Username"
                minlength="5"
                value={profile && profile.username}
                onChange={(e) => {
                  setProfile({ ...profile, username: e.target.value });
                }}
                required
              />
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Email</label>
              <input
                type="text"
                class="form-control"
                id="exampleInputPassword1"
                placeholder="Email"
                value={profile && profile.email}
                onChange={(e) => {
                  setProfile({ ...profile, email: e.target.value });
                }}
                required
                readOnly
              />
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input
                type="password"
                class="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
                minlength="5"
                value={profile && profile.password}
                onChange={(e) => {
                  setProfile({ ...profile, password: e.target.value });
                }}
                required
              />
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Phone</label>
              <input
                type="text"
                class="form-control"
                id="exampleInputPassword1"
                placeholder="Phone"
                minlength="10"
                maxlength="10"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
                required
              />
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Address</label>
              <textarea
                type="text"
                class="form-control"
                id="exampleInputPassword1"
                placeholder="Address"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
                required
              />
            </div>
            <button type="submit" class="btn btn-primary">
              UPDATE PROFILE
            </button>
          </form>
        </FormDiv>
      </Container>
      <Footer />
    </>
  );
};

const Container = styled.div`
  margin: 80px 30px 100px 80px;
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

// const Img = styled.img`
//   flex: 0.6;
//   height: 400px;
//   width: 500px;
//   padding: 20px;
// `;

const Div = styled.div`
  flex: 0.8;
  margin-left: 100px;
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

export default Profile;
