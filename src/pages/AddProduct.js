import React, { useState,useEffect } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Announcement from "../components/Announcement";
import addproduct from "../images/addproduct.gif";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { productRoute } from "../utils/APIRoutes";
import { addProductRoute } from "../utils/APIRoutes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { USER_KEY } from "../utils/secretkeys";

const AddProduct = () => {
  const [addProduct, setAddProduct] = useState({
    productname: "",
    img: "",
    price: "",
    type: "",
  });
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [flag, setFlag] = useState(1);


  useEffect(() => {
    axios.get(productRoute)
    .then((res) => {
      setProducts(res.data);
    })
    .catch((err) => {
      console.log(err);
    })
  }, []);

  const checkForDuplicate = () => {
    for (let i = 0; i < products.length; i++) {
      if (products[i].productname === addProduct.productname) {
        alert("item alredy exits");
        setFlag(0);
        return;
      }
    }
  };

  const addProductHandler = async (e) => {
    e.preventDefault();

    checkForDuplicate();

    if (flag === 1) {
      axios
        .post(addProductRoute, {
          productname: addProduct.productname,
          img: addProduct.img,
          price: addProduct.price,
          status: "active",
          type: addProduct.type,
        }, {
          headers: {
            authorization: "Bearer " + JSON.parse(localStorage.getItem(USER_KEY)).accessToken 
          }
        })
        .then((res) => {
          if(res.data.status){
            alert("Your Product added successfully");
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
            alert("Item already exits.So item can't be added.");
          }
        });
      setAddProduct({
        productname: "",
        img: "",
        price: "",
        type: "",
      });
    }
  };

  return (
    <>
      <Announcement />
      <Navbar />
      <Center>
        <Logo>ADD YOUR PRODUCT</Logo>
      </Center>
      <Container>
        <Img src={addproduct} alt="Add product" />
        <FormDiv>
          <form onSubmit={addProductHandler}>
            <div class="form-group">
              <label for="exampleInputEmail1">Product Name</label>
              <input
                type="text"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter Product Name"
                value={addProduct.productname}
                onChange={(e) => {
                  setAddProduct({ ...addProduct, productname: e.target.value });
                }}
                required
              />
              <small id="emailHelp" class="form-text text-muted">
                We'll never share this information with anyone else.
              </small>
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Image URL</label>
              <input
                type="text"
                class="form-control"
                id="exampleInputPassword1"
                placeholder="Enter Image URL"
                value={addProduct.img}
                onChange={(e) => {
                  setAddProduct({ ...addProduct, img: e.target.value });
                }}
                required
              />
              <small id="emailHelp" class="form-text text-muted">
                We'll never share this information with anyone else.
              </small>
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Price</label>
              <input
                type="number"
                class="form-control"
                id="exampleInputPassword1"
                placeholder="Enter Price"
                value={addProduct.price}
                onChange={(e) => {
                  setAddProduct({ ...addProduct, price: e.target.value });
                }}
                required
              />
              <small id="emailHelp" class="form-text text-muted">
                We'll never share this information with anyone else.
              </small>
            </div>
            <fieldset class="row mb-3">
              <legend class="col-form-label col-sm-2 pt-0">Product</legend>
              <div class="col-sm-10">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="type"
                    id="gridRadios1"
                    value="medicine"
                    onChange={(e) => {
                      setAddProduct({ ...addProduct, type: e.target.value });
                    }}
                    required
                  />
                  <label class="form-check-label" for="gridRadios1">
                    Medicine
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="type"
                    id="gridRadios2"
                    value="healthcare"
                    onChange={(e) => {
                      setAddProduct({ ...addProduct, type: e.target.value });
                    }}
                    required
                  />
                  <label class="form-check-label" for="gridRadios2">
                    Healthcare
                  </label>
                </div>
                <div class="form-check disabled">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="type"
                    id="gridRadios3"
                    value="pharmaceutical"
                    onChange={(e) => {
                      setAddProduct({ ...addProduct, type: e.target.value });
                    }}
                    required
                  />
                  <label class="form-check-label" for="gridRadios3">
                    Pharmaceutical
                  </label>
                </div>
              </div>
            </fieldset>
            <button type="submit" class="btn btn-primary">
              ADD PRODUCT
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
  flex: 0.7;
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

export default AddProduct;
