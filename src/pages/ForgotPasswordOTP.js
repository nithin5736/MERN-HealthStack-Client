import React, { useRef, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import emailjs from "@emailjs/browser";
import axios from "axios";
import { registerRoute } from "../utils/APIRoutes";
import VpnKeyOutlinedIcon from "@mui/icons-material/MarkEmailReadOutlined";

const ForgotPasswordOTP = () => {
  const form = useRef();
  const [otp, setOtp] = useState(0);
  const location = useLocation();
  const otpRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    if (otp !== 0) {
      emailjs
        .sendForm(
          process.env.REACT_APP_USER_EMAIJS_SERVICE,
          process.env.REACT_APP_USER_EMAIJS_TEMPLATE,
          form.current,
          process.env.REACT_APP_USER_EMAIJS_USERID
        )
        .then(() => {
          console.log("success");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [otp]);

  useEffect(() => {
    setOtp(generateOTP());
  }, []);

  function generateOTP() {
    var string = "0123456789";
    let OTP = "";

    var len = 10;
    for (let i = 0; i < 6; i++) {
      OTP += string[Math.floor(Math.random() * len)];
    }
    return OTP;
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    if (otpRef.current.value === otp) {
      navigate("/newPassword", { state: { email: location.state.email } });
    } else {
      alert("Incorrect OTP");
    }
  };

  return (
    <Container>
      <Div>
        <VpnKeyOutlinedIcon style={{ fontSize: "50px", color: "white" }} />
        <h2 style={{ color: "white" }}>FORGOT PASSWORD</h2>
        <p style={{ color: "white", fontSize: "15px" }}>
          Please enter valid OTP code received in your email.
        </p>
      </Div>
      <form ref={form} style={{ display: "none" }}>
        <input type="number" id="otp" name="otp" value={otp} />
        <input
          type="email"
          id="email"
          name="email"
          value={location.state.email}
        />
        <input
          type="text"
          id="fullname"
          name="fullname"
          value="Healthstack user"
        />
      </form>
      <FormDiv>
        <form onSubmit={submitHandler}>
          <div class="form-group">
            <label for="exampleInputPassword1" style={{ color: "white" }}>
              Enter OTP
            </label>
            <input
              type="number"
              ref={otpRef}
              class="form-control"
              id="exampleInputPassword1"
              placeholder="OTP"
            />
          </div>
          <button type="submit" class="btn btn-light">
            Submit
          </button>
        </form>
      </FormDiv>
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  width: 100%;
  background: black;
`;
const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
`;

const FormDiv = styled.div`
  form {
    padding: 50px;
    margin-left: 160px;
    width: 80%;
  }
`;

export default ForgotPasswordOTP;
