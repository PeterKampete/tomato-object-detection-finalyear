import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 530px;
  width: 100%;
  padding: 20px;
  justify-content: space-between;
`;
export const Image = styled.div`
  width: 150px;
  height: 150px;
  overflow: hidden;
  padding: 5px;
`;
export const Card = styled.div`
  display: grid;
  grid-template-rows: 0.4fr 1fr;
  align-items: center;
  box-shadow: ${({ bShadow }) => bShadow};
  width: 100%;
  height: 60%;
  justify-content: center;
  transform: scale(0.9);
  :hover {
    transition: 1s ease-in-out;
    transform: scale(1);
  }
`;
export const Heading = styled.h2`
  margin: 0px;
  text-transform: uppercase;
  text-align: center;
  padding: 0px;
  color: ${(props) => props.color};
  font-size: 20px;
`;
export const Value = styled.h1`
  margin: 0px;
  text-transform: uppercase;
  text-align: center;
  padding: 0px;
  color: ${(props) => props.color};
  font-size: 80px;
`;
export const ValueContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
