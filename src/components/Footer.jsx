import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import * as GrIcons from "react-icons/gr";

// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   height: 150px;
//   width: 100%;
//   background-color: #f2f2f2;
//   gap: 30px;
// `;

// const IconsContainer = styled.div`
//   display: flex;
//   gap: 30px;
// `;

function Footer(props) {
    const latestPosts = useSelector((state) => state.postsDisplay.latestPosts);

    return (
      // <Container>
      //   <IconsContainer>
      //     <GrIcons.GrFacebookOption size={25} />
      //     <GrIcons.GrTwitter size={25} />
      //     <GrIcons.GrYoutube size={25} />
      //     <GrIcons.GrInstagram size={25} />
      //   </IconsContainer>
      //    All rights reserved
      // </Container>
      <div>
          <div className="footer">
              <div className="container">
                <div className="footer-grids">



                  <div className="footer-grid">
                    <h3>Site Page</h3>
                    <ul>
                      <li className="cap1"><Link to="/">Home</Link></li>
                      <li><Link to="/about">About</Link></li>
                    </ul>
                  </div>
                  <div className="footer-grid">
                    <h3>Recent Posts</h3>
                    <ul>
                      { (latestPosts.length > 0) &&  latestPosts.map((post) => <li><Link to={`/posts/${post.title}`}>{post.title}</Link></li> ) }
                          
                    </ul>
                  </div>
                  <div className="clearfix"> </div>
                </div>
              </div>
          </div>
          <div className="footer-bottom">
              <div className="container">
                  <p>Website developed<a href="https://zizix6.com/" target="_blank"> Zizix6</a></p>
              </div>
          </div>

      </div>
        
      
    );
}

export default Footer;
