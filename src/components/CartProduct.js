import React, { useState, useContext } from "react";
import { ThemeContext } from "../App";
import styled from "styled-components";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

const CartProduct = ({ c }) => {
  const [count, setCount] = useState(1);
  const { total, setTotal, totalCount, setTotalCount } =
    useContext(ThemeContext);

  return (
    <>
      {c.price && (
        <>
          <Product>
            <ProductDetail>
              <Image src={c.img} />
              <Details>
                <ProductName>
                  <b>Product: </b> {c.productname}
                </ProductName>
                <ProductId>
                  <b>ID: {c.id}</b>
                </ProductId>
              </Details>
            </ProductDetail>
            <PriceDetail>
              <ProductAmountContainer>
                <AddIcon
                  onClick={() => {
                    if (count < 20) {
                      setCount(count + 1);
                      setTotalCount(totalCount + 1);
                      setTotal(total + parseInt(c.price));
                    }
                  }}
                />
                <ProductAmount>{count}</ProductAmount>
                <RemoveIcon
                  onClick={() => {
                    if (count > 1) {
                      setCount(count - 1);
                      setTotalCount(totalCount - 1);
                      setTotal(total - parseInt(c.price));
                    } else {
                      setCount(0);
                      setTotalCount(totalCount - 1);
                      setTotal(total - parseInt(c.price));
                      delete c.productname;
                      delete c.price;
                      delete c.id;
                      delete c.img;
                    }
                  }}
                />
              </ProductAmountContainer>
              <ProductPrice>Rs. {c.price * count}</ProductPrice>
            </PriceDetail>
          </Product>
          <Hr />
        </>
      )}
    </>
  );
};

export default CartProduct;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Image = styled.img`
  width: 250px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span`
  font-size: 25px;
`;

const ProductId = styled.span``;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 25px;
  margin: 5px;
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 300;
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1.5px;
`;
