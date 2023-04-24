import React from "react";
import styled from "styled-components";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import RoomSharpIcon from "@mui/icons-material/RoomSharp";
import LocalPhoneSharpIcon from "@mui/icons-material/LocalPhoneSharp";
import MailOutlineSharpIcon from "@mui/icons-material/MailOutlineSharp";
import { Link } from "react-router-dom";
import { mobile } from "../responsive";

const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo>Health Stack</Logo>
        <Desc>
          HealthStack offers medicines and health products across various
          categories through its retail partners. You can simply place an order
          on our website and we will deliver your with a guaranteed delivery to
          you in 24-48 hrs!
        </Desc>
        <SocialContainer>
          <SocialIcon color="3B5999">
            <FacebookIcon />
          </SocialIcon>
          <SocialIcon color="E4405F">
            <InstagramIcon />
          </SocialIcon>
          <SocialIcon color="55ACEE">
            <TwitterIcon />
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>Useful Links</Title>
        <List>
          <ListItem>
            <Link to="/main" style={{ textDecoration: "none", color: "black" }}>
              Home
            </Link>
          </ListItem>
          <ListItem>
            <Link to="/cart" style={{ textDecoration: "none", color: "black" }}>
              Cart
            </Link>
          </ListItem>
          <ListItem>
            <Link
              to="/medicines"
              style={{ textDecoration: "none", color: "black" }}
            >
              Medicines
            </Link>
          </ListItem>
          <ListItem>
            <Link
              to="/healthcare"
              style={{ textDecoration: "none", color: "black" }}
            >
              Healthcare Products
            </Link>
          </ListItem>
          <ListItem>
            <Link
              to="/pharmaceutical"
              style={{ textDecoration: "none", color: "black" }}
            >
              Pharmaceutical Products
            </Link>
          </ListItem>
          <ListItem>My Account</ListItem>
          <ListItem>Order Tracking</ListItem>
          <ListItem>
            <Link
              to="/products"
              style={{ textDecoration: "none", color: "black" }}
            >
              Wishlist
            </Link>
          </ListItem>
          <ListItem>
            <Link
              to="/products"
              style={{ textDecoration: "none", color: "black" }}
            >
              FAQ
            </Link>
          </ListItem>
        </List>
      </Center>
      <Right>
        <Title>Contact Us</Title>
        <ContactItem>
          <RoomSharpIcon style={{ marginRight: "10px" }} />{" "}
          <a
            href="https://goo.gl/maps/55Pvy1pt13e5Zx938"
            style={{ textDecoration: "none", color: "black" }}
          >
            Sricity, Chitoor, Andhra Pradesh, India
          </a>
        </ContactItem>
        <ContactItem>
          <LocalPhoneSharpIcon style={{ marginRight: "10px" }} /> +91 83176
          49645
        </ContactItem>
        <ContactItem>
          <MailOutlineSharpIcon style={{ marginRight: "10px" }} />
          healthstack@gmail.com
        </ContactItem>
        <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
      </Right>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  ${mobile({ flexDirection: "column" })}
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Logo = styled.h1``;

const Desc = styled.p`
  margin: 20px 0px;
`;

const SocialContainer = styled.div`
  display: flex;
`;

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ display: "none" })}
`;

const Title = styled.h3`
  margin-bottom: 30px;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ backgroundColor: "#fff8f8" })}
`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const Payment = styled.img`
  width: 50%;
`;

export default Footer;
