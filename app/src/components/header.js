import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

import logo from "../images/logo-esclable.png";

class Class extends React.Component {
  render() {
    return (
      <Header>
        <HeaderContainer>
          <Logo src={logo} />
          <HeaderMenu>
            <HeaderMenuTab href='http://127.0.0.1:3000/home'>
              <NavLink to='login' activeClassName='active'>
                Accueil
              </NavLink>
            </HeaderMenuTab>
            <HeaderMenuTab>
              <NavLink to='theme' activeClassName='active'>
                Theme
              </NavLink>
            </HeaderMenuTab>
            <HeaderMenuTab>
              <NavLink to='./question' activeClassName='active'>
                Quizz
              </NavLink>
            </HeaderMenuTab>
            <HeaderMenuTab>
              <NavLink to='./result' activeClassName='active'>
                Resultat
              </NavLink>
            </HeaderMenuTab>
          </HeaderMenu>
        </HeaderContainer>
      </Header>
    );
  }
}

const Header = styled.header`
  z-index: 99;
  padding: 0 40px;
  height: 80px;
  width: 100vw;
  background-color: #1c1917;
`;

const HeaderContainer = styled.div`
  margin: 0 auto;
  height: 100%;
  max-width: 1440px;
  width: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.img`
  height: 50px;
  width: auto;
`;

const HeaderMenu = styled.ul`
  height: 40px;
  padding: 0;
  display: grid;
  align-items: center;
  grid-template-columns: auto auto auto auto;
  grid-gap: 45px;
  color: white;
  list-style-type: none;
  font-size: 14px;
  font-weight: 500;
`;

const HeaderMenuTab = styled.li`
  cursor: pointer;
  & > a {
    color: grey;
    text-decoration: none;
  }
  & > a.active {
    color: white;
  }
`;

export default Class;
