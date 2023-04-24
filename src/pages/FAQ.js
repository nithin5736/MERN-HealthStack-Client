import React from "react";
import Collapsible from "react-collapsible";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import Footer from "../components/Footer";

const FAQ = () => {
  return (
    <>
      <Announcement />
      <Navbar />
      <Body>
        <Head>
          <h1>FREQUENTLY ASKED QUESTIONS</h1>
        </Head>
        <Box>
          <Fst>
            <Collapsible
              trigger=<h3
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <span>
                  How can I change the email address linked to my account?
                </span>
                <span>+</span>
              </h3>
            >
              <p>
                If you want to change your email ID, you can go to the "Account"
                section and click on "edit" and change the mentioned email ID
                and a verification email will be sent to your new email ID.
              </p>
            </Collapsible>
          </Fst>
          <Fst>
            <Collapsible
              trigger=<h3
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <span>What is a valid prescription?</span>
                <span>+</span>
              </h3>
            >
              <p>
                A valid prescription has the following information:<br></br>
                Doctor’s details<br></br>
                Patient’s details<br></br>
                Medicine details<br></br>
                Dosage details<br></br>
                Date of Prescription
              </p>
            </Collapsible>
          </Fst>
          <Fst>
            <Collapsible
              trigger=<h3
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <span>
                  Which medicines are not deliverable through your platform?
                </span>
                <span>+</span>
              </h3>
            >
              <p>
                As per the guidelines of legal and regulatory authorities of
                Government of India and the company, we do not sell products
                with the 'not for sale' tag through our app & website.
              </p>
            </Collapsible>
          </Fst>
          <Fst>
            <Collapsible
              trigger=<h3
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <span>
                  Are there any delivery charges for Medicine & Healthcare
                  Orders?
                </span>
                <span>+</span>
              </h3>
            >
              <p>
                Yes, delivery charges will be applied based on the value of
                items purchased and the delivery address. Please add the items
                that you require to the cart and input or select the appropriate
                delivery address to see what the delivery charges will be for
                your order.
              </p>
            </Collapsible>
          </Fst>
          <Fst>
            <Collapsible
              trigger=<h3
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <span>I have received damaged items</span>
                <span>+</span>
              </h3>
            >
              <p>
                We are sorry you had to experience this.You can return the
                product and re-order it.We will try to not repeat this type of
                issues.
              </p>
            </Collapsible>
          </Fst>
          <Fst>
            <Collapsible
              trigger=<h3
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <span>
                  How does the virus spread and what are the initial symptoms?
                </span>
                <span>+</span>
              </h3>
            >
              <p>
                Coronavirus disease spreads from person to person through small
                droplets when a person with COVID-19 coughs, exhales or sneezes.
                These droplets are transmitted to the people nearby (within 6
                feet) or possibly be inhaled causing infection.It may also be
                possible that person can get COVID-19 by touching a surface or
                object that has the virus on it and then touching their own
                mouth, nose or eyes.
              </p>
              <p>
                The most common symptoms of COVID-19 are fever, cough &
                difficulty in breathing. Some patients may have aches and pains,
                nasal congestion, runny nose, sore throat or diarrhoea. These
                symptoms are usually mild and spread gradually.
              </p>
            </Collapsible>
          </Fst>
          <Fst>
            <Collapsible
              trigger=<h3
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <span>Items are different from what I ordered</span>
                <span>+</span>
              </h3>
            >
              <p>
                We are sorry you had to experience this.This happens due to miss
                communication,these are the rare cases we fond.we try not to
                repeat them again.
              </p>
            </Collapsible>
          </Fst>
          <Fst>
            <Collapsible
              trigger=<h3
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <span>
                  What coronavirus safety products can I buy on HealthCare?
                </span>
                <span>+</span>
              </h3>
            >
              <p>
                We have a wide range of masks, sanitisers and a special corona
                safety kit as well to keep you and your family protected. You
                can browse these healthcare products and get them delivered at
                your doorstep. Stay safe, stay protected!
              </p>
            </Collapsible>
          </Fst>
          <Fst>
            <Collapsible
              trigger=<h3
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <span>
                  Can I get a different dosage other than what is mentioned in
                  the prescription?
                </span>
                <span>+</span>
              </h3>
            >
              <p>
                No, the medicines will be provided as per the dosage mentioned
                in the prescription. Self-prescribed medicines will not be
                provided.
              </p>
            </Collapsible>
          </Fst>
          <Fst>
            <Collapsible
              trigger=<h3
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <span>Can I buy a substitute medicine on my prescription?</span>
                <span>+</span>
              </h3>
            >
              <p>
                Yes, you may buy other substitutes only if your prescription
                lists the salt names instead of a specific brand name.
              </p>
            </Collapsible>
          </Fst>
        </Box>
      </Body>
      <Footer />
    </>
  );
};

const Body = styled.div`
  height: 1000px;
  background-color: rgb(255, 255, 255);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;

const Head = styled.div`
  margin-top: 20px;
  padding: 20px;
  font-size: 400px;
  h1 {
    margin-left: 100px;
    text-align: center;
  }
`;

const Fst = styled.div`
  padding: 5px;
  margin: 7px;
  font-weight: 20px;
  font-size: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 2.3px -5px rgba(0, 0, 0, 0.02),
    0px 0px 5.6px -5px rgba(0, 0, 0, 0.028),
    0px 0px 10.5px -5px rgba(0, 0, 0, 0.035),
    0px 0px 18.8px -5px rgba(0, 0, 0, 0.042),
    0px 0px 35.1px -5px rgba(0, 0, 0, 0.05),
    0px 0px 84px -5px rgba(0, 0, 0, 0.07);

  p {
    color: #151515;
    font-style: italic;
  }

  &:hover {
    background-color: rgb(222, 222, 224);
  }
`;

const Box = styled.div`
  margin: 25px;
`;

export default FAQ;
