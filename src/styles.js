import styled from "styled-components";
import { Link } from "react-router-dom";

export const NavbarContainer = styled.div`
  width: 100%;
  height: 60px;
  background-color: #13033b;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr 0.1fr;
  align-items: center;
  justify-content: space-between;
  padding: 0px 10px;
  color: white;
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
export const GetStatistics = styled(Button)`
  width: 30%;
  height: 50px;
  font-weight: bold;
  margin-top: 60px;
  background-color: #fff;
  color: #13033b;
  border: none;
  :hover {
    background-color: #13033b;
    border: 2px solid #fff;
  }
`;

export const Main = styled.div`
  display: grid;
  grid-template-columns: 1fr 0.7fr;
  box-sizing: border-box;
`;

export const ConStatistics = styled.div`
  width: 100%;
  display: grid;
  grid-template-rows: 1fr 0.5fr;
  grid-template-columns: 1fr;
  justify-content: center;
  row-gap: 0px;
`;
export const ConCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  :hover {
    transition: 1s ease-in-out;
  }
`;
export const ConCard1 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  transform: scale(1);
  background-color: rgba(200, 200, 200);
  color: rgba(200, 200, 200);
  width: 100%;
  :hover {
    transition: 1s ease-in-out;
    background-color: rgba(200, 200, 200);
  }
`;
export const RipeStatistics = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  box-sizing: border-box;
  justify-content: space-between;
`;
export const AuthContainer = styled.div`
  box-shadow: 0px 0px 3px 6px rgba(255, 255, 255, 0.8);
  height: 60%;
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
  text-decoration: none;
`;
export const Percentage = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: 1.5px 0px 2px 1px #603bbb;
  border-radius: 50%;
  padding: 20px;
  justify-content: space-evenly;
  align-items: center;
`;
export const H12 = styled.h1`
  margin-bottom: 0px;
  font-size: 20px;
  font-weight: bold;
  color: #603bbb;
`;
export const H11 = styled.h1`
  margin-bottom: 0px;
  font-size: 40px;
  font-weight: bold;
  color: #603bbb;
`;
export const H1 = styled.h1`
  margin-bottom: 0px;
  font-size: 80px;
  font-weight: bold;
  color: #603bbb;
`;
