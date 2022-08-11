import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser, registerUser } from "../api/auth";
import { userActions } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

function Login(props) {
    const navigate = useNavigate();
    const errorRef = useRef();
    const emailRef = useRef();
    const nameRef = useRef();
    const passwordRef = useRef();
    const [state, setState] = useState({errorMsg:[], email: '', password: '', isLoading: false, successMsg: ''});


    const handleEmailChange = (event) => {
        setState({...state, email:event.target.value});
    }

    const handlePasswordChange = (event) => {
        setState({...state, password:event.target.value});
    }

    const handleSubmit = async (event) => {
        //Submit form
        event.preventDefault();
        let userData = {email: state.email, password: state.password};
        //console.log(userData);
        setState({...state, isLoading:true});
        const response = await loginUser(userData);
        setState({...state, isLoading:false});
        if(response.status == 200 || response.status == 201) {
            console.log('success', response.data.data.token_expires_in);
            
            let ttl = response.data.data.token_expires_in;
            let now = parseInt(Date.now()/1000);
            let expires = now + ttl;
            localStorage.setItem("user", JSON.stringify(response.data.data.user));
            localStorage.setItem("token", response.data.data.token);
            localStorage.setItem("token_expires", expires);
            
            //console.log(JSON.parse(localStorage.user));
            navigate("/");
        }else{
            handleError(response, response.status);
        }
    }
    //let date = new Date();
            //date.setSeconds((60*60*60));
            //console.log('now: ', (Date.now()));
            //setInterval(() => console.log('now: ', Date.now()), 60000);
            //console.log('now now: ', parseInt(Date.now()/1000));
            //console.log(parseInt(20000/1000));

    const handleError = (response, statusCode) => {
        // console.log('status', statusCode);
        // console.log('response', response.data.error);
        let errorMsg = [];
        switch(statusCode) {
            case 422 : 
                //console.log('error: ', response.data.errors);
                for(const key in response.data.errors) response.data.errors[key].map(error => errorMsg.push(error) );
                break;
            case 401 :
                errorMsg.push(response.data.error);
        }
        console.log(errorMsg);
        setState({...state, errorMsg:errorMsg});
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
        <>
            <Header page="login" />
            <div style={{display: "flex", width: "70%", marginLeft: "auto", marginRight: "auto", marginTop: "10em", flexDirection: "column"}}>
                <h2 style={{width: "100%", textAlign: "center"}}>
                    LOGIN
                </h2>
                {displayErrors()}
                {displaysuccess()}
                {/* <div className="alert alert-danger"><span>This is an error</span><br/></div> */}

                <form onSubmit={handleSubmit} style={{width: "80%", marginTop: 10}}>

                    <div >
                        <label htmlFor="email">Email</label>
                        <input ref={emailRef} id="email" className="form-control" type="text" onChange={handleEmailChange} value={state.email} required />
                    </div>

                    <div >
                        <label htmlFor="password">Password</label>
                        <input ref={passwordRef} id="password" className="form-control" type="password" onChange={handlePasswordChange} value={state.password} required />
                    </div>

                    <br />
                    {state.isLoading && (
                        <button disabled={true}>
                            <i className={`fa fa-circle-o-notch fa-spin`}></i>
                            Loading
                        </button>
                    )}
                    {!state.isLoading && <button className="form-control">LOGIN</button>}
                </form>
            </div>
        </>
    );
}

export default Login;