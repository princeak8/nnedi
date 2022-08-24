import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";

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
//   const [state, setState] = useState({
//     id: '', title: '', content:'', tags:{}, comments:[], comments_count:0, reader:{}, 
//     coverImage:{}, created_at:'', views_count:0, loading: false, errorMsg: '', loaded: false, loadedSuccessfully: false
// });
  const commentsCount = () => {
      let commentCount = postItem.comments.length;
      if(commentCount > 0) {
        //postItem.comments.map(())
          return postItem.comments.reduce((curr, comment) => curr + comment.replies.length, commentCount);
      }
      return 0
  }
  //console.log("postItem", commentsCount());

//   const getPost = async () => {
//     setState({...state, loading: true});
//     let post = await request('GET', '/post/show/'+post_id);
//     setState({...state, loading: false, loaded: true});
//     if(post.status == 200) {
//         const {
//             comments, comments_count, reader, content, coverImage, created_at, tags, id, title, views_count,
//         } = post.data;
//         setState({...state, id, title, content, tags, comments, comments_count, reader, coverImage, created_at, views_count, loadedSuccessfully: true});
//     }else{
//         console.log('error: ', post.message);
//         setState({...state, errorMsg: post.message});
//     }
// } 

    return (
      <div>
        {/* <Link to="/RelatedPost"><h3>{postItem.title}</h3></Link> */}
          <div className="some-title" onClick={() => navigate(`posts/${postItem.title}`, { state: postItem.id })} style={{cursor:"pointer"}}>
              <h3>{postItem.title}</h3>
          </div>
          <div className="john">
            <p>
                {/* <Link to="#">John Doe</Link> */}
                <span>{postItem.created_at}</span>
            </p>
          </div>
          <div className="clearfix"> </div>
          <div>
              <div className="tilte-grid">
                  <div onClick={() => navigate(`posts/${postItem.id}`, { state: postItem.id })} style={{cursor:"pointer"}}>
                    {/* <img src="images/1.jpg" alt=" " /> */}
                    <Image src={postItem.coverImage.url} alt="photo of a post" />

                  </div>
                  <p className="vel">
                    {postItem.preview}
                  </p>
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
