import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import RecentPost from "./RecentPost";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: space-around;
  width: 60%;
`;

const Title = styled.div`
  color: grey;
  height: 20px;
  margin-bottom: 40px;
  text-align: left;
`;

function RecentPosts(props) {
  const latestPosts = useSelector((state) => state.postsDisplay.latestPosts);
  console.log('latest posts: ', latestPosts);
  return (
    <Container>
      <Title>
        <h2>RECENT POSTS</h2>
      </Title>
      {latestPosts &&
        latestPosts.map((post) => <RecentPost key={post.id} postItem={post} />)}
    </Container>
  );
}

export default RecentPosts;
