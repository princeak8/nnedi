import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import RecentPost from "./RecentPost";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: space-around;
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
    // <Container>
    //   <Title>
    //     <h2>RECENT POSTS</h2>
    //   </Title>
    //   {latestPosts &&
    //     latestPosts.map((post) => <RecentPost key={post.id} postItem={post} />)}
    // </Container>

     <div className="categories">
        <div className="categ">
            <div className="cat">
              <h3>Categories</h3>
              <ul>
                <li><Link to="single.html">Praesent nec tortor nec massa</Link></li>
              </ul>
            </div>
            <div className="recent-com">
              <h3>Recent Comments</h3>
                  {/* <Info>
                      <b style={{textDecorationLine: "underline", cursor: "pointer"}} onClick={() => navigate(`posts/${postItem.id}`, { state: postItem.id })}>
                          {postItem.title}
                      </b>
                      <span> - {postItem.created_at}</span>
                  </Info> */}

                  <Container>
                      {/* <Title>
                        <h2>RECENT POSTS</h2>
                      </Title> */}
                      {latestPosts &&
                        latestPosts.map((post) => <RecentPost key={post.id} postItem={post} />)}
                  </Container>
            </div>
            <div className="view">
              <Link to="/posts/:id">View More</Link>
            </div>
        </div>
    </div>
  );
}

export default RecentPosts;
