import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Redirect } from "react-router-dom";

export default function LoginPage() {
    const [registerUsername, setRegisterUsername] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");
    const [loginUsername, setLoginUsername] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [loginResponse, setLoginResponse] = useState(null);
    const [registerResponse, setRegisterResponse] = useState(null);

    const [isAuthenticated, setIsAuthenticated] = useState(null);

    // how to check if user logged in? check tmr

    useEffect(() => {
        console.log("useEffect")
        axios({
            method: "GET",
            data: {
                username: "eeee",
                password: "eeeeeeeeeeeeeeee",
            },  
            url: "http://localhost:4000/users/checkSession",
        })
        .then((res) => {
            console.log(res);
            setLoginResponse(res.data);
            let loggedIn = null;
            if (res.data === true) {
                console.log("logged in and redirect");
                loggedIn = true
            } else {
                loggedIn = false;
            }
            setIsAuthenticated(loggedIn);
            console.log(loggedIn);
        })
        .catch(err => console.log("bruh useEffect aint workign yyyy"))
    },[])

    const onLoginSubmit = (event) => {
    axios({
        method: "POST",
        data: {
        username: loginUsername,
        password: loginPassword,
        },  
        url: "http://localhost:4000/users/login",
    })
    .then((res) => {
        console.log(res);
        setLoginResponse(res.data);
        if (res.data === true) {
            console.log("logged in and redirect");
            setIsAuthenticated(true);
        }
    })
    .catch(err => console.log(err))

    setLoginPassword("");
    setLoginPassword("");

    event.preventDefault();
    }

    const onRegisterSubmit = (event) => {
    axios({
        method: "POST",
        data: {
        username: registerUsername,
        password: registerPassword,
        password2: registerConfirmPassword
        },  
        url: "http://localhost:4000/users/register",
    })
    .then((res) => {
        console.log(res); 
        setRegisterResponse(res.data);
    })
    .catch(err => console.log(err))

    setRegisterUsername("");
    setRegisterPassword("");
    setRegisterConfirmPassword("");

    event.preventDefault();
    }

    if (isAuthenticated === true) {
        return <Redirect to = "/home" />
    }

    return (
    <div className="container">
        <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow">
            <h5 className="my-0 mr-md-auto font-weight-normal display-4">The Store</h5>
            <nav className="my-2 my-md-0 mr-md-3">
            <span className="p-2 text-dark">Github</span>
            </nav>
        </div>

        <div className="cover-container  mx-5 my-5" style={{textAlign: "center"}}>
            <main role="main" className="inner cover">
            <h1 className="cover-heading">Welcome to the Store.</h1>
            <p className="lead">
                Buy the latest and greatest tech at an affordable price using the Store, the one-stop shop for the tech enthusiant. 
            </p>
            </main>
        </div>

        <div className="row d-flex justify-content-center ">
            <div className="col-sm-9 col-md-7 col-lg-5  mx-5 my-5 shadow p-3 mb-5 bg-white rounded">
                <form className="form-signin">
                <div className="col">
                    <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                    <label>Username</label>
                    <input className="form-control" 
                    value={loginUsername}
                    onChange={(e) => setLoginUsername(e.target.value)}
                    required 
                    />
                    <label>Password</label>
                    <input type="password" className="form-control" 
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required 
                    />
                    <label></label>
                    <button 
                    className="btn btn-lg btn-primary btn-block" 
                    onClick={(e) => onLoginSubmit(e)}
                    type="submit"
                    >
                    Sign in
                    </button>
                </div>
                {loginResponse && <div className="mx-2 my-2" style={{textAlign: "center"}}> {loginResponse} </div>}
                </form>
            </div>
            <div className="col-sm-9 col-md-7 col-lg-5  mx-5 my-5 shadow p-3 mb-5 bg-white rounded">
                <form className="form-signin">
                <div className="col">
                </div>
                <div className="col">
                    <h1 className="h3 mb-3 font-weight-normal">Not a user? Register easily</h1>
                    <label>Username</label>
                    <input className="form-control" 
                    value={registerUsername}
                    onChange={(e) => setRegisterUsername(e.target.value)}
                    required />
                    <label>Password</label>
                    <input 
                    type="password" 
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    className="form-control" 
                    required />
                    <label>Confirm Password</label>
                    <input 
                        type="password" 
                        className="form-control"
                        value={registerConfirmPassword}
                        onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                    required />
                    <label></label>
                    <button 
                    className="btn btn-lg btn-primary btn-block"
                    onClick={(e) => onRegisterSubmit(e)}
                    type="submit"
                    > Register
                    </button>
                </div>
                { registerResponse && <div className="mx-2 my-2" style={{textAlign: "center"}}> {registerResponse} </div>}
                { (registerResponse == true) ? (<div className="mx-2 my-2" style={{textAlign: "center"}}> User is saved! Please login </div>) : ('')}
                </form>
            </div>
        </div>
    </div>
    )
}
