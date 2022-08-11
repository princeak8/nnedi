import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import { UserStore } from '../store/UserStore';
import { useNavigate } from "react-router-dom";
import { request } from "../api";
import ReplyForm from "./ReplyForm";

function Replies(props) {
    const {user} = UserStore();
    const navigate = useNavigate();
    let { replies, comment_id } = props;

    const [state, setState] = useState({replies: replies, show:false});

    const toggleShow = () => setState({...state, show:!state.show});

    const renderReplies = () => {
        if(state.replies.length > 0) {
            return state.replies.map((reply) => {
                return (
                    <div key={reply.id} style={{marginTop: 20, textAlign: 'left'}}>
                        <h4>{reply.reader.name}</h4>
                        <p>
                            {reply.message}
                        </p>
                    </div>
                );
            })
        }
    }

    const SubmitReply = async (message) => {
        let replyData = {comment_id: comment_id, message: message, reader_id: user.id};
        let response = await request('POST', '/comment/reply', replyData);
        console.log('response: ', response);
        if(response.status == 200) setState({...state, replies:response.data});
        if(response.status == 401) navigate('/login');
        return response;
    }

    const ReplyHeaderStyle = () => {
        if(state.show) {
            return {cursor:"pointer", textDecorationLine: "underline"};
        }else{
            return {textDecorationLine: "underline", cursor:"pointer"};
        }
    }

    const renderContent = () => {
        if(state.show) {
            return (
                <>
                    <div style={container}>
                        {renderReplies()}
                    </div>
                    <ReplyForm SubmitReply={SubmitReply} repliesCount={state.replies.length} />
                </>
            );
        }
    }
    

    const styles = {
        container: {display: 'flex', alignItems: 'flex-start', flexDirection: 'column', width: '70%', marginLeft: '10%'}
    }
    const { container } = styles;
    return (
        <>
            <div styles={{marginTop: 10, width: "100%"}}>
                <h5 style={ReplyHeaderStyle()} onClick={toggleShow}>REPLIES({state.replies.length})</h5>
                {renderContent()}
            </div>
        </>
    );
}



export default Replies;
