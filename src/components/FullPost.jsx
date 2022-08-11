import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";
import RecentPosts from "../components/RecentPosts";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DOMPurify from 'dompurify';
import { request } from "../api";
import { postActions } from "../store/CommentsSlice";
import Comments from "./Comments";

const Container = styled.div`
  display: flex;
`;

const PostContainer = styled.div`
  display: flex;
  flex: 2;
  flex-direction: column;
  width: 75%;
  margin-right: 5%;
`;

const PostTitle = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  height: 150px;
`;

const Image = styled.img`
  height: 400px;
  text-align: center;
  width: 100%;
`;

const PostText = styled.div`
  margin-top: 20px;
  text-align: left;
  line-height: 35px;
`;

const About = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: space-between;
  // background-color: red;
  width: 20%;
`;

function FullBlogPost(props) {
    const location = useLocation();
    const navigate = useNavigate();
    const [state, setState] = useState({
        id: '', title: '', content:'', tags:{}, comments:[], comments_count:0, reader:{}, 
        coverImage:{}, created_at:'', views_count:0, loading: false, errorMsg: '', loaded: false, loadedSuccessfully: false
    });
    const post_id = location.state;
    console.log('post_id', post_id);

    useEffect(() => {
        getPost();
    }, []);

    const createMarkup = (html) => {
      return  {
        __html: DOMPurify.sanitize(html)
      }
    }

    const getPost = async () => {
        setState({...state, loading: true});
        let post = await request('GET', '/post/show/'+post_id);
        setState({...state, loading: false, loaded: true});
        if(post.status == 200) {
            const {
                comments, comments_count, reader, content, coverImage, created_at, tags, id, title, views_count,
            } = post.data;
            setState({...state, id, title, content, tags, comments, comments_count, reader, coverImage, created_at, views_count, loadedSuccessfully: true});
        }else{
            console.log('error: ', post.message);
            setState({...state, errorMsg: post.message});
        }
    }

    const renderContent = () => {
        if(!state.loading) {
            if(state.loadedSuccessfully) {
                return (
                    <>
                        <PostTitle>
                            <h2>{state.title}</h2>
                            <span>{`Posted ${state.created_at} by Aigars`}</span>
                        </PostTitle>

                        <Image src={state.coverImage.url} alt="photo of a post" />

                        <div dangerouslySetInnerHTML={createMarkup(state.content)}></div>

                        <hr />

                        <div style={{textAlign: "center"}}>
                                <Comments comments={state.comments} post_id={state.id} />
                        </div>
                    </>
                );
            }else{
                let errorMsg = (state.errorMsg != '') ? state.errorMsg : 'An Error Occured';
                return(
                    <p className="alert alert-danger">{errorMsg}</p>
                );
            }
        }else{
            return (
                <h3>LOADING.....</h3>
            );
        } 
    }

    //if(state.loading==false && state.loaded==false) getPost();
    
    //console.log('user:', User);
    console.log('comments: ', location.state);

    

    return (
        <>
            <Header />
            <Container>
                <PostContainer>
                    {renderContent()}
                </PostContainer>
                <About>
                  <RecentPosts />
                </About>
            </Container>
        </>
    );
}

export default FullBlogPost;
