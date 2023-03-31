import React from "react";
import { useSelector } from "react-redux";

import { isLoggedInSelector } from "../../store/authSlice";
import StyledNavLink from "../StyledNavLink";
import NavBarDropdown from "./NavBarDropdown";
import NavBarWrapper from "./NavBarWrapper";
import NavBarLinkList from "./NavBarLinkList";
import NavBarLogo from "./NavBarLogo";

const NavBar = () => {
    const isLoggedIn = useSelector(isLoggedInSelector());
    return (
        <NavBarWrapper>
            <NavBarLogo
                link='/'
                src='/assets/img/rr-logo.svg'
                label='React Router v5'
            />
            <NavBarLinkList>
                {isLoggedIn ? (
                    <>
                        <StyledNavLink to='/'>Something</StyledNavLink>
                        <StyledNavLink to='/posts' end>
                            Posts
                        </StyledNavLink>
                        <NavBarDropdown />
                    </>
                ) : (
                    <StyledNavLink to='/auth/signup' styleType='button'>
                        SignUp
                    </StyledNavLink>
                )}
            </NavBarLinkList>
        </NavBarWrapper>
    );
};

export default NavBar;
