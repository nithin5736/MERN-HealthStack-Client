import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import { useParams, useNavigate } from "react-router-dom";
import { ThemeContext } from "../App";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Avatar, TextField } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import { prescriptionRoute, productRoute } from "../utils/APIRoutes";
import { USER_KEY } from "../utils/secretkeys";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../utils/firebase";
import AddCustomerReview from "../components/AddCustomerReview";
import CustomerReviews from "../components/CustomerReviews";

const ProductPage = () => {
  const { cart, setCart, totalCount, total, setTotal, setTotalCount } =
    useContext(ThemeContext);
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  const { id } = useParams();
  const [actualName, setActualName] = useState(
    JSON.parse(localStorage.getItem(process.env.REACT_APP_USER_KEY)) &&
      JSON.parse(localStorage.getItem(process.env.REACT_APP_USER_KEY)).username
  );
  const [flag, setFlag] = useState(null);

  useEffect(() => {
    axios
      .post(`${productRoute}/${id}`)
      .then((res) => {
        setProduct(res.data);
        if (product.category === "otc") {
          setFlag(true);
        } else {
          setFlag(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const cartHandler = () => {
    if (!localStorage.getItem(process.env.REACT_APP_USER_KEY)) {
      navigate("/register");
    } else {
      let flag = true;
      for (let i = 0; i < cart.length; i++) {
        if (product.productname === cart[i].productname) {
          flag = false;
          break;
        }
      }
      if (flag) {
        setCart((prevState) => {
          setTotalCount(totalCount + 1);
          setTotal(total + parseInt(product.price));
          return [...prevState, product];
        });
        toast.success("Food item added to cart", {
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
        toast.warning("Food item already exists in cart", {
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

  const fileChangeHandler = (e) => {
    if (!actualName) {
      alert("Please Register");
      navigate("/register");
      return;
    }
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const fileUploadHandler = async () => {
    const fileRef = ref(
      storage,
      actualName + "_" + product.productname + "_prescription"
    );
    uploadBytes(fileRef, file).then(() => {
      getDownloadURL(fileRef)
        .then((url) => {
          setFileUrl(url);
          axios
            .post(
              prescriptionRoute,
              {
                url: url,
                username: actualName,
                productname: product.productname,
              },
              {
                headers: {
                  authorization: `Bearer ${
                    JSON.parse(localStorage.getItem(process.env.REACT_APP_USER_KEY)).accessToken
                  }`,
                },
              }
            )
            .then((res) => {
              console.log(res.data);
            })
            .catch((err) => {
              console.log(err);
            });
          setFile(null);
        })
        .catch((error) => {
          console.log(error);
        });
    });
    setFlag(true);
  };

  return (
    <Container>
      <Announcement />
      <Navbar />
      <Wrapper>
        <ImgContainer>
          <Image src={product.img} />
        </ImgContainer>
        <InfoContainer>
          <Title>{product.productname}</Title>
          <Desc>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
            fugiat quam similique nobis voluptatem dignissimos, incidunt et
            voluptates illo, laudantium minima velit laboriosam eligendi aut
            natus veritatis atque reiciendis deleniti?
          </Desc>
          <Price>Rs.{product.price}</Price>
          {product.category === "otc" && (
            <AddContainer>
              <Button onClick={cartHandler}>ADD TO CART</Button>
            </AddContainer>
          )}
          {product.category === "prescribe" && flag && (
            <AddContainer>
              <Button onClick={cartHandler}>ADD TO CART</Button>
            </AddContainer>
          )}
          {product.category === "prescribe" && (
            <Div>
              <P>Doctor Prescription</P>
              <TextField
                type="file"
                name="file"
                accept="image/*"
                style={{ margin: "10px 0" }}
                onChange={fileChangeHandler}
              />
              <button
                type="submit"
                class="btn btn-primary"
                style={{
                  margin: "16px 10px 0px 10px",
                  height: "7%",
                  width: "6%",
                }}
                onClick={fileUploadHandler}
              >
                &#x2714;
              </button>
            </Div>
          )}
          <Div>
            <AddCustomerReview
              productname={product.productname}
              username={actualName}
            />
            <CustomerReviews productname={product.productname} />
          </Div>
        </InfoContainer>
      </Wrapper>
      <ToastContainer />
      <Newsletter />
      <Footer />
    </Container>
  );
};

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
`;

const Title = styled.h1`
  font-weight: 500;
`;

const P = styled.p`
  font-weight: 500;
  font-size: 20px;
  margin: 20px 0 0 0;
`;

const Desc = styled.p`
  font-weight: 400;
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 300;
  font-size: 40px;
`;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Button = styled.button`
  margin-top: 20px;
  padding: 15px;
  border: 1px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    color: white;
    background-color: black;
  }
`;

const Div = styled.div`
  margin-top: 10%;
`;

export default ProductPage;
