import React from "react";
import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";
import { slide as Menu } from "react-burger-menu";
import API from "../services/api";
import { media } from "../styles/mediaQueries";

import logo from "../images/logo.svg";
import burgerNav from "../images/burgerNav.svg";

class Header extends React.Component {
  onLogout = async () => {
    const response = await API.post({
      path: "/user/logout",
    });
    if (response.ok) this.props.setUser(null);
  };

  showSettings(event) {
    event.preventDefault();
  }
  render() {
    const { user } = this.props;

    const burgerNavStyles = {
      bmBurgerButton: {
        width: "16px",
        height: "12px",
        border: "none",
      },
      bmCrossButton: {
        top: "30px",
        right: "15px",
        position: "fixed",
        height: "27px",
        width: "27px",
      },
      bmCross: {
        background: "white",
      },
      bmMenuWrap: {
        top: "0",
        position: "fixed",
        height: "100%",
        width: "100vw",
      },
      bmMenu: {
        background: "#111827",
        padding: "23px 0",
        fontSize: "1.15em",
      },
      bmItemList: {
        color: "white",
        // padding: "0.8em",
      },
      bmItem: {
        margin: "0 0 30px 0",
        display: "block",
      },
      bmOverlay: {
        top: "0",
        left: "0",
        background: "rgba(0, 0, 0, 0.7)",
      },
    };

    return (
      <>
        <HeaderStyled>
          <HeaderContainer>
            <LeftContainer>
              <Link to='/home'>
                <HeaderLogo />
              </Link>
              <Link to='/home'>
                <Title>Le Quizz du Berger</Title>
              </Link>
            </LeftContainer>
            <HeaderMenu>
              <HeaderMenuTab>
                <NavLink activeClassName='selected' to='/home'>
                  <span>Accueil</span>
                </NavLink>
              </HeaderMenuTab>
              <HeaderMenuTab>
                <NavLink activeClassName='selected' to='/result'>
                  <span>Résultats</span>
                </NavLink>
              </HeaderMenuTab>
              {!!user?.pseudo ? (
                <HeaderMenuTab onClick={this.onLogout}>
                  <span>Se déconnecter</span>
                </HeaderMenuTab>
              ) : (
                <HeaderMenuTab>
                  <NavLink activeClassName='selected' to='/login'>
                    <span>Se connecter</span>
                  </NavLink>
                </HeaderMenuTab>
              )}
              <NavLink activeClassName='selected' to='/theme'>
                <QuizzButton>
                  <span>Quizz</span>
                </QuizzButton>
              </NavLink>
              {/* <BurgerMenu /> */}
              <BurgerNavContainer>
                <Menu
                  right
                  styles={burgerNavStyles}
                  customBurgerIcon={
                    <img src={burgerNav} alt='mobile navigation menu' />
                  }
                >
                  <BurgerNavHeaderContainer>
                    <HeaderLogo />
                    <BurgerNavTitle>Le Quizz du Berger</BurgerNavTitle>
                  </BurgerNavHeaderContainer>
                  <Fillet />
                  <BurgerMenuTab>
                    <NavLink activeClassName='selected' to='/home'>
                      <span>Accueil</span>
                    </NavLink>
                  </BurgerMenuTab>
                  <Fillet />
                  <BurgerMenuTab>
                    <NavLink activeClassName='selected' to='/result'>
                      <span>Résultats</span>
                    </NavLink>
                  </BurgerMenuTab>
                  <Fillet />
                  {!!user?.pseudo ? (
                    <BurgerMenuTab onClick={this.onLogout}>
                      <span>Se déconnecter</span>
                    </BurgerMenuTab>
                  ) : (
                    <BurgerMenuTab>
                      <NavLink activeClassName='selected' to='/login'>
                        <span>Se connecter</span>
                      </NavLink>
                    </BurgerMenuTab>
                  )}
                </Menu>
              </BurgerNavContainer>
            </HeaderMenu>
          </HeaderContainer>
        </HeaderStyled>
        <BackContainer />
      </>
    );
  }
}

const HeaderStyled = styled.nav`
  position: fixed;
  z-index: 99;
  width: 100vw;
  padding: 0 40px;
  height: 80px;
  background-color: #111827;
  ${media.mobile`
  max-height: 80px;
  min-height: 50px;
  height: 11vh;
  padding: 0 20px;
`}
`;

const HeaderContainer = styled.div`
  margin: 0 auto;
  height: 100%;
  width: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LeftContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HeaderLogo = styled.div`
  margin-right: 10px;
  height: 32px;
  width: 32px;
  background: url(${logo}) no-repeat;
  background-size: cover;
  border: none;
`;

const Title = styled.h1`
  color: white;
  font-family: Merriweather;
  font-size: 20px;
  font-weight: bold;
  ${media.mobile`
  display: none;
`}
`;

const HeaderMenu = styled.ul`
  height: 100%;
  padding: 0;
  display: grid;
  align-items: center;
  grid-template-columns: auto auto auto auto;
  grid-gap: 40px;
  color: white;
  list-style-type: none;
  font-size: 14px;
  font-weight: 500;
  ${media.mobile`
  display: block;
  height: auto;
`}
`;

const HeaderMenuTab = styled.li`
  cursor: pointer;
  color: rgba(156, 163, 175, 1);
  & > a {
    height: 80px;
    display: flex;
    align-items: center;
    color: rgba(156, 163, 175, 1);
  }
  .selected {
    border-top: 3px solid #facc15;
    color: white;
  }
  ${media.mobile`
  display: none;
  `}
`;

const QuizzButton = styled.button`
  height: 40px;
  width: 80px;
  background-color: #facc15;
  height: 40px;
  border: none;
  border-radius: 44px;
  cursor: pointer;
  ${media.mobile`
  display: none;
  `}
`;

const BurgerNavContainer = styled.div`
  display: none;
  ${media.mobile`
  display: block;
  `}
`;

const Fillet = styled.div`
  height: 1px;
  background-color: grey;
  width: 100%;
`;

const BurgerNavHeaderContainer = styled.div`
  padding: 0 20px;
  display: flex !important;
  flex-direction: row;
  align-items: center;
`;

const BurgerNavTitle = styled.h1`
  color: white;
  font-family: Merriweather;
  font-size: 20px;
  font-weight: bold;
`;

const BurgerMenuTab = styled.div`
  margin: 30px 30px !important;
`;

const BackContainer = styled.div`
  height: 80px;
  ${media.mobile`
  max-height: 80px;
  min-height: 50px;
  height: 11vh;
`}
`;

export default Header;
