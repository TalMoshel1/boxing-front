import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import InfoIcon from "@mui/icons-material/Info";
import ListAltIcon from "@mui/icons-material/ListAlt";

const MainHome = styled.main`

  height: calc(100svh - 5rem);
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  font-size:0.8rem;

  h2 { 
  text-align: center;
  }
  section {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: transform 0.2s ease-in-out;
    cursor: pointer;
    border:1px solid black;
    border-radius: 12px;
    width:25%;
    height: 20%;

    &:hover {
      transform: scale(1.1);
    }



  }
`;

const Home = () => {

  const navigate = useNavigate();

  return (
    <MainHome>
      <section onClick={()=>{navigate('/calendar')}}>
        <h2>לוח שעות</h2>
        <CalendarMonthIcon className="icon" />
      </section>
      {/* <section>
        <h2>מי אנחנו</h2>
        <InfoIcon className="icon" />
      </section> */}
      <section onClick={()=>{navigate('/requestPrivte')}} >
        <h2>קבע אימון אישי</h2>
        <ListAltIcon className="icon" />
      </section>
    </MainHome>
  );
};

export default Home;
