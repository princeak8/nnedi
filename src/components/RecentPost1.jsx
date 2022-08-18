import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import photo from "../assets/photo.jpg";

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const Image = styled.img`
  height: 80px;
  width: 80px;
`;

const Info = styled.div`
  justify-content: center;
  display: flex;
  flex-direction: column;
  margin-left: 30px;
  gap: 10px;
`;

function RecentPost1({ postItem }) {
    const navigate = useNavigate();
  // console.log(
  //   "🚀 ~ file: RecentPost.jsx ~ line 24 ~ RecentPost ~ postItem",
  //   postItem
  // );

  return (

    <Container>
      <Image src={postItem.coverImage.url} alt="photo of a post" />
      <Info>
        <b style={{textDecorationLine: "underline", cursor: "pointer"}} onClick={() => navigate(`posts/${postItem.id}`, { state: postItem.id })}>
            {postItem.title}
        </b>
        <span> - {postItem.created_at}</span>
      </Info>
    </Container>
  );
}

export default RecentPost1;
