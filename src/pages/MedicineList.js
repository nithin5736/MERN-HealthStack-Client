import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Medicines from "../components/Medicines";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { medicineProductsRoute } from "../utils/APIRoutes";

const MedicineList = () => {
  const [popularProducts, setPopularProducts] = useState([]);
  const [originalProducts, setOriginalProducts] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    axios
      .get(medicineProductsRoute)
      .then((res) => {
        setPopularProducts(res.data);
        setOriginalProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const sortFunc = (e) => {
    if (e.target.value === "asc") {
      let temp = [...popularProducts];
      temp.sort((p1, p2) =>
        parseInt(p1.price) > parseInt(p2.price)
          ? 1
          : parseInt(p1.price) < parseInt(p2.price)
          ? -1
          : 0
      );
      setPopularProducts(temp);
    } else {
      let temp = [...popularProducts];
      temp.sort((p1, p2) =>
        parseInt(p1.price) < parseInt(p2.price)
          ? 1
          : parseInt(p1.price) > parseInt(p2.price)
          ? -1
          : 0
      );
      setPopularProducts(temp);
    }
  };

  const searchHandler = (e) => {
    setSearchInput(e.target.value);
    const temp = popularProducts.filter((p) => {
      return p.productname.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setPopularProducts(temp);
    if (e.target.value === "") {
      setPopularProducts(originalProducts);
    }
  };

  return (
    <Container>
      <Announcement />
      <Navbar />
      <Center>
        <Title>Medicines</Title>
      </Center>
      <FilterContainer>
        <SearchConatiner>
          <Input
            placeholder="Search"
            value={searchInput}
            onChange={searchHandler}
          />
          <SearchIcon style={{ color: "gray", fontSize: 20 }} />
        </SearchConatiner>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select onChange={sortFunc}>
            <Option selected>Filter</Option>
            <Option value="asc">Price (asc)</Option>
            <Option value="desc">Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Medicines popularProducts={popularProducts} />
      <Newsletter />
      <Footer />
    </Container>
  );
};

const Container = styled.div``;

const SearchConatiner = styled.div`
  border: 1px solid lightgrey;
  display: flex;
  align-items: center;
  margin-left: 25px;
  margin: 20px;
`;

const Input = styled.input`
  border: none;
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
`;

const Option = styled.option``;

export default MedicineList;
