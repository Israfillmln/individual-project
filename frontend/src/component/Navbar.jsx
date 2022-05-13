import jsCookie from 'js-cookie';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { auth_types } from '../redux/types';
import { useRouter } from 'next/router';
import PostContent from './PostContent';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Collapse,
  Navbar as NavbarStap,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem, 
  CardText} from 'reactstrap';

const Navbar = ({ hidden }) => {
  const authSelector = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  const logoutBtnHandler = () => {
    dispatch({
      type: auth_types.LOGOUT_USER,
    });

    jsCookie.remove('user_data');
    jsCookie.remove('auth_token');
    router.push('/auth/login');
  };

  if (!authSelector.id) {
    return null;
  }
  return (
    <>
       <NavbarStap color="light" light expand="md">
          <NavbarBrand href="/">Apil's</NavbarBrand>
          <NavbarToggler />
          <Collapse isOpen={true} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/user/profile"> user: {authSelector.username}</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Options
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem >
                      <PostContent />
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem href=''>
                    <CardText onClick={logoutBtnHandler}>Sign Out</CardText>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </NavbarStap>
    </>
  );
};

export default Navbar;
