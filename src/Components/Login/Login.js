import React, { useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebaseConfig';
import { useForm } from 'react-hook-form';
import './Login.css'
import { Link } from 'react-router-dom';

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}

const Login = () => {

    const [user, setUser] = useState({
        isSignIn: false,
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        success: false,
        error: ''
    })
    const [OldUser, setOldUser] = useState(false);

    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = event => {

        if (OldUser && user.email && user.password) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                    console.log(newUserInfo);
                })
                .catch((error) => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    setUser(newUserInfo);
                });

        }

        if (!OldUser && user.email & user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then( res => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                })
                .catch(error => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    setUser(newUserInfo);
                });
        }

        // event.preventDefault();
    }
    console.log(watch("example"));

    const handleGoogleSignIn = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(provider)
            .then(res => {
                const { displayName, email } = res.user;
                const signInUser = {
                    isSignIn: true,
                    name: displayName,
                    email: email
                }
                setUser(signInUser);
                console.log(res.user);
            }).catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;
            });
    }


    const handleBlur = (event) => {
        let isFieldValid = true;
        if (event.target.name === 'email') {
            // isFieldValid = /\$+\s+\.\s+/.test(event.target.value);
            isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
        }
        if (event.target.name === "password") {
            const isPasswordValid = event.target.value.length > 4;
            const passwordNumber = /\d{1}/.test(event.target.value);
            isFieldValid = isPasswordValid && passwordNumber;
        }
        // if(event.target.name === "confirmPassword")
        // {
        //     const isCNPasswordValid = event.target.value.length > 4;
        //     const CNPasswordNumber = /\d{1}/.test(event.target.value);
        //     isFieldValid = isCNPasswordValid && CNPasswordNumber;
        // }
        if (isFieldValid) {
            const newUserInfo = { ...user };
            newUserInfo[event.target.name] = event.target.value;
            setUser(newUserInfo);
        }
    }

    return (
        <div >
            <form onSubmit={handleSubmit(onSubmit)} className="form-design " >

                {
                    OldUser ? "" : <input type="text" name="name" onBlur={handleBlur} ref={register({ required: true })} placeholder="Enter your name" />

                }
                {errors.name && <span style={{ color: "red" }} >This field is required</span>}

                <input type="text" name="email" onBlur={handleBlur} ref={register({ required: true })} placeholder="Enter your email" />
                {errors.email && <span style={{ color: "red" }} >This field is required</span>}

                <input type="password" name="password" onBlur={handleBlur} ref={register({ required: true })} placeholder="password" />
                {errors.password && <span style={{ color: "red" }} >This field is required</span>}

                {
                    OldUser ? "" : <input type="password" name="confirmPassword" onBlur={handleBlur} ref={register({ required: true })} placeholder="Confirm password" />
                }
                {errors.confirmPassword && <span style={{ color: "red" }} >This field is required</span>}

                <input className="btn btn-primary" type="submit" value={OldUser ? "Login your account" : "Create your Account"} />
                <p style={{ color: "red" }} >{user.error}</p>
                {
                    user.success && <p style={{ color: "green" }}>User created successfully</p>
                }
                {
                    OldUser ? <p>Don't have an Account?</p> : <p>Already have an Account? </p>
                }
                {
                    OldUser ?
                        <Link onClick={() => setOldUser(!OldUser)} style={{ color: "blue" }} >Create your Account </Link>
                        : <Link onClick={() => setOldUser(!OldUser)} style={{ color: "blue" }} >Login</Link>
                }
            </form>
            <button onClick={handleGoogleSignIn} className="btn btn-warning">Sign In With Google</button>
        </div>
    );
};

export default Login;