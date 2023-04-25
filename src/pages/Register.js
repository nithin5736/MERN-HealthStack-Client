import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { registerRoute } from "../utils/APIRoutes";
import { USER_KEY, PROFILE_PHOTO_KEY } from "../utils/secretkeys";

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    usertype: "",
    pincode: "",
    phone: "",
    address: "",
  });

  const validateForm = () => {
    const { username, password, confirmPassword, phone, pincode } = user;
    if (username.length < 5) {
      alert("Username should have atleast 5 characters");
      return false;
    }
    if (password.length < 5) {
      alert("Password should have atleast 5 characters");
      return false;
    }
    if (password !== confirmPassword) {
      alert("Password and Confirm Password should have same characters");
      return false;
    }
    if (pincode.length !== 6) {
      alert("Pincode should have 6 characters");
      return false;
    }
    if (phone.length !== 10) {
      alert("Phone should have 10 characters");
      return false;
    }
    return true;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      navigate("/otp", { state: user });
      // if (user.usertype === "Seller") {
      //   const res = await axios.post(registerRoute , {
      //     firstname: user.firstname,
      //     lastname: user.lastname,
      //     username: user.username,
      //     email: user.email,
      //     password: user.password,
      //     confirmPassword: user.confirmPassword,
      //     usertype: user.usertype,
      //     cart: [],
      //     products: [],
      //     status: "active",
      //     transaction: 0,
      //     pincode: user.pincode,
      //     phone: user.phone,
      //     address: user.address,
      //   })
        
      //   if(res.data.status){
      //     setUser({
      //       firstname: "",
      //       lastname: "",
      //       username: "",
      //       email: "",
      //       password: "",
      //       confirmPassword: "",
      //       usertype: "",
      //       pincode: "",
      //       phone: "",
      //       address: "",
      //     });
      //     alert('Registered Successfully');
      //     navigate("/login");
      //   }
      //   else{
      //     alert(res.data.msg);
      //     return;
      //   }
      // } 
      // else {
      //   const res = await axios.post(registerRoute, {
      //     firstname: user.firstname,
      //     lastname: user.lastname,
      //     username: user.username,
      //     email: user.email,
      //     password: user.password,
      //     confirmPassword: user.confirmPassword,
      //     usertype: user.usertype,
      //     cart: [],
      //     status: "active",
      //     transaction: 0,
      //     pincode: user.pincode,
      //     phone: user.phone,
      //     address: user.address,
      //   })
        
      //   if(res.data.status){
      //     localStorage.setItem(process.env.REACT_APP_USER_KEY, JSON.stringify({username:user.username, email:user.email, password: user.password}));
      //     setUser({
      //       firstname: "",
      //       lastname: "",
      //       username: "",
      //       email: "",
      //       password: "",
      //       confirmPassword: "",
      //       usertype: "",
      //       pincode: "",
      //       phone: "",
      //       address: "",
      //     });
      //     alert('Registered Successfully');
      //     navigate("/login");
      //   }
      //   else{
      //     alert(res.data.msg);
      //     return;
      //   }
      // } 
    }
};

  return (
    <>
      <Container>
        <Wrapper>
          <Title>CREATE AN ACCOUNT</Title>
          <Form onSubmit={submitHandler}>
            <Input
              type="text"
              placeholder="First name"
              value={user.firstname}
              onChange={(e) => {
                setUser({ ...user, firstname: e.target.value });
              }}
              required
            />
            <Input
              type="text"
              placeholder="Last name"
              value={user.lastname}
              onChange={(e) => {
                setUser({ ...user, lastname: e.target.value });
              }}
              required
            />
            <Input
              type="text"
              placeholder="Username"
              value={user.username}
              onChange={(e) => {
                setUser({ ...user, username: e.target.value });
              }}
              required
            />
            <Input
              type="email"
              placeholder="Email"
              value={user.email}
              onChange={(e) => {
                setUser({ ...user, email: e.target.value });
              }}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={user.password}
              onChange={(e) => {
                setUser({ ...user, password: e.target.value });
              }}
              required
            />
            <Input
              type="password"
              placeholder="confirm password"
              value={user.confirmPassword}
              onChange={(e) => {
                setUser({ ...user, confirmPassword: e.target.value });
              }}
              required
            />
            <Input
              type="number"
              placeholder="phone number"
              value={user.phone}
              onChange={(e) => {
                setUser({ ...user, phone: e.target.value });
              }}
              minlength="10"
              maxlength="10"
              required
            />
            <Input
              type="number"
              placeholder="pincode"
              value={user.pincode}
              onChange={(e) => {
                setUser({ ...user, pincode: e.target.value });
              }}
              minlength="6"
              maxlength="6"
              required
            />
            <TextArea
              placeholder="Address"
              value={user.address}
              onChange={(e) => {
                setUser({ ...user, address: e.target.value });
              }}
              required
            ></TextArea>
            <Para>
              <b>ARE YOU A ?</b>
            </Para>
            <Radio
              type="radio"
              value="Seller"
              name="usertype"
              onChange={(e) => {
                setUser({ ...user, usertype: e.target.value });
              }}
              required
            />
            <Label>SELLER</Label>
            <Radio
              type="radio"
              value="Consumer"
              name="usertype"
              onChange={(e) => {
                setUser({ ...user, usertype: e.target.value });
              }}
              required
            />
            <Label>CONSUMER</Label>
            <Agreement>
              By creating an account,I consent to the processing of my personal
              details in accordance with the <b>PRIVACY POLICY</b>. ALREADY HAVE
              AN ACCOUNT ?
              <b>
                <Link
                  to="/login"
                  style={{
                    textDecoration: "none",
                    color: "green",
                    fontSize: "14px",
                    marginLeft: "5px",
                  }}
                >
                  LOGIN
                </Link>
              </b>
            </Agreement>
            <Button>CREATE ACCOUNT</Button>
          </Form>
        </Wrapper>
      </Container>
    </>
  );
};


const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: url("https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/rm373batch15-217-01.jpg?w=800&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=d8bbc66e02e81095950de55fcc9347f5")
    center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 0px 2.3px -5px rgba(0, 0, 0, 0.02),
    0px 0px 5.6px -5px rgba(0, 0, 0, 0.028),
    0px 0px 10.5px -5px rgba(0, 0, 0, 0.035),
    0px 0px 18.8px -5px rgba(0, 0, 0, 0.042),
    0px 0px 35.1px -5px rgba(0, 0, 0, 0.05),
    0px 0px 84px -5px rgba(0, 0, 0, 0.07);
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  height: 70%;
`;

const Title = styled.h1`
  font-size: 30px;
  font-weight: 500;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  border-radius: 10px;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const TextArea = styled.textarea`
  min-width: 100%;
  border-radius: 10px;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 13px;
  margin: 15px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  border-radius: 10px;
`;

const Para = styled.div`
  margin-top: 15px;
  margin-bottom: 0px;
`;

const Radio = styled.input`
  margin: 15px;
  margin-left: 30px;
`;

const Label = styled.label`
  margin: 15px 0;
  font-size: 15px;
  font-weight: 500;
`;

export default Register;
