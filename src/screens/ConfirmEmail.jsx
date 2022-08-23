import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { request } from "../api";
import { userActions } from "../store/userSlice";
import { useNavigate, useParams, Link } from "react-router-dom";
import Header from "../components/Header";

function ConfirmEmail(props) {
    const signature = useParams().signature
    const navigate = useNavigate();
    const [state, setState] = useState({errorMsg:[], successMsg: '', login: false, loaded: false});

    useEffect(() => {
        confirmSignature();
    }, []);

    const confirmSignature = async () => {
        let userData = {signature};
        //console.log(userData);
        let response = await request('POST', '/auth/verify_email_link', userData);
        console.log(response.status);
        if(response.status == 200 || response.status == 201) {
            console.log('success', response.data);
            if(response.status==200) {
                let ttl = response.data.token_expires_in;
                let now = parseInt(Date.now()/1000);
                let expires = now + ttl;
                localStorage.setItem("user", JSON.stringify(response.data.user));
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("token_expires", expires);

                //console.log(JSON.parse(localStorage.user));
                navigate("/");
            }
            
            
            setState({...state, successMsg:response.message, loaded: true, login: true});
        }else{
            setState({...state, errorMsg:response.message, loaded: true,});
        }
    }

    const displayErrors = () => {
        if(state.errorMsg.length > 0) {
            // setTimeout(() => setState({...state, errorMsg:[]}), 5000);
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

    const renderContent = () => {
        if(!state.loaded) {
            return (
                <p style={{marginRight:"auto", marginLeft:"auto", marginTop: "3em"}}>..Please wait while we confirm your email link</p>
            );
        }else{
            return (
                <div style={{display: "flex", width: "70%", marginLeft: "auto", marginRight: "auto", marginTop: "10em", flexDirection: "column"}}>
                    {displayErrors()}
                    {displaysuccess()}

                    {state.login && (<p>You can go ahead and <Link to="/login">LOGIN</Link></p>)}
                </div>
            );
        }
    }


    return (
        <>
            <Header page="register" />
            
            {renderContent()}
        </>
    );
}

export default ConfirmEmail;