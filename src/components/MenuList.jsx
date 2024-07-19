import React from "react";
import { motion } from "framer-motion";
import "../css-components/menu.css";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { toggle } from "../redux/menuReducer";
import { useDispatch } from "react-redux";
import { useMenu } from "../context/useMenu";

const Item = styled.li`
  padding: 1rem;
  all: unset;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 33%;
  flex-grow:1;
  width: 100%;
  border:1px solid black;
  text-align: center;
  cursor: pointer;

  h2 {
  all: unset;
  }
`;
const MenuList = () => {

  const navigate = useNavigate()

  const { isMenuOpen, toggleMenu } = useMenu();
  

  const handleClick = (endpoint) => {
    navigate(`/${endpoint}`)
    toggleMenu()

  }

  return (
    <motion.ul
      style={{
        backgroundColor: "pink",
        width: "20%",
        height:'50%',
        direction: "rtl",
        position: "absolute",
        top: "5svh",
        margin: "0",
        right: "0",
        zIndex: "1",
        display:'flex',
        flexDirection:'column',
        alignItems: 'center',
        paddingRight: '0'
      }}
      initial={{ x: "100vw" }} 
      animate={{ x: 0 }} 
      transition={{ duration: 0.5, ease: "easeOut" }} 
    >
      <Item onClick={()=>handleClick('calendar')}><h2 style={{fontSize: '1rem'}}>מערכת שעות</h2></Item>
      <Item onClick={()=>handleClick('requestPrivte')}><h2 style={{fontSize: '1rem', padding: '1rem'}}>בקש לקבוע שיעור פרטי</h2></Item>
      <Item><h2 style={{fontSize: '1rem', padding: '1rem'}}>על הצוות</h2></Item>
      <Item onClick={()=>handleClick('signin')}><h2 style={{fontSize: '1rem', padding: '1rem'}}>ניהול</h2></Item>
    </motion.ul>
  );
};

export default MenuList;
