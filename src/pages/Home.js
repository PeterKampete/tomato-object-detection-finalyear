import React from "react";
import { Link } from "react-router-dom";
import { AuthContainer, CustomLink, AuthButton, H1, Input } from "../styles";
import image from "../images/0025.jpg";
import "../App.css";

const Home = () => {
  return (
    <div className="Home">
      <H1>WELCOME</H1>
      <AuthContainer>
        <img
          src={image}
          alt="nothing"
          style={{ width: "80px", height: "80px" }}
        />
        <Input>
          <input type="text" placeholder="Enter your name" />
        </Input>
        <Input>
          <input type="text" placeholder="Enter your password..." />
        </Input>
        <CustomLink to="/dashboard">
          <AuthButton onClick>Sign Up</AuthButton>
        </CustomLink>
      </AuthContainer>
    </div>
  );
};

export default Home;
