import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import { UserStore } from '../store/UserStore';
import { useNavigate } from "react-router-dom";
import { request } from "../api";
import CommentForm from "./CommentForm";
import Replies from "./Replies";

function Comments(props) {
    const {user} = UserStore();
    const navigate = useNavigate();
    let { comments, post_id } = props;

    const [state, setState] = useState({comments: comments});

    const renderComments = () => {
        return state.comments.map((comment) => {
            return (
                <div key={comment.id} style={{marginTop: 20, textAlign: 'left', width: "100%"}}>
                    <h4>{comment.reader.name}</h4>
                    <p>
                        {comment.message}
                    </p>
                    <Replies replies={comment.replies} comment_id={comment.id} />
                    <div style={{marginTop: 40}}>
                        <hr />
                    </div>
                </div>
            );
        })
    }

    const renderMakeComment = () => {
        if(user == null) {
            return(
                <p>
                    <span style={{color: 'blue', cursor: 'pointer'}} onClick={() => navigate('/login')}> Login </span> | 
                    <span style={{color: 'blue', cursor: 'pointer'}} onClick={() => navigate('/register')}> Signup </span> 
                    to Comment
                </p>
            );
        }else{
            return(
                <CommentForm SubmitComment={SubmitComment} />
            );
        }
    }

    const SubmitComment = async (message) => {
        //setState({...state, isLoading:true})
        let commentData = {post_id: post_id, message: message, reader_id: user.id};
        //console.log("commentData: ", commentData);
        let response = await request('POST', '/comment/save', commentData);
        console.log('response: ', response);
        if(response.status == 200) setState({...state, comments:response.data});
        if(response.status == 401) navigate('/login');
        return response;
        //console.log('comment made:', message);
        //return response;
        //return {statusCode: 200, message: "commment made successfully"};
    }
    

    const styles = {
        container: {display: 'flex', alignItems: 'flex-start', flexDirection: 'column', width: '100%', marginLeft: '10%'}
    }
    const { container } = styles;
    return (
        <>
            <div>
                <h3>COMMENTS({state.comments.length})</h3>
                <div style={container}>
                    {renderComments()}
                </div>
                {renderMakeComment()}
            </div>
        </>
    );
}



export default Comments;
