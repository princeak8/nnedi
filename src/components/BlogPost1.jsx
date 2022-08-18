import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import photo from "../assets/photo.jpg";

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 60%;
`;

const PostTitle = styled.div`
  display: flex;
  flex-direction: column;
  height: 150px;
`;

const Image = styled.img`
  height: 400px;
  width: 100%;
`;

const PostText = styled.div`
  margin-top: 20px;
  text-align: justify;
`;

const ReadMore = styled.div`
  font-weight: 400;
  margin: 20px;
  cursor: pointer;
`;

function BlogPost({ postItem }) {
  const navigate = useNavigate();
  const commentsCount = () => {
      let commentCount = postItem.comments.length;
      if(commentCount > 0) {
        //postItem.comments.map(())
          return postItem.comments.reduce((curr, comment) => curr + comment.replies.length, commentCount);
      }
      return 0
  }
  //console.log("postItem", commentsCount());
  return (
    <PostContainer>
      <PostTitle>
        <h2>{postItem.title}</h2>
        <span>{`Posted ${postItem.created_at} by Aigars`}</span>
      </PostTitle>

      <Image src={postItem.coverImage.url} alt="photo of a post" />

      <PostText>{postItem.preview}...</PostText>

      <ReadMore
        onClick={() => navigate(`posts/${postItem.id}`, { state: postItem.id })}
      >
        | <b style={{textDecorationLine: "underline", cursor: "pointer"}}>Read more</b> | Comments({commentsCount()})
      </ReadMore>

      <hr />
    </PostContainer>
  );
}

export default BlogPost;
