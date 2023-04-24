import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Product from "./Product";
import axios from "axios";

const Pharmaceutical = ({popularProducts}) => {
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

export default Pharmaceutical;
