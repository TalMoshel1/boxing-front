import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Item = styled.li`
  color: ${(props) => props.theme.colors.dropDownText};
  padding: 2rem;
  all: unset;
  display: flex;
  align-items: center;
  justify-content: center;
  
  border-left: 1px solid black;
  // border-right: 1px solid black;
  text-align: center;
  cursor: pointer;
  height: 100%;

  &:hover, &:active{
    color: ${(props) => props.theme.colors.dropDownTextActiveHover};
  }

    h2 { 
      padding: 1rem;
  }

  @media (orientation: landscape) {
  width: 25%
  }

  @media (orientation: portrait) { 

  width: max-content;
  }

  h2 {
    all: unset;
  }
`;

const MenuList = ({ isMenuOpen, handleToggleMenu }) => {
  const navigate = useNavigate();

  const handleClick = (endpoint) => {
    navigate(`/${endpoint}`);
    handleToggleMenu();
  };

  if (isMenuOpen) {
    return (
      <StyledMenuList
      initial={{ y: "-100vh" }} 
      animate={{ y: isMenuOpen ? 0 : "-100vh" }} 
      transition={{ duration: 0.4, ease: "easeOut" }} 
      >
        <Item onClick={() => handleClick("calendar")}>
          <h2 style={{ fontSize: "1rem" }}>מערכת שעות</h2>
        </Item>
        <Item onClick={() => handleClick("requestPrivte")}>
          <h2 style={{ fontSize: "1rem", padding: "1rem", flexGrow: '1' }}>
            בקש לקבוע שיעור פרטי
          </h2>
        </Item>
        <Item>
          <h2 style={{ fontSize: "1rem", padding: "1rem" }} onClick={()=> handleClick('')}>דף הבית</h2>
        </Item>
        <Item onClick={() => handleClick("signin")}>
          <h2 style={{ fontSize: "1rem", padding: "1rem" }}>ניהול</h2>
        </Item>
      </StyledMenuList>
    );
  }
  return null;
};

const StyledMenuList = styled(motion.ul)`
  &:hover{
    background-color: ${(props) => props.theme.colors.dropDownBackgroundActiveHover};
  }
  background-color: ${(props) => props.theme.colors.dropDownBackground};
  width: 100%;
  height:10svh;
  top: 0;
  right: 0;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  padding-right: 0;
  z-index: 1; /* Ensure it is above other content */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2); /* Optional: Add shadow for better visibility */
  overflow-y: auto; /* Add scrolling if content overflows */
`;

export default MenuList;
