import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router";
import { Link, NavLink } from "react-router-dom";
import { slide as Menu } from "react-burger-menu";
import { media } from "../styles/mediaQueries";

import logo from "../images/logo.svg";
import burgerNav from "../images/burgerNav.svg";
import ModalContact from "./ModalContact";
import ModalLegal from "./ModalLegal";
import UserContext from "../contexts/user";
import QuizzButton from "./QuizzButton";

const Header = ({ loading }) => {
  const { user, logout } = useContext(UserContext);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showLegalModal, setShowLegalModal] = useState(false);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const history = useHistory();

  const onLogout = async () => {
    setMenuIsOpen(false);
    logout();
  };
  const onCloseModal = (e) => {
    if (e.target !== e.currentTarget) return;
    setShowContactModal(false);
    document.body.style.overflow = "visible";
  };

  const onForceCloseContactModal = (e) => {
    setShowContactModal(false);
    document.body.style.overflow = "visible";
  };

  const onOpenContactModal = () => {
    setShowContactModal(true);
    document.body.style.overflow = "hidden";
  };

  useEffect(() => {
    setMenuIsOpen(false);
  }, [history.location.key]);

  return (
    <>
      <HeaderStyled>
        <HeaderContainer>
          <LeftContainer>
            <Link to="/">
              <HeaderLogo />
            </Link>
            <Link to="/">
              <Title>Le Quizz du Berger</Title>
            </Link>
          </LeftContainer>
          <HeaderMenu>
            <HeaderMenuTab>
              <NavLink activeClassName="selected" to="/">
                <span>Accueil</span>
              </NavLink>
            </HeaderMenuTab>
            <HeaderMenuTab>
              <NavLink activeClassName="selected" to="/all-questions">
                <span>Voir toutes les questions</span>
              </NavLink>
            </HeaderMenuTab>
            <HeaderMenuTab>
              <NavLink activeClassName="selected" to="/themes">
                <QuizzButton>Quizz</QuizzButton>
              </NavLink>
            </HeaderMenuTab>
            {user?._id && (
              <HeaderMenuTab>
                <NavLink activeClassName="selected" to="/result">
                  <span>Résultats</span>
                </NavLink>
              </HeaderMenuTab>
            )}
            <HeaderMenuTab>
              <span onClick={onOpenContactModal}>Nous contacter</span>
            </HeaderMenuTab>
            {!!user?._id ? (
              <HeaderMenuTab onClick={onLogout}>
                <span>{user?.pseudo ? "Se déconnecter" : "Recommencer"}</span>
              </HeaderMenuTab>
            ) : (
              <HeaderMenuTab>
                <NavLink activeClassName="selected" to="/login">
                  <span>Se connecter</span>
                </NavLink>
              </HeaderMenuTab>
            )}
            {/* BurgerMenu */}
            <BurgerNavContainer>
              <Menu
                right
                isOpen={menuIsOpen}
                onOpen={() => setMenuIsOpen(true)}
                onClose={() => setMenuIsOpen(false)}
                styles={burgerNavStyles}
                customBurgerIcon={<img src={burgerNav} alt="mobile navigation menu" />}>
                <BurgerNavHeaderContainer>
                  <HeaderLogo />
                  <BurgerNavTitle>Le Quizz du Berger</BurgerNavTitle>
                </BurgerNavHeaderContainer>
                <Fillet />
                <BurgerMenuTab>
                  <NavLink activeClassName="selected" to="/">
                    <span>Accueil</span>
                  </NavLink>
                </BurgerMenuTab>
                <Fillet />
                <BurgerMenuTab>
                  <NavLink activeClassName="selected" to="/all-questions">
                    <span>Voir toutes les questions</span>
                  </NavLink>
                </BurgerMenuTab>
                <Fillet />
                <BurgerMenuTab>
                  <NavLink activeClassName="selected" to="/themes">
                    <QuizzButton>Quizz</QuizzButton>
                  </NavLink>
                </BurgerMenuTab>
                {user?._id && (
                  <>
                    <Fillet />
                    <BurgerMenuTab>
                      <NavLink activeClassName="selected" to="/result">
                        <span>Résultats</span>
                      </NavLink>
                    </BurgerMenuTab>
                  </>
                )}
                <Fillet />
                {!!user?._id ? (
                  <BurgerMenuTab onClick={onLogout}>
                    <span>{user?.pseudo ? "Se déconnecter" : "Recommencer"}</span>
                  </BurgerMenuTab>
                ) : (
                  <BurgerMenuTab>
                    <NavLink activeClassName="selected" to="/login">
                      <span>Se connecter</span>
                    </NavLink>
                  </BurgerMenuTab>
                )}
                <Fillet />
                <BurgerMenuTab>
                  <span onClick={onOpenContactModal}>Nous contacter</span>
                </BurgerMenuTab>
                <Fillet />
                <BurgerMenuTab>
                  <span onClick={() => setShowLegalModal(true)}>Mentions légales</span>
                </BurgerMenuTab>
              </Menu>
            </BurgerNavContainer>
          </HeaderMenu>
        </HeaderContainer>
      </HeaderStyled>
      <BackContainer />
      <ModalLegal isActive={showLegalModal} onClose={() => setShowLegalModal(false)} />
      <ModalContact
        isActive={showContactModal}
        onCloseModal={onCloseModal}
        onForceCloseModal={onForceCloseContactModal}
        key={user?._id}
      />
    </>
  );
};

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

const HeaderStyled = styled.nav`
  position: fixed;
  z-index: 99;
  width: 100vw;
  padding: 0 40px;
  height: 80px;
  background-color: #111827;
  ${media.mobile`
  height: 60px;
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
  display: flex;
  align-items: center;
  grid-gap: 40px;
  color: white;
  list-style-type: none;
  font-size: 14px;
  font-weight: 500;
  ${media.mobile`
    display: block;
    height: auto;
  `}
  ${media.mobile`
  li {
    display: none;
  }
  `}
`;

const HeaderMenuTab = styled.li`
  cursor: pointer;
  color: rgba(156, 163, 175, 1);
  > span {
    text-align: center;
    width: 100%;
  }
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
`;

const BurgerNavContainer = styled.div`
  display: none;
  ${media.mobile`
  display: block;
  `}
`;

const Fillet = styled.div`
  margin: 0 !important;
  height: 1px;
  background-color: #111827;
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
  margin: 15px 30px !important;
  cursor: pointer;
`;

const BackContainer = styled.div`
  height: 80px;
  ${media.mobile`
  height: 60px;
`}
`;

export default Header;
