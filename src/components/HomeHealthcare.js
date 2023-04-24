import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Product from "./Product";
import axios from "axios";
import { healthcareProductsRoute } from "../utils/APIRoutes";

const HomeHealthcare = () => {
  const [popularProducts, setPopularProducts] = useState([]);

  useEffect(() => {
    axios
      .get(healthcareProductsRoute)
      .then((res) => {
        setPopularProducts(res.data.slice(0,4));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Container>
      {popularProducts.map((item) => {
        return (
          <>
            <Product item={item} key={item.id} />
          </>
        );
      })}
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export default HomeHealthcare;
