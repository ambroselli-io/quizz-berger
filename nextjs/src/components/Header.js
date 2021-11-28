import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import Link from "next/link";
import { slide as Menu } from "react-burger-menu";
import { media } from "../styles/mediaQueries";

import ModalContact from "./ModalContact";
import ModalLegal from "./ModalLegal";
import QuizzButton from "./QuizzButton";
import NavLink from "./NavLink";
import useUser from "../hooks/useUser";
import Logo from "./Logo";
import API from "../services/api";
import { useSWRConfig } from "swr";

const Header = () => {
  const { mutate } = useSWRConfig();
  const { user } = useUser({ from: "Header" });
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showLegalModal, setShowLegalModal] = useState(false);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const router = useRouter();

  const onLogout = async () => {
    await API.post({ path: "/user/logout" });
    mutate(API.getUrl("/user/me"), null);
    mutate(API.getUrl("/answer/friends"), null);
    mutate(API.getUrl("/answer"), null);
    router.push("/");
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
  }, [router?.pathname]);

  useEffect(() => {
    setUserIsLoggedIn(Boolean(user.isLoggedIn));
  }, [user]);

  return (
    <>
      <HeaderStyled>
        <HeaderContainer>
          <LeftContainer>
            <Link href="/" passHref>
              <a>
                <Logo height={32} width={32} />
              </a>
            </Link>
            <Link href="/" passHref>
              <Title>Le Quizz du Berger</Title>
            </Link>
          </LeftContainer>
          <HeaderMenu>
            <NavLink exact href="/">
              <HeaderMenuTab>
                <span>Accueil</span>
              </HeaderMenuTab>
            </NavLink>
            <NavLink href="/all-questions">
              <HeaderMenuTab>
                <span>Voir toutes les questions</span>
              </HeaderMenuTab>
            </NavLink>
            <NavLink href="/themes">
              <HeaderMenuTab>
                <QuizzButton>Quizz</QuizzButton>
              </HeaderMenuTab>
            </NavLink>
            {!!userIsLoggedIn && (
              <NavLink href="/result">
                <HeaderMenuTab>
                  <span>Résultats</span>
                </HeaderMenuTab>
              </NavLink>
            )}
            <HeaderMenuTab>
              <span onClick={onOpenContactModal}>Nous contacter</span>
            </HeaderMenuTab>
            {!!userIsLoggedIn ? (
              <HeaderMenuTab onClick={onLogout}>
                <span>{user?.pseudo ? "Se déconnecter" : "Recommencer"}</span>
              </HeaderMenuTab>
            ) : (
              <NavLink href="/login">
                <HeaderMenuTab>
                  <span>Se connecter</span>
                </HeaderMenuTab>
              </NavLink>
            )}
            {/* BurgerMenu */}
            <BurgerNavContainer>
              <Menu
                right
                isOpen={menuIsOpen}
                onOpen={() => setMenuIsOpen(true)}
                onClose={() => setMenuIsOpen(false)}
                styles={burgerNavStyles}
                customBurgerIcon={<img src="/burgerNav.svg" alt="mobile navigation menu" width={30} height={30} />}
              >
                <BurgerNavHeaderContainer>
                  <Logo height={32} width={32} />
                  <BurgerNavTitle>Le Quizz du Berger</BurgerNavTitle>
                </BurgerNavHeaderContainer>
                <Fillet />
                <BurgerMenuTab>
                  <NavLink href="/home">
                    <span>Accueil</span>
                  </NavLink>
                </BurgerMenuTab>
                <Fillet />
                <BurgerMenuTab>
                  <NavLink href="/all-questions">
                    <span>Voir toutes les questions</span>
                  </NavLink>
                </BurgerMenuTab>
                <Fillet />
                <BurgerMenuTab>
                  <NavLink href="/themes">
                    <a>
                      <QuizzButton>Quizz</QuizzButton>
                    </a>
                  </NavLink>
                </BurgerMenuTab>
                {!!userIsLoggedIn && (
                  <>
                    <Fillet />
                    <BurgerMenuTab>
                      <NavLink href="/result">
                        <span>Résultats</span>
                      </NavLink>
                    </BurgerMenuTab>
                  </>
                )}
                <Fillet />
                {!!userIsLoggedIn ? (
                  <BurgerMenuTab onClick={onLogout}>
                    <span>{user?.pseudo ? "Se déconnecter" : "Recommencer"}</span>
                  </BurgerMenuTab>
                ) : (
                  <BurgerMenuTab>
                    <NavLink href="/login">
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
        key={userIsLoggedIn}
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

const Title = styled.h1`
  color: white;
  font-family: Merriweather;
  font-size: 20px;
  font-weight: bold;
  margin-left: 10px;
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
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  > span {
    text-align: center;
    width: 100%;
  }
  &.selected {
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
  margin-left: 10px;
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
