import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import photo from "../assets/photo.jpg";


const AboutContainer = styled.div`
  text-align: center;
  width: 60%;
`;

const AboutTitle = styled.div`
  height: 20px;
  margin-bottom: 40px;
  text-align: left;
`;

const AboutText = styled.div`
  text-align: justify;
  margin-top: 25px
`;

function AuthorInfo(props) {

    const settings = useSelector((state) => state.settings);
    return (
      <AboutContainer>
        <AboutTitle>
          <h2>About Me</h2>
        </AboutTitle>
        <img src={photo} alt="photo of a post" height="250" width="100%" />

        <AboutText>
          {settings.about}
        </AboutText>
      </AboutContainer>
    );
}

export default AuthorInfo;
