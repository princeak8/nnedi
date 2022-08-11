import React from "react";
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
    <>
      <Header />
      <BlogTitle />
      <BlogPostSection>
        {renderContent()}
        <About>
          <RecentPosts />
        </About>
      </BlogPostSection>
      <Footer />
    </>
  );
}

export default Index;
