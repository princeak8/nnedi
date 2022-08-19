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
    // <div className="categories">
    //     <div className="categ">
    //         <div className="cat">
    //           <h3>Categories</h3>
    //           <ul>
    //             <li><Link to="single.html">Praesent nec tortor nec massa</Link></li>
    //           </ul>
    //         </div>
    //         <div className="recent-com">
    //           <h3>Recent Comments</h3>
    //               {/* <Info>
    //                   <b style={{textDecorationLine: "underline", cursor: "pointer"}} onClick={() => navigate(`posts/${postItem.id}`, { state: postItem.id })}>
    //                       {postItem.title}
    //                   </b>
    //                   <span> - {postItem.created_at}</span>
    //               </Info> */}
    //           <ul>
    //               <li><Link to="single.html">Donec consequat</Link> suscipit leo at accumsan. In hac habitasse platea dictumst.</li>
                  
    //           </ul>
    //         </div>
    //         <div className="view">
    //           <Link to="/posts/:id">View More</Link>
    //         </div>
    //     </div>
    // </div>
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

export default RecentPost;
