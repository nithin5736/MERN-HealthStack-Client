import React, { useState, useRef } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import emailjs from "@emailjs/browser";
import { loginRoute } from "../utils/APIRoutes";
import { USER_KEY, PROFILE_PHOTO_KEY } from "../utils/secretkeys";

const Login = () => {
  const form = useRef();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    usertype: "",
  });
  const [u, setU] = useState({});


  const checkUser = async (user) => {
    const res = await axios.post(loginRoute,{
      username: user.username,
      email: user.email,
      password: user.password,
      usertype: user.usertype,
    });
    if(res.data.status){
      localStorage.setItem(USER_KEY, JSON.stringify({...user, accessToken: res.data.accessToken}));
      localStorage.setItem(PROFILE_PHOTO_KEY, JSON.stringify({url: res.data.user.profilePic}));
      return true;
    }
    else{
      alert(res.data.msg + ". Please register.");
      return false;
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if ((await checkUser(user)) === false) {
      navigate("/register");
    } else {
      navigate("/main");
    }

    setUser({
      username: "",
      email: "",
      password: "",
      usertype: "",
    });
  };

  // const getEmail = () => {
  //   axios
  //     .get(`${hostURL}/users?email=${user.email}`)
  //     .then((res) => {
  //       setU(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  // const sendEmailHandler = () => {
  //   // console.log(form.current.elements);
  //   // console.log(u[0].password);
  //   form.current.elements.password.value = u[0].password;
  //   emailjs
  //     .sendForm(
  //       "service_sf3ocxq",
  //       "template_7s8xlhf",
  //       form.current,
  //       "9jjEZ4Q1b7CYAn7Uu"
  //     )
  //     .then(
  //       (result) => {
  //         console.log(result.text);
  //       },
  //       (error) => {
  //         console.log(error.text);
  //       }
  //     );
  // };

  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form ref={form} onSubmit={submitHandler}>
          <Input
            type="text"
            name="name"
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
            name="email"
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
            name="password"
            onChange={(e) => {
              setUser({ ...user, password: e.target.value });
            }}
            required
          />
          <Para>
            <b>ARE YOU A ?</b>
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
          </Para>
          <p style={{ fontSize: "12px" }}>
            <Link to="/forgotPassword">
              <b color={{color: "black"}}>
                FORGOT PASSWORD
              </b>
            </Link>
          </p>
          <p style={{ fontSize: "12px" }}>
            DON'T HAVE AN ACCOUNT ?
            <b>
              <Link
                to="/register"
                style={{
                  textDecoration: "none",
                  color: "green",
                  fontSize: "14px",
                  marginLeft: "5px",
                }}
              >
                REGISTER
              </Link>
            </b>
          </p>
          <Button>LOGIN</Button>
        </Form>
      </Wrapper>
    </Container>
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
  width: 25%;
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
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 30px;
  font-weight: 500;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0px;
  padding: 10px;
  border-radius: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin: 10px 0;
  border-radius: 10px;
`;

const Para = styled.div`
  margin: 10px 0;
`;

const Radio = styled.input`
  margin: 10px 6px;
`;

const Label = styled.label`
  font-size: 13px;
  font-weight: 600;
`;

export default Login;
