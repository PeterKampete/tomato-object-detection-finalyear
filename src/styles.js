import styled from "styled-components";

export const NavbarContainer = styled.div`
  width: 100%;
  height: 60px;
  background-color: rgb(154,154,154);
  margin: 0;
  padding: 0;
  &h2 {
    color: red
  }
`;
export const Button = styled.button`
  width: 40%;
  height: 40px;
  background-color: rgba(0,180,0,0.5);
  border: none;
  border-radius: 4px;
  :hover{
    background-color: rgba(0,175,0,0.6);
  }
`;
export const Main = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 80vh;
  box-sizing: border-box;
  justify-content: space-between;
`;
