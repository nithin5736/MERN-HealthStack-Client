import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';


const ForgotPasswordEmail = () => {
  const emailRef = useRef();
  const navigate = useNavigate();

  const emailHandler = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    navigate("/forgotpasswordotp", { state: { email } });
  };
  
  return (
    <Container>
      <Div>
        <VpnKeyOutlinedIcon style={{ fontSize: "50px", color: "white" }} />
        <h2 style={{ color: "white" }}>FORGOT PASSWORD</h2>
        <p style={{ color: "white", fontSize: "15px" }}>
          Please submit your Email address to send OTP code.
        </p>
      </Div>

      <FormDiv>
        <form onSubmit={emailHandler}>
          <div class="form-group">
            <label for="exampleInputPassword1" style={{ color: "white" }}>
              Enter Email Address
            </label>
            <input
              type="email"
              ref={emailRef}
              class="form-control"
              id="exampleInputPassword1"
              placeholder="Email"
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

export default ForgotPasswordEmail;
