import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import photo from "../assets/photo.jpg";

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const Image = styled.img`
  height: 40px;
  width: 40px;
`;

const Info = styled.div`
  justify-content: center;
  display: flex;
  flex-direction: column;
  margin-left: 30px;
  gap: 10px;
`;

function RecentPost({ postItem }) {
    const navigate = useNavigate();
  // console.log(
  //   "🚀 ~ file: RecentPost.jsx ~ line 24 ~ RecentPost ~ postItem",
  //   postItem
  // );

  return (
    <Container>
      <Image src={postItem.coverImage.url} alt="photo of a post" />
      <Info>
        <Link style={{textDecorationLine: "underline", cursor: "pointer"}} to={`/posts/${postItem.id}`} onClick={() => this.forceUpdate}>
            {postItem.title}
        </Link>
        <span> - {postItem.created_at}</span>
      </Info>
    </Container>
  );
}

export default RecentPost;
