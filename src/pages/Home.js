import React from "react";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import Slider from "../components/Slider";
import Categories from "../components/Categories";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import styled from "styled-components";
import HomeMedicines from "../components/HomeMedicines";
import HomePharmaceutical from "../components/HomePharmaceutical";
import HomeHealthcare from "../components/HomeHealthcare";

const Home = () => {
  return (
    <div>
      <Announcement />
      <Navbar />
      <Slider />
      <br />
      <Center>
        <Logo>OUR CATEGORIES</Logo>
      </Center>
      <Categories />
      <Center>
        <Logo>MEDICINES</Logo>
      </Center>
      <HomeMedicines />
      <Center>
        <Logo>HEALTHCARE PRODUCTS</Logo>
      </Center>
      <HomeHealthcare />
      <Center>
        <Logo>PHARMACEUTICAL PRODUCTS</Logo>
      </Center>
      <HomePharmaceutical />
      <Newsletter />
      <Footer />
    </div>
  );
};

const Logo = styled.h1`
  font-weight: 500;
  font-size: 2.8rem;
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

export default Home;
