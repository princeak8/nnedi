import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser, registerUser } from "../api/auth";
import { userActions } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

function Register(props) {
    const errorRef = useRef();
    const emailRef = useRef();
    const nameRef = useRef();
    const passwordRef = useRef();
    const [state, setState] = useState({errorMsg:[], name: '', email: '', password: '', isLoading: false, successMsg: '', submitting: false});

    const handleNameChange = (event) => {
        setState({...state, name:event.target.value});
    }

    const handleEmailChange = (event) => {
        setState({...state, email:event.target.value});
    }

    const handlePasswordChange = (event) => {
        setState({...state, password:event.target.value});
    }

    const handleSubmit = async (event) => {
        //Submit form
        event.preventDefault();
        let userData = {name: state.name, email: state.email, password: state.password, domain:process.env.REACT_APP_DOMAIN, domain_name:process.env.REACT_APP_DOMAIN_NAME};
        //console.log(userData);
        setState({...state, submitting:true});
        const response = await registerUser(userData);
        console.log(response.status);
        if(response.status == 200 || response.status == 201) {
            console.log('success', response.data);
            setState({...state, submitting:false, successMsg:response.data.message, name:"", email:"", password:""});
        }else{
            handleError(response, response.status);
        }
    }

    const handleError = (response, statusCode) => {
        let errorMsg = [];
        switch(statusCode) {
            case 422 : 
                //console.log('error: ', response.data.errors);
                for(const key in response.data.errors) response.data.errors[key].map(error => errorMsg.push(error) );
                break;
        }
        console.log(errorMsg);
        setState({...state, submitting:false, errorMsg:errorMsg});
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
            //setTimeout(() => setState({...state, successMsg:''}), 5000);
            return (<div className="alert alert-success"><span>{state.successMsg}</span><br/></div>); 
        }
    }

    return (
        <>
            <Header page="register" />
            <div style={{display: "flex", width: "70%", marginLeft: "auto", marginRight: "auto", marginTop: "10em", flexDirection: "column"}}>
                <h2 style={{width: "100%", textAlign: "center"}}>
                    FILL THE FORM BELOW TO REGISTER
                </h2>
                {displayErrors()}
                {displaysuccess()}
                {/* <div className="alert alert-danger"><span>This is an error</span><br/></div> */}

                <form onSubmit={handleSubmit} style={{width: "80%", marginTop: 10}}>
                    <div >
                        <label htmlFor="name">Name</label>
                        <input ref={nameRef} id="name" className="form-control" type="text" onChange={handleNameChange} value={state.name} required />
                    </div>

                    <div >
                        <label htmlFor="email">Email</label>
                        <input ref={emailRef} id="email" className="form-control" type="text" onChange={handleEmailChange} value={state.email} required />
                    </div>

                    <div >
                        <label htmlFor="password">Password</label>
                        <input ref={passwordRef} id="password" className="form-control" type="password" onChange={handlePasswordChange} value={state.password} required />
                    </div>

                    <br />
                    {state.submitting && (
                        <button disabled={true}>
                            <i className={`fa fa-circle-o-notch fa-spin`}></i>
                            Submitting
                        </button>
                    )}
                    {!state.submitting && <button>REGISTER</button>}
                </form>
            </div>
        </>
    );
}

export default Register;