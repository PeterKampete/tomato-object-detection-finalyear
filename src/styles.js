import styled from "styled-components";
import { Link } from "react-router-dom";

export const NavbarContainer = styled.div`
  width: 100%;
  height: 60px;
  background-color: rgba(137, 18, 18, 0.8);
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  padding: 0px 10px;
  color: white
`;
export const Button = styled.button`
  width: 40%;
  height: 40px;
  background-color: #ffffff;
  border: none;
  border-radius: 4px;
  border: 2px solid rgb(137, 18, 18);
  :hover {
    background-color: rgb(137, 18, 18);
    color: white;
    transition: 0.2s ease-in-out;
    border: 2px solid #ffffff;
    font-weight: bold;
  }
`;
export const Main = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  justify-content: space-between;
`;
export const Statistics = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  box-sizing: border-box;
  justify-content: space-between;
`;
export const H1 = styled.h1`
  text-align: center;
  color: white;
  margin-bottom: 20px;
`;
export const AuthContainer = styled.div`
  box-shadow: 0px 0px 3px 6px rgba(255, 255, 255, 0.8);
  height: 50%;
  width: 40%;
  margin-top: 40px;
  padding-bottom: 2px;
  padding-top: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    margin-bottom: 20px;
  }
`;
export const Input = styled.div`
  border: none;
  width: 80%;
  border-radius: 8px;
  margin: 12px 0px;
  :focus {
    border: none;
    outline: none;
  }
  input {
    width: 100%;
    padding: 14px;
    border: none;
    border-radius: 6px;
  }
`;

export const AuthButton = styled(Button)`
  margin-top: 40px;
`;
export const CustomLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  text-decoration: none
`;
