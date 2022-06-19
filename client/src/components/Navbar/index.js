import React from "react";
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from "./NavbarElements";

const Navbar = () => {
  return (
    <>
      <Nav>
        <NavLink to="/">
          <h1>NEWWORK</h1>
        </NavLink>
        <Bars />
        <NavMenu>
          <NavLink to="/">İş ilanları</NavLink>
          <NavLink to="/Add">İlan ver</NavLink>
          <NavLink to="/about">Hakkında</NavLink>
          <NavLink to="/contact-us">İletişim</NavLink>

          {/* Second Nav */}
          {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
        </NavMenu>
        <NavBtn>
          <NavBtnLink to="/Login">Giriş </NavBtnLink>

          <NavBtnLink to="/Register">Kayıt </NavBtnLink>
        </NavBtn>
      </Nav>
      <h7>
        Sosyal ağlarımızı takip edin :{" "}
        <a href="http://localhost:3001/">Newwork</a>
      </h7>
    </>
  );
};

export default Navbar;
