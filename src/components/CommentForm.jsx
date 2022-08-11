import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useRef, useState } from "react";
import { UserStore } from '../store/UserStore';
import { useNavigate } from "react-router-dom";

function CommentForm(props) {
    const { SubmitComment } = props;
    const [state, setState] = useState({message: '', errorMsg:[], isLoading: false, successMsg: ''});

    const handleMessageChange = (event) => {
        setState({...state, message:event.target.value});
    }

    const handleSubmit = async (event) => {
        //Submit form
        event.preventDefault();
        setState({...state, isLoading:true});
        let response = await SubmitComment(state.message);
        setState({...state, isLoading:false});
        //console.log('response', response);
        if(response.status == 200 || response.status == 201) {
            console.log('success');
            setState({...state, successMsg:response.message, message: ''});
        }else{
            let message = (response.status == 500) ? ['Sorry, an error occured, try again or inform an administrator'] : response.message;
            console.log('error message: ',response.message);
            setState({...state, errorMsg:message});
        }
        
        //
    }

    const displayErrors = () => {
        if(state.errorMsg.length > 0) {
            setTimeout(() => setState({...state, errorMsg:[]}), 5000);
            return state.errorMsg.map((errorMsg, key) => {
                return (<div key={key} className="alert alert-danger"><span>{errorMsg}</span><br/></div>); 
            })
        }
    }

    const displaysuccess = () => {
        if(state.successMsg != '') {
            setTimeout(() => setState({...state, successMsg:''}), 5000);
            return (<div className="alert alert-success"><span>{state.successMsg}</span><br/></div>); 
        }
    }
    
    return (
            <form onSubmit={handleSubmit} style={{width: "80%", marginTop: 10, marginLeft: "auto", marginRight: "auto"}}>
                <p style={{float: "left"}}>Leave a comment</p>
                {displayErrors()}
                {displaysuccess()}
                <textarea className="form-control" onChange={handleMessageChange} value={state.message} required></textarea>
                {state.isLoading && (
                    <button className="btn btn-primary" disabled={true} style={{float: "left"}}>
                        <i className={`fa fa-circle-o-notch fa-spin`}></i>
                        Submiting
                    </button>
                )}
                {!state.isLoading && <button className="btn btn-primary" style={{float: "left"}}>Submit</button>}
            </form>
    );
}

export default CommentForm;
