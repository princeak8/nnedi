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
                // <div key={comment.id} style={{marginTop: 20, textAlign: 'left', width: "100%"}}>
                //     <h4>{comment.reader.name}</h4>
                //     <p>
                //         {comment.message}
                //     </p>
                //     <Replies replies={comment.replies} comment_id={comment.id} />
                //     <div style={{marginTop: 40}}>
                //         <hr />
                //     </div>
                // </div>

                <div key={comment.id} className="comments-info" style={{width:"100%"}}>
                    {/* <div className="cmnt-icon-left">
                        <a href="#"><img src="images/icon3.png" alt=""/></a>
                    </div> */}
                    <div className="cmnt-icon-right" style={{width:"100%"}}>
                        <p className="pull-right">MAY 13, 2015</p>
                        <p>Admin</p>
                        <p className="cmmnt">{comment.message}</p>
                    </div>
                    <div className="clearfix"> </div>

                    <Replies replies={comment.replies} comment_id={comment.id} />
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
            <div className="comments">
                <h4>Comments</h4>
                {renderComments()}
                                    
            </div>
            {renderMakeComment()}
        </>
    );
}



export default Comments;
