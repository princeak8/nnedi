import React from "react";
import { Link, useNavigate } from "react-router-dom";
import RelatedPost from "../components/RelatedPost";
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
      <div>
        {/* <Link to="/RelatedPost"><h3>{postItem.title}</h3></Link> */}
          <div className="some-title" onClick={() => navigate(`posts/${postItem.id}`, { state: postItem.id })} style={{cursor:"pointer"}}>
              <h3>{postItem.title}</h3>
          </div>
          <div className="john">
            <p>
                {/* <Link to="#">John Doe</Link> */}
                <span>May.26.2012</span>
            </p>
          </div>
          <div className="clearfix"> </div>
          <div>
              <div className="tilte-grid">
                  <div onClick={() => navigate(`posts/${postItem.id}`, { state: postItem.id })} style={{cursor:"pointer"}}>
                    <img src="images/1.jpg" alt=" " />
                  </div>
                  <p className="vel"><Link to="single.html">Phasellus vel arcu vitae neque sagittis aliquet ac at purus.
                  Vestibulum varius eros in dui sagittis non ultrices orci hendrerit.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </Link></p>
                  <p className="Sed">
                  <span><label>Sed euismod feugiat sodales.</label> Vivamus dui ipsum, laoreet 
                  enim sit amet volutpat sodales, lorem velit fringilla metus, et
                  semper metus sapien non odio. Nulla facilisi.<Link to="#" className="gravida">Praesent gravida suscipit leo,</Link> 
                  eget fermentum magna malesuada ac. Maecenas pulvinar malesuada elementum.</span></p> 
              </div>
              <div className="read">
                  <div className="readInner" onClick={() => navigate(`posts/${postItem.id}`, { state: postItem.id })} style={{cursor:"pointer"}}>
                        Read More
                  </div>
              </div>
          </div>
          <div className="border">
					    <p>a</p>
				  </div>

         
      </div>
   );
}

export default BlogPost;
