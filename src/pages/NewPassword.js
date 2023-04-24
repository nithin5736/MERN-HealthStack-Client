import React, { useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import { newPasswordRoute } from "../utils/APIRoutes";
import axios from "axios";

const NewPassword = () => {
    const passwordRef = useRef();
    const retypePasswordRef = useRef();
    const navigate = useNavigate();
    const location = useLocation();

    const submitHandler = (e) => {
        e.preventDefault();
        const password = passwordRef.current.value;
        const retypePassword = retypePasswordRef.current.value;
        if(password === retypePassword && password.length > 4)
        {
            axios.post(newPasswordRoute, {
                email: location.state.email,
                password: password
            })
            .then((res) => {
                alert("Password changed successfully")
                navigate("/login");
                return;
            })
            .catch((err) => {
                console.log(err);
            })
        }
        else
        {
            alert("Password doesn't match or Password should have atleast 5 characters");
        }
    }
  
  return (
    <Container>
      <Div>
        <VpnKeyOutlinedIcon style={{ fontSize: "50px", color: "white" }} />
        <h2 style={{ color: "white" }}>FORGOT PASSWORD</h2>
        <p style={{ color: "white", fontSize: "15px" }}>
          Now Create a new password to login.
        </p>
      </Div>

      <FormDiv>
        <form onSubmit={submitHandler}>
          <div class="form-group">
            <label for="exampleInputPassword1" style={{ color: "white" }}>
              Enter New Password
            </label>
            <input
              type="password"
              ref={passwordRef}
              class="form-control"
              id="exampleInputPassword1"
              placeholder="New Password"
            />
          </div>

          <div class="form-group">
            <label for="exampleInputPassword1" style={{ color: "white" }}>
              Retype New Password
            </label>
            <input
              type="password"
              ref={retypePasswordRef}
              class="form-control"
              id="exampleInputPassword1"
              placeholder="Retype New Password"
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

export default NewPassword;
