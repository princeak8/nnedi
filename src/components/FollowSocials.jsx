import React from "react";
import styled from "styled-components";
import * as GrIcons from "react-icons/gr";

const SocialsContainer = styled.div`
  justify-content: space-around;
  //   text-align: center;
  width: 60%;
`;

const Title = styled.div`
  color: grey;
  height: 20px;
  margin-bottom: 40px;
  text-align: left;
`;

const Icons = styled.div`
  display: flex;
  justify-content: space-around;
  color: grey;
`;

function FollowSocials(props) {
  return (
    <SocialsContainer>
      <Title>
        <h2>Follow Me</h2>
      </Title>
      <Icons>
        <GrIcons.GrFacebookOption size={25} />
        <GrIcons.GrTwitter size={25} />
        <GrIcons.GrYoutube size={25} />
        <GrIcons.GrInstagram size={25} />
      </Icons>
    </SocialsContainer>
  );
}

export default FollowSocials;
