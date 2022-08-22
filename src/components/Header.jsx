import React, {useEffect} from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Search from "./Search";
import { UserStore } from '../store/UserStore';
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import $ from 'jquery';

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

    useEffect(() => {
      // This will run when the page first loads and whenever the title changes
        $( "span.menu" ).click(function() {
            $( "ul.nav1" ).slideToggle( 300, function() {
            // Animation complete.
            });
        });
    }, []);
    
    const settings = useSelector((state) => state.settings);

    const navigate = useNavigate();

    const styles = {
      containerStyle: {float:'right', marginRight: '5%', marginTop: '1em'}
    };

    const { containerStyle } = styles;
    
    const userInfo = () => {
        //console.log('user', user);
        if(user != null) {
            return(
                <div style={containerStyle}>
                    <span>{user.name}</span> |  
                    <span style={{color: 'blue', cursor: 'pointer'}} onClick={() => logout()}> Logout</span>
                </div>
            );
        }else{
            if(!page) {
                return(
                  <div style={containerStyle}>
                      <span style={{color: 'blue', cursor: 'pointer'}} onClick={() => navigate('/login')}> Login </span> | 
                      <span style={{color: 'blue', cursor: 'pointer'}} onClick={() => navigate('/register')}> Sign Up </span>
                  </div>
                );
            }else{
                if(page=='login') {
                  return(
                    <div style={containerStyle}>
                        <span style={{color: 'blue', cursor: 'pointer'}} onClick={() => navigate('/register')}> Sign Up </span>
                    </div>
                  );
                }
                if(page=='register') {
                  return(
                    <div style={containerStyle}>
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
    <div className="header">
      <div className="container">
          <div className="header-info">
              <div className="logo">
                  <NavLink to="/">
                      <h1>{settings.blog_name}</h1>
                      {/* <img src="images/logo.png" alt=" " /> */}
                  </NavLink>
              </div>
              <div className="logo-right">
                  <span className="menu"><img src="images/menu.png" alt=" "/></span>
                  <ul className="nav1">
                      <li className="cap"><NavLink to="/">Home</NavLink></li>
                      <li><NavLink to="/about">About</NavLink></li>
                  </ul>
              </div>
              <div className="clearfix"> </div>
              {userInfo()}
          </div>
      </div>
    </div>
  );
}

export default Header;
