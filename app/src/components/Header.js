import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

import logo from "../images/logo-esclable.png";

class Header extends React.Component {
  render() {
    return (
      <HeaderStyled>
        <HeaderContainer>
          <LeftContainer>
            <Title>Le quizz du Berger</Title>
          </LeftContainer>
          <HeaderMenu>
            <HeaderMenuTab href='http://127.0.0.1:3000'>
              <NavLink to='/'>Accueil</NavLink>
            </HeaderMenuTab>
            <HeaderMenuTab>
              <NavLink to='/theme'>Themes</NavLink>
            </HeaderMenuTab>
            <HeaderMenuTab>
              <NavLink to='/result'>Resultats</NavLink>
            </HeaderMenuTab>
            <HeaderMenuTab>
              <NavLink to='/login'>Se connecter</NavLink>
            </HeaderMenuTab>
            <QuizzButton>
              <NavLink to='/theme'>Quizz</NavLink>
            </QuizzButton>
          </HeaderMenu>
        </HeaderContainer>
      </HeaderStyled>
    );
  }
}

const HeaderStyled = styled.header`
  z-index: 99;
  width: 100vw;
  position: fixed;
  padding: 0 40px;
  height: 80px;
  background-color: #111827;
`;

const HeaderContainer = styled.div`
  margin: 0 auto;
  height: 100%;
  max-width: auto;
  width: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LeftContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-gap: 5px;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  color: white;
  font-family: Merriweather;
  font-size: 22px;
  font-weight: bold;
`;

const Logo = styled.img`
  height: 40px;
  width: auto;
`;

const HeaderMenu = styled.ul`
  height: 40px;
  padding: 0;
  display: grid;
  align-items: center;
  grid-template-columns: auto auto auto auto auto;
  grid-gap: 40px;
  color: white;
  list-style-type: none;
  font-size: 14px;
  font-weight: 500;
`;

const HeaderMenuTab = styled.li`
  cursor: pointer;
  & > a {
    color: rgba(156, 163, 175, 1);
    text-decoration: none;
  }
`;

const QuizzButton = styled.button`
  padding: 10px 25px;
  background-color: #facc15;
  height: 40px;
  border: none;
  border-radius: 44px;
`;

export default Header;
