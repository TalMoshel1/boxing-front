import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import themeSlice from "../redux/themeSlice.js";
import { styled } from "styled-components";
import { ToggleTheme } from "../components/ToggleTheme.jsx";
import MenuIcon from "@mui/icons-material/Menu";
import MenuList from "./MenuList.jsx";
import { toggle } from "../redux/menuReducer.js";
import { useMenu } from '../context/useMenu';

export function Navbar() {
  const { isMenuOpen, toggleMenu } = useMenu();

  return (
    <>
      <Nav className={"sticky-nav"}>
        <MenuIcon
          className="menu"
          onClick={toggleMenu}
          style={{
            marginRight: '0.5rem',
            boxShadow: isMenuOpen ? '0 4px 8px rgba(0, 0, 0, 0.2)' : 'none', // Apply shadow when menu is open
            transform: isMenuOpen ? 'scale(1.2)' : 'none'
          }}
        />
      </Nav>
    </>
  );
}

const Nav = styled.nav`
  background-color: ${(props) => props.theme.colors.headerBackground};
  border: 1px solid ${(props) => props.theme.colors.borderColor};
  color: ${(props) => props.theme.colors.lettersBig};
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 5svh;
  margin-bottom: 0;
  width: 100%;
  direction: rtl;
  border-radius: 2px;
  position: absolute;
  top: 0;
  overflow: hidden;
  z-index: 5;

  .menu:hover {
    cursor: pointer;
    transform: scale(1.1);
  }

  @media (orientation: portrait) {
    .list-container {
      width: 100%;
      justify-content: space-evenly;
    }
  }

  a {
    border-bottom: 3px solid black;
    z-index: 1;
  }

  a:hover {
    border-bottom: 3px solid black;
  }

  .change-colors {
    cursor: pointer;
    transition: color;
  }

  .homeLink,
  .favoritesLink {
    border-bottom: 3px solid black;
  }
  .site-header {
    margin-left: 1em;
  }

  a {
    border-bottom: 1px solid transparent;
    transition: border;
    padding-bottom: 10px;
    text-decoration: none;
  }

  button {
    font-size: 1rem;
  }

  .spread-nav-items-evenly {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    text-align: center;
  }

  a {
    padding-bottom: 0;
  }

  .change-colors {
    font-size: 10px;
  }

  .list-container {
    display: flex;
    align-items: center;
  }

  @media (orientation: landscape), (min-width: 700px) {
    a,
    .list-container {
      margin-right: 3em;
    }

    .site-header {
      margin-left: 3em;
    }

    .sticky-nav {
      position: fixed;
      top: 0;
    }

    .change-colors {
      font-size: 1rem;
    }
  }
`;
