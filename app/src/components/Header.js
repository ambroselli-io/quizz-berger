import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import API from "../services/api";

import logo from "../images/logo.svg";

class Header extends React.Component {
  onLogout = async () => {
    const response = await API.post({
      path: "/user/logout",
    });
    if (response.ok) this.props.setUser(null);
  };
  render() {
    const { user } = this.props;
    return (
      <HeaderStyled>
        <HeaderContainer>
          <LeftContainer>
            <HeaderLogo />
            <Title>Le Quizz du Berger</Title>
          </LeftContainer>
          <HeaderMenu>
            <HeaderMenuTab>
              <NavLink activeClassName='selected' to='/home'>
                Accueil
              </NavLink>
            </HeaderMenuTab>
            <HeaderMenuTab>
              <NavLink activeClassName='selected' to='/result'>
                Résultats
              </NavLink>
            </HeaderMenuTab>
            {!!user?.pseudo ? (
              <HeaderMenuTab onClick={this.onLogout}>
                Se déconnecter
              </HeaderMenuTab>
            ) : (
              <HeaderMenuTab>
                <NavLink activeClassName='selected' to='/login'>
                  Se connecter
                </NavLink>
              </HeaderMenuTab>
            )}
            <QuizzButton>
              <NavLink activeClassName='selected' to='/theme'>
                Quizz
              </NavLink>
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

const HeaderLogo = styled.div`
  margin-right: 5px;
  height: 32px;
  width: 32px;
  background: url(${logo}) no-repeat;
  background-size: cover;
  border: none;
`;

const Title = styled.h1`
  color: white;
  font-family: Merriweather;
  font-size: 22px;
  font-weight: bold;
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
  color: rgba(156, 163, 175, 1);
  & > a {
    color: rgba(156, 163, 175, 1);
  }
  .selected {
    padding-top: 28px;
    border-top: 3px solid #facc15;
    color: white;
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
