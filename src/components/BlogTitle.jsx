import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useRef, useState } from "react";
import { UserStore } from '../store/UserStore';
import { useNavigate } from "react-router-dom";

const BlogHeader = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
  align-items: center;
  height: 150px;
  line-height: 20px;
  padding: 10px;
`;

function BlogTitle(props) {
  const settings = useSelector((state) => state.settings);
  
  //localStorage.setItem("user", 'Aka');
  
  return (
    <>
      <h1 style={{display:'flex', justifyContent: 'center'}}>{settings.blog_name}</h1>
    
    </>
  );
}

export default BlogTitle;
