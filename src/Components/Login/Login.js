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
    const [newUser, setNewUser] = useState(false);


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
                console.log(signInUser);
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


    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = event => {

        if (newUser && user.email && user.password) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const newUser = res.user;
                    const newUserInfo = { ...newUser };
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    newUserInfo.name = user.name;
                    setUser(newUserInfo);
                    updateUserName(user.name);
                    console.log(newUserInfo)
                })
                .catch((error) => {
                    const newUserInfo = { ...user }
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                });

        }

        if (!newUser && user.email && user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    console.log(res)
                    const newUser = res.user;
                    const newUserInfo = { ...newUser };
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log(errorMessage)
                });
        }

        //  event.preventDefault();
    }
    console.log(watch("example"));

   

    const updateUserName = name => {
        const user = firebase.auth().currentUser;
        user.updateProfile({
            displayName: name
        }).then(function () {
            console.log("update userName successfully")
        }).catch(function (error) {
           console.log(error);
        });
    }


    return (
        <div >
            <input type="checkbox" onChange={() => setNewUser(!newUser)} />
            <label htmlFor="newUser" >New User Sign up</label>
            <form onSubmit={handleSubmit(onSubmit)} className="form-design " >

                {
                    newUser && <input type="text" name="name" onBlur={handleBlur} ref={register({ required: true })} placeholder="Enter your name" />
                }
                {errors.name && <span style={{ color: "red" }} >This field is required</span>}

                <input type="text" name="email" onBlur={handleBlur} ref={register({ required: true })} placeholder="Enter your email" />
                {errors.email && <span style={{ color: "red" }} >This field is required</span>}

                <input type="password" name="password" onBlur={handleBlur} ref={register({ required: true })} placeholder="password" />
                {errors.password && <span style={{ color: "red" }} >This field is required</span>}

                {/* <input type="password" name="confirmPassword" onBlur={handleBlur} ref={register({ required: true })} placeholder="Confirm password" />
                {errors.confirmPassword && <span style={{ color: "red" }} >This field is required</span>} */}

                <input className="btn btn-primary" type="submit" value={newUser ? "Create your Account" : "Login your Account"} />
                <p style={{ color: "red" }} >{user.error}</p>
                {
                    user.success && <p style={{ color: "green" }}>User {newUser ? "created" : "logged in"} successfully</p>
                }


                {/* <Link> Create your Account </Link> */}

            </form>
            <button onClick={handleGoogleSignIn} className="btn btn-warning">Sign In With Google</button>
            <p>Name:{user.name}</p>
            <p>Email:{user.email}</p>
        </div>
    );
};

export default Login;