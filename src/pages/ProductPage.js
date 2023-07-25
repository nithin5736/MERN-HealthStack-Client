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
import {
  prescriptionRoute,
  prescriptionStatusCheckRoute,
  productRoute,
} from "../utils/APIRoutes";
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
    JSON.parse(localStorage.getItem(USER_KEY)) &&
      JSON.parse(localStorage.getItem(USER_KEY)).username
  );
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem(USER_KEY))
  );
  const [flag, setFlag] = useState(null);
  const [prescriptionStatus, setPrescriptionStatus] = useState(null);

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

  useEffect(() => {
    axios
      .post(prescriptionStatusCheckRoute, {
        user,
        productId: id,
      })
      .then((res) => {
        if (res.data.prescription === null && product.category === "prescribe") {
          alert("Please upload your prescription");
        } else{
          if (
            res.data &&
            res.data.prescription &&
            res.data.prescription.status &&
            product.category === "prescribe"
          ) {
            setPrescriptionStatus(res.data.prescription.status);
            alert(
              "Your prescription has been approved. You can now add this product to your cart"
            );
          } else if(product.category === "prescribe"){
            alert(
              "Your prescription has not been approved yet. Please wait for 24 hours"
            );
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const cartHandler = () => {
    if (!localStorage.getItem(USER_KEY)) {
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
                    JSON.parse(
                      localStorage.getItem(USER_KEY)
                    ).accessToken
                  }`,
                },
              }
            )
            .then((res) => {
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
    alert(
      "Please check your prescription status in 24 hours by clicking on the 'Check Prescription Status' button"
    );
  };

  const prescriptionStatusHandler = async () => {
    axios
      .post(prescriptionStatusCheckRoute, {
        user,
        productId: id,
      })
      .then((res) => {
        if (res.data && res.data.prescription && res.data.prescription.status) {
          setPrescriptionStatus(res.data.prescription.status);
          alert(
            "Your prescription has been approved. You can now add this product to your cart"
          );
        } else {
          alert(
            "Your prescription has not been approved yet. Please wait for 24 hours"
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
          {product.category === "prescribe" && prescriptionStatus && (
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
          {product.category === "prescribe" && !prescriptionStatus && (
              <>
                <button
                type="submit"
                class="btn btn-success"
                style={{
                  margin: "16px 0px 0px 0px",
                }}
                onClick={prescriptionStatusHandler}
              >
                Check Prescription Status
              </button>
              <br />
              <small>
                Click on <b>*Check Prescription Status*</b> button to check whether
                your prescription is accepted or rejected
              </small>
            </>)
          }
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
  margin-top: 5%;
`;

export default ProductPage;
