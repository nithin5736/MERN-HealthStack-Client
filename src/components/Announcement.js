import React from "react";
import styled from "styled-components";

const Announcement = () => {
  return (
    <Container>Introducing Health Stack healthcare services. Flash Service Sale🌟!</Container>
  );
};

const Container = styled.div`
   height: 30px;
   background-color: teal;
   color: white;
   display: flex;
   align-items: center;
   justify-content: center;
   font-size: 14px;   
   font-weight: 500px;
`;

export default Announcement;
