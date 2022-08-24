import React from "react";
import { Link, useParams } from "react-router-dom";
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
  const [state, setState] = useState({error:''})

  var currentPage = useParams().page;
  if(typeof currentPage === 'undefined') currentPage = 1;
  //const currentPage = useSelector((state) => state.postsDisplay.currentPage);

  const { perPage, totalPosts } = useSelector(
    (state) => state.postsDisplay.displaySetting
  );

  const handlePageChange = (page) => {
    console.log('page:',page);
    dispatch(postActions.updateCurrentPage(page));
  };

  const handleGotoFirstPage = () => {
    dispatch(postActions.updateCurrentPage(1));
  };

  const handleGotoLastPage = () => {
    dispatch(postActions.updateCurrentPage(Math.floor(totalPosts / perPage)));
  };

  var intervalId = null;
  const getAllPost = async (currentPage, source) => {
    console.log('source: ', source);
    const response = await post.getAllPosts(domain, currentPage);
    window.scrollTo(0, 0);
    if (!response.ok) {
        console.log(response.data);
        setState({...state, error:"Oops!.. Network error occured"});
        intervalId = setInterval(() => {
          getAllPost(currentPage, 'retry');
        }, 60000)
        return console.log('');
    }
    console.log('error cleared', state.error);
    setState({...state, error:""});
    console.log('interval ID: ', intervalId);
    clearInterval(intervalId);

    dispatch(postActions.setDisplaySetting(response.data.meta));
    dispatch(postActions.updatePosts(response.data.data));
  };

  useEffect(() => {
    getAllPost(currentPage, 'use effect');
  }, [currentPage]);

  const displayError = () => {
      if(state.error != '') {
          return (<p className="alert alert-danger">{state.error}</p>);
      }
  }

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
                    currentPage={parseInt(currentPage)}
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
                      {displayError()}
                      {renderContent()}
                    
                    

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
