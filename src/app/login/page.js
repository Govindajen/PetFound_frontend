'use client';
import React from 'react';
import styles from '../../styles/auth.module.css';

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faCheck, faXmark, faExclamation, faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";

import {setLogin} from '../../lib/reducers/account'


function Auth() {
    const dispatch = useDispatch();

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const [errorAuth, setErrorAuth] = useState(false);

    const [selectAuth, setSelectAuth] = useState(true)
    const [selectTypeInput, setSelectTypeInput] = useState('password')

    const EMAIL_REGEX = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    const containsWhitespace = str => /\s/.test(str);
    const checkStructure = () => {
        if (
        !containsWhitespace(firstname) &&
        !containsWhitespace(lastname) &&
        !containsWhitespace(username) &&
        firstname.length >= 6 && 
        username.length >= 6 &&
        lastname.length >= 6 &&
        EMAIL_REGEX.test(email) &&
        password.length >= 6
        ) {
            console.log(true)
            return true
        } else {
            console.log(false)
            return false
        }
    }
    



    const handleShowPassword = () => {
        if(selectTypeInput === 'password') {
            setSelectTypeInput('text')
        } else {
            setSelectTypeInput('password')
        }
    }


const handleSignIn = () => {
  if(errorAuth === true) setErrorAuth(!errorAuth);

    if(password.length >= 6 && EMAIL_REGEX.test(email)) {
        fetch("https://pet-found-backend.vercel.app/users/signin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: email,
                password: password
            }),
          }).then((response) => response.json())
            .then((data) => {
              if (data.result) {
                console.log(data)
                dispatch(setLogin({ username: data.user.username, rank: data.user.rank, firstname: data.user.firstname, lastname: data.user.lastname, email: data.user.email, token: data.user.token, profileImg: data.user.profileImg}));
                return window.location.replace('/');
              } else if (!data.result) {
                //dispatch(setLogout())
                setErrorAuth(!errorAuth)
                console.log(data)
              }
            });
    }
  }

  const handleSignUp = () => {
    if(errorAuth === true) setErrorAuth(!errorAuth);

    if(checkStructure()) {
        fetch("https://pet-found-backend.vercel.app/users/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: username,
                firstname: firstname,
                lastname: lastname,
                location: null,
                email: email,
                password: password
            }),
          }).then((response) => response.json())
            .then((data) => {
              if (data.result) {
                dispatch(setLogin({ username: data.user.username, rank: data.user.rank, firstname: data.user.firstname, lastname: data.user.lastname, email: data.user.email, token: data.user.token, profileImg: data.user.profileImg}));
                return window.location.replace('/');
              } else if (!data.result) {
                setErrorAuth(!errorAuth)
              }
            });
    }
  }


    let signIn = (
        <div className={styles.connectionContainer} key='signInDiv'>

            <h2>Connection</h2>

            <div className={styles.inputsContainer}>
                <div className={styles.divInput}>
                    <input type='text' placeholder='example@mail.com' 
                        onChange={(e) => setEmail(e.target.value)} value={email} 
                        className={styles.inputs}/>
                    {!EMAIL_REGEX.test(email) ? <FontAwesomeIcon icon={faExclamation} className={styles.checkIconX} /> : 
                                                        <FontAwesomeIcon icon={faCheck} className={styles.checkIconOK}/>}
                </div>
                

                <div className={styles.divInput}>

                    <input type={selectTypeInput}
                        placeholder='password (min 6chr.)'
                        onChange={(e) => setPassword(e.target.value)} value={password} 
                        className={styles.passwordInput}/>

                    {(selectTypeInput == 'password') ? <FontAwesomeIcon icon={faEye} className={styles.showPasswordIcon} onClick={() => handleShowPassword()}/> : 
                                                    <FontAwesomeIcon icon={faEyeSlash} className={styles.showPasswordIcon} onClick={() => handleShowPassword()}/>}
                    {(password.length >= 6 ) ? <FontAwesomeIcon icon={faCheck} className={styles.checkIconOK} /> : 
                                                        <FontAwesomeIcon icon={faExclamation} className={styles.checkIconX} />}
                </div>


            </div>
            <div>
                {errorAuth && <p className={styles.errorText} style={{'textAlign': 'center'}}>Email or password incorrect..</p>}
                <button onClick={() => handleSignIn()} className={styles.signBtn}>Connect</button>
            </div>
        </div>
    );
    let signUp = (
        <div className={styles.connectionContainer} key='signUpDiv'>
            <h2>Create Account</h2>

            <div className={styles.inputsContainer}>

                <div className={styles.divInput}>
                    <input type='text' placeholder='johndoe404' 
                        onChange={(e) => setUsername(e.target.value)} value={username} 
                        className={styles.inputs}/>
                    {(username.length >= 6) ? <FontAwesomeIcon icon={faCheck} className={styles.checkIconOK} /> : 
                                                        <FontAwesomeIcon icon={faExclamation} className={styles.checkIconX} />}
                </div>
                {containsWhitespace(username) && <p className={styles.errorText}>Username can't contain whitespace..</p>}                                       

                <div className={styles.divInput}>
                    <input type='text' placeholder='John' 
                        onChange={(e) => setFirstname(e.target.value)} value={firstname} 
                        className={styles.inputs}/>
                    {(firstname.length >= 6) ? <FontAwesomeIcon icon={faCheck} className={styles.checkIconOK} /> : 
                                                        <FontAwesomeIcon icon={faExclamation} className={styles.checkIconX} />}
                </div>
                {containsWhitespace(firstname) && <p className={styles.errorText}>Firstname can't contain whitespace..</p>}

                <div className={styles.divInput}>
                    <input type='text' placeholder='Doe' 
                        onChange={(e) => setLastname(e.target.value)} value={lastname} 
                        className={styles.inputs}/>
                    {(lastname.length >= 6) ? <FontAwesomeIcon icon={faCheck} className={styles.checkIconOK} /> : 
                                                        <FontAwesomeIcon icon={faExclamation} className={styles.checkIconX} />}
                </div>
                {containsWhitespace(lastname) && <p className={styles.errorText}>Lastname can't contain whitespace..</p>}

                <div className={styles.divInput}>
                    <input type='text' placeholder='example@mail.com' 
                        onChange={(e) => setEmail(e.target.value)} value={email} 
                        className={styles.inputs}/>
                    {!EMAIL_REGEX.test(email) ? <FontAwesomeIcon icon={faExclamation} className={styles.checkIconX}/> : 
                                                        <FontAwesomeIcon icon={faCheck} className={styles.checkIconOK}/>}
                </div>
                

                <div className={styles.divInput}>
                    <input type={selectTypeInput} 
                        placeholder='password (min 6chr.)'
                        onChange={(e) => setPassword(e.target.value)} value={password} 
                        className={styles.passwordInput}/>

                    {(selectTypeInput == 'password') ? <FontAwesomeIcon icon={faEye} className={styles.showPasswordIcon} onClick={() => handleShowPassword()}/> : 
                                                    <FontAwesomeIcon icon={faEyeSlash} className={styles.showPasswordIcon} onClick={() => handleShowPassword()}/>}
                    {(password.length >= 6 ) ? <FontAwesomeIcon icon={faCheck} className={styles.checkIconOK} /> : 
                                                        <FontAwesomeIcon icon={faExclamation} className={styles.checkIconX}/>}
                </div>
                {containsWhitespace(password) && <p className={styles.errorText}>Password can't contain whitespace..</p>}


            </div>
                <button onClick={() => handleSignUp()}className={styles.signBtn}>Register</button>
        </div>                      
    );

    const handleback = () => {
        window.location.replace("/");
    }
  
  return (
    <div className={styles.container} key={'SignContainer'}>
      <div className={styles.sideLeft}>
        <FontAwesomeIcon icon={faCircleArrowLeft} onClick={() => handleback()} className={styles.backIcon}/>
        <div className={styles.sideLeftContainer}>
          <h1 className={styles.title}>Pet <span className={styles.found}>Found</span></h1>
        </div>
      </div>

      <div className={styles.sideRight}>
        <div className={styles.dynamicContainer}>

            {selectAuth ? signIn : signUp}
            <div className={styles.changeContainer}>
                {selectAuth ?   <button className={styles.changeBtn}onClick={() => setSelectAuth(!selectAuth)}>I don't have an account</button> : 
                                <button className={styles.changeBtn}onClick={() => setSelectAuth(!selectAuth)}>I have an account</button>}
            </div>
        </div>
      </div>

    </div>
  );
}

export default Auth;