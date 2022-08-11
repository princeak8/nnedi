import React from "react";
import styled from "styled-components";
import * as GrIcons from "react-icons/gr";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 150px;
  width: 100%;
  background-color: #f2f2f2;
  gap: 30px;
`;

const IconsContainer = styled.div`
  display: flex;
  gap: 30px;
`;

function Footer(props) {
  return (
    <Container>
      <IconsContainer>
        <GrIcons.GrFacebookOption size={25} />
        <GrIcons.GrTwitter size={25} />
        <GrIcons.GrYoutube size={25} />
        <GrIcons.GrInstagram size={25} />
      </IconsContainer>
      All rights reserved
    </Container>
  );
}

export default Footer;
