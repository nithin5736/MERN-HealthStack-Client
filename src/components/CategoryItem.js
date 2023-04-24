import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { mobile } from "../responsive";

const CategoryItem = ({ item }) => {
  return (
    <Container>
      <Image src={item.img} />
      <Info>
        <Title>{item.title}</Title>
        <Link
          to={`/${item.type}`}
          style={{ textDecoration: "none", color: "black" }}
        >
          <Button>SHOP NOW</Button>
        </Link>
      </Info>
    </Container>
  );
};

const Container = styled.div`
  flex: 1;
  margin: 3px;
  height: 70vh;
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  ${mobile({ height: "30vh" })}
`;

const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Title = styled.h1`
  color: white;
  font-size: 30px;
  margin-bottom: 20px;
`;

const Button = styled.button`
  border: none;
  padding: 10px;
  background-color: white;
  color: gray;
  cursor: pointer;
  font-weight: 700;
`;

export default CategoryItem;
