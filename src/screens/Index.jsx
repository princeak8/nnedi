import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import BlogTitle from "../components/BlogTitle";
import ImageSlider from "../components/ImageSlider";
import styled from "styled-components";
import BlogPost from "../components/BlogPost";
import AuthorInfo from "../components/AuthorInfo";
import FollowSocials from "../components/FollowSocials";
import RecentPosts from "../components/RecentPosts";
import Search from "../components/Search";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
// import FullBlogPost from "./components/FullPost";
import { useEffect } from "react";
import post from "../api/post";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postActions } from "../store/postsSlice";
import Pagination from "../components/Pagination";
import RecentPost from "../components/RecentPost";

const BlogPostSection = styled.div`
  display: flex;
`;

const Blog = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const About = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: space-between;
  // background-color: red;
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  width: 70%;
  height: 50px;
  margin-top: 60px;
  // background-color: red;
`;

const domain = process.env.REACT_APP_DOMAIN;

function Index(props) {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.postsDisplay.allPosts);

  const currentPage = useSelector((state) => state.postsDisplay.currentPage);

  const { perPage, totalPosts } = useSelector(
    (state) => state.postsDisplay.displaySetting
  );

  const handlePageChange = (page) => {
    dispatch(postActions.updateCurrentPage(page));
  };

  const handleGotoFirstPage = () => {
    dispatch(postActions.updateCurrentPage(1));
  };

  const handleGotoLastPage = () => {
    dispatch(postActions.updateCurrentPage(Math.floor(totalPosts / perPage)));
  };

  const getAllPost = async (currentPage) => {
    const response = await post.getAllPosts(domain, currentPage);
    if (!response.ok) return console.log(response.data);

    dispatch(postActions.setDisplaySetting(response.data.meta));
    dispatch(postActions.updatePosts(response.data.data));
  };

  useEffect(() => {
    getAllPost(currentPage);
  }, [currentPage]);

  const renderContent = () => {
      if(posts) {
          return (
            <Blog>
                {posts &&
                  posts.map((post) => <BlogPost key={post.id} postItem={post} />)}
                  {renderPagination()}
          </Blog>
          );
      }else{
          return (<p>Fetching Posts ...</p>);
      } 
  }

  const renderPagination = () => {
      if(totalPosts > perPage) {
          return (
                <Pagination
                    itemsCount={totalPosts}
                    pageSize={perPage}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                    onGotoFirstPage={handleGotoFirstPage}
                    onGotoLastPage={handleGotoLastPage}
                />
          );
      }
  }

  //console.log('posts: ', posts);
  //console.log(settings.blog_name);

  return (
    <div>
      <Header />
      {/* <BlogTitle /> */}

     {/* content  */}
      <div className="content">
          <div className="container">
              <div className="content-text">	
                  <div className="title">
                      
                      {renderContent()}
                    
                    <div className="border1">
                      <div className="pre">
                        <Link to="#">Prev</Link>
                      </div>
                      <div className="number">
                        <ul>
                          <li><Link to="#">1</Link></li>
                          <li><Link to="#">2</Link></li>
                          <li><Link to="#">3</Link></li>
                          <li><Link to="#">4</Link></li>
                          <li><Link to="#">5</Link></li>
                          <li><Link to="#">6</Link></li>
                          <li><Link to="#">7</Link></li>
                          <li><Link to="#">8</Link></li>
                          <li><Link to="#">9</Link></li>
                          <li><Link to="#">10</Link></li>
                          <li><Link to="#">11</Link></li>
                          <li><Link to="#">12</Link></li>
                        </ul>
                      </div>
                      <div className="next">
                        <Link to="#">Next</Link>
                      </div>
                      <div className="clearfix"> </div>
                    </div>

                </div>

                {/* <div className="categories">
                  <div className="categ">
                    <div className="cat">
                      <h3>Categories</h3>
                      <ul>
                        <li><Link to="single.html">Lorem ipsum dolor sit amet</Link></li>
                        <li><Link to="single.html">Consectetur adipiscing elit</Link></li>
                        <li><Link to="single.html">Etiam aliquet convallis enim ut</Link></li>
                        <li><Link to="single.html">Donec at pretium dui</Link></li>
                        <li><Link to="single.html">Nulla sed massa sagittis venenatis</Link></li>
                        <li><Link to="single.html">Praesent nec tortor nec massa</Link></li>
                      </ul>
                    </div>
                    <div className="recent-com">
                      <h3>Recent Comments</h3>
                      <ul>
                          <li><Link to="single.html">Donec consequat</Link> suscipit leo at accumsan. In hac habitasse platea dictumst.</li>
                          <li><Link to="single.html">Aliquam erat ipsum,</Link> consequat id venenatis suscipit, venenatis sed leo.
                            Ut nec lacus in sem eleifend semper id ac dolor.</li>
                          <li><Link to="single.html">Etiam aliquet convallis enim ut 
                              <span>Donec at pretium dui</span></Link></li>
                          <li><Link to="single.html">Nulla sed massa sagittis</Link> venenatis Praesent nec tortor nec massa </li>
                          <li><Link to="single.html">Donec faucibus mollis dolor
                            <span>in ullamcorper.</span></Link>
                          </li>
                      </ul>
                    </div>
                    <div className="view">
                      <Link to="/posts/:id">View More</Link>
                    </div>
                  </div>
                </div> */}
                <RecentPosts />

                <div className="clearfix"> </div>
              </div>
          </div>
      </div>
      <div className="clearfix"> </div>


      <Footer />

      {/* ................. */}
      
      {/* ................... */}
{/* content  */}
      {/* <BlogPostSection>
        {renderContent()}
        <About>
          <RecentPosts />
        </About>
      </BlogPostSection>
       */}
    </div>
  );
}

export default Index;
