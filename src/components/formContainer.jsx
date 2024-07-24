import React from "react"
import styled from "styled-components";


const Container = styled.main`
  // height: 95svh;
  margin-top:3rem;
  align-items: center;
  display: flex;
  justify-content: center;
`
const FormContainer = ({children}) => {
  return (
    <Container>
        {children}
    </Container>
  )
};

export default FormContainer;
