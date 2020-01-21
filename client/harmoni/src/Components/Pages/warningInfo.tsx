import React from "react";
import styled from "styled-components";

const Container = styled.div`
  height: 80vh;
  display: grid;
  justify-items: center;
  align-items: center;
`;

const Wrapper = styled.div`
  display: grid;
  align-items: center;
  justify-items: center;
`;

interface IBtnWrapper {
  split: boolean;
}

const BtnWrapper = styled.div<IBtnWrapper>`
  display: grid;
  grid-template-columns: ${props => (props.split ? "1fr 1fr" : "1fr")};
  margin-top: 50px;
`;

const Title = styled.h2`
  font-size: 72px;
  font-weight: 900;
  margin-bottom: 20px;
`;

const UnderTitle = styled.h3`
  font-size: 28px;
  font-weight: 500;
  margin-bottom: 40px;
`;

const Text = styled.p`
  font-size: 14px;
  font-weight: 400;
  color: #8a8a8a;
  width: 80%;
  text-align: center;
`;

interface IProps {
  title: string;
  underTitle?: string;
  text?: string;
  btn1_component?: JSX.Element;
  btn2_component?: JSX.Element;
}

const WarningInfo = (props: IProps) => (
  <Container>
    <Wrapper>
      <Title>{props.title}</Title>
      <UnderTitle>{props.underTitle}</UnderTitle>
      <Text>{props.text}</Text>

      <BtnWrapper
        split={
          props.btn1_component !== undefined &&
          props.btn2_component !== undefined
        }
      >
        {props.btn1_component}
        {props.btn2_component}
      </BtnWrapper>
    </Wrapper>
  </Container>
);

export default WarningInfo;
