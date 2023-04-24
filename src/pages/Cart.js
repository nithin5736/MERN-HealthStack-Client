import React, { useContext, useState } from "react";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { ThemeContext } from "../App";
import CartProduct from "../components/CartProduct";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StripeCheckoutButton from "../components/stripe-button/StripeButton";

const Cart = () => {
  const deliver = 40;
  const { cart, total, totalCount } = useContext(ThemeContext);

  return (
    <Container>
      <Announcement />
      <Navbar />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <Link to="/medicines">
            <TopButton>CONTINUE ORDERING</TopButton>
          </Link>
          <TopTexts>
            <TopText style={{ textDecoration: "none" }}>
              ORDERS BAG ({totalCount})
            </TopText>
          </TopTexts>
          <TopButton type="filled">CHECKOUT NOW</TopButton>
        </Top>

        <Bottom>
          <Info>
            {cart.map((c) => {
              return <CartProduct key={c.id} c={c} />;
            })}
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>SubTotal</SummaryItemText>
              <SummaryItemPrice>Rs. {total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping (minimum)</SummaryItemText>
              <SummaryItemPrice>
                Rs. {totalCount + parseInt(`${totalCount > 0 ? deliver : 0}`)}
              </SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>(10 %) Discount</SummaryItemText>
              <SummaryItemPrice>Rs. {0.1 * total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>
                Rs.
                {total -
                  0.1 * total +
                  totalCount +
                  parseInt(`${totalCount > 0 ? deliver : 0}`)}
              </SummaryItemPrice>
            </SummaryItem>
            <span style={{ marginLeft: "32%" }}>
              <StripeCheckoutButton total={total} totalCount={totalCount} />
            </span>
          </Summary>
        </Bottom>
      </Wrapper>
      <ToastContainer />
      <Footer />
    </Container>
  );
};

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  font-weight: 500;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div``;

const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
  font-weight: 600;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Info = styled.div`
  flex: 3;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 58vh;
  background-color: black;
`;

const SummaryTitle = styled.h1`
  font-size: 35px;
  font-weight: 400;
  color: white;
`;

const SummaryItem = styled.div`
  margin: 35px 0px;
  display: flex;
  color: white;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: white;
  color: black;
  font-weight: 600;
`;

export default Cart;
