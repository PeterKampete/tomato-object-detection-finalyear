import React from "react";
import { Container, Image, Card, Heading, Value, ValueContainer } from "./styles";

const RipeCard = ({ src, heading, value, color, bShadow, bgColor }) => {
  return (
    <Container>
      <Image>
        <img
          src={src}
          alt="nothing"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "center",
            borderRadius: "50%",
          }}
        />
      </Image>
      <Card bShadow={bShadow}>
        <div
          style={{
            backgroundColor: "white",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Heading color={color}>{heading}</Heading>
        </div>
        <ValueContainer bgColor={bgColor}>
          <Value>{value}</Value>
        </ValueContainer>
      </Card>
    </Container>
  );
};

export default RipeCard;
