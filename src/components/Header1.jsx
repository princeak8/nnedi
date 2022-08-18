import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Search from "./Search";
import { UserStore } from '../store/UserStore';
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-around;
  height: 70px;
  width: 100%;
  align-items: center;
  border-bottom: 1px whitesmoke solid;
`;

const HeaderLinks = styled.div`
  display: flex;
  flex: 3;
  justify-content: space-around;
  margin-left: 30px;
`;

const HeaderSearchBar = styled.div`
  flex: 1;
  justify-content: space-between;
  margin-right: 10px;
`;

function Header(props) {
    const [state, setState] = useState({reset:true});
    const { page } = props;
    const {user, token_expires} = UserStore();

    const navigate = useNavigate();
    
    const userInfo = () => {
        //console.log('user', user);
        if(user != null) {
            return(
                <div style={{float:'right', marginRight: '5%'}}>
                    <span>{user.name}</span> |  
                    <span style={{color: 'blue', cursor: 'pointer'}} onClick={() => logout()}> Logout</span>
                </div>
            );
        }else{
            if(!page) {
                return(
                  <div style={{float:'right', marginRight: '5%'}}>
                      <span style={{color: 'blue', cursor: 'pointer'}} onClick={() => navigate('/login')}> Login </span> | 
                      <span style={{color: 'blue', cursor: 'pointer'}} onClick={() => navigate('/register')}> Sign Up </span>
                  </div>
                );
            }else{
                if(page=='login') {
                  return(
                    <div style={{float:'right', marginRight: '5%'}}>
                        <span style={{color: 'blue', cursor: 'pointer'}} onClick={() => navigate('/register')}> Sign Up </span>
                    </div>
                  );
                }
                if(page=='register') {
                  return(
                    <div style={{float:'right', marginRight: '5%'}}>
                        <span style={{color: 'blue', cursor: 'pointer'}} onClick={() => navigate('/login')}> Login </span>
                    </div>
                  );
                }
            }
        }
    }

    const logout = () => {
        localStorage.setItem("user", null);
        localStorage.setItem("token", null);
        setState({...state, reset: !state.reset});
        navigate('/login');
    }
  return (
    <HeaderContainer>
      <HeaderLinks>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
      </HeaderLinks>
      {userInfo()}
    </HeaderContainer>
  );
}

export default Header;
