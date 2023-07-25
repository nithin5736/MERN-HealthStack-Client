import React, { useContext } from "react";
import styled from "styled-components";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { ThemeContext } from "../App";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import { USER_KEY } from "../utils/secretkeys";
// import { textColorsPropType } from "@coreui/react/dist/components/Types";

const Product = ({ item }) => {
  const navigate = useNavigate();
  const { cart, setCart, totalCount, setTotalCount, total, setTotal } =
    useContext(ThemeContext);

  const cartHandler = () => {
    if (item.category === "prescribe") {
      alert("Please upload the Doctor Prescription");
      return;
    }
    if (!localStorage.getItem(USER_KEY)) {
      navigate("/register");
    } else {
      let flag = true;
      for (let i = 0; i < cart.length; i++) {
        if (item.productname === cart[i].productname) {
          flag = false;
          break;
        }
      }
      if (flag) {
        setCart((prevState) => {
          setTotalCount(totalCount + 1);
          setTotal(total + parseInt(item.price));
          return [...prevState, item];
        });
        toast.success("Item added to cart", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        toast.warning("Item already exists in cart", {
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
    }
  };

  const searchHandler = async () => {
    navigate(`/products/${item._id}`);
  };

  return (
    <>
      <Container>
        {/* <Circle /> */}

        <div>
          <Info style={{ display: "flex", flexDirection: "column" }}>
            <h7 style={{ color: "black", paddingTop: 300 }}>
              {item.productname}
            </h7>
            <h7>Rs.{item.price}</h7>
            {/* <h7 style={{ color: "black" ,paddingTop:0 }}>Rs.{item.price}</h7> */}

            <div style={{ display: "flex", flexDirection: "row" }}>
              <Icon style={{ color: "#219ebc" }} onClick={cartHandler}>
                <ShoppingCartOutlinedIcon />
              </Icon>
              <Icon>
                {/* <InfoRoundedIcon style={{backgroundColor:"#219ebc"}} onClick={searchHandler}></InfoRoundedIcon> */}
                {/* <InfoIcon style={{backgroundColor:"#219ebc"}} onClick={searchHandler}></InfoIcon> */}
                <SearchOutlinedIcon onClick={searchHandler} />
              </Icon>
              <Icon>
                <FavoriteBorderOutlinedIcon style={{ color: "red" }} />
              </Icon>
            </div>
          </Info>

          <Image
            style={{ alignContent: "top", height: 250, marginBottom: 80 }}
            src={item.img}
          />
        </div>
      </Container>

      <ToastContainer />
    </>
  );
};

const Info = styled.div`
  opacity: 1;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 450px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;

  // &:hover ${Info} {
  //   opacity: 0;
  // }
`;

const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;

const Image = styled.img`
  height: 60%;
  z-index: 2;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

const Div = styled.div``;

export default Product;
