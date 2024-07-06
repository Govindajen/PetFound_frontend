'use client';
import styles from '../styles/header.module.css';
import langJSON from '../lib/lang.json'

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLangReducer } from '../lib/reducers/account';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCircleUser, faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link';

export default function Header(props) {

    const dispatch = useDispatch();
    const account = useSelector((state) => state.account.value);
    const [lang, setLang] = useState({});

    const [openHamburger, setOpenHamburger] = useState(false)

/*  ---------------------------------------------------------------------- */
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);

        if(account.lang === 'en') {
          setLang(langJSON.EN)
        } else if (account.lang === 'fr') {
          setLang(langJSON.FR)
        }
    


    }, []);

    if (!isClient) {
        return null;
    } else {
/*  ---------------------------------------------------------------------- */

    
    const handleUserIconClick = () => {
        window.location.replace("/login");
    };


    let langDiv = (<p></p>)

if (account.lang === 'en') {
    langDiv = (
        <p title='English' className={styles.langOption} onClick={() => {dispatch(setLangReducer('fr')); location.reload();}}>🇬🇧</p>
    )
} else if (account.lang === 'fr') {
    langDiv = (
        <p title='French' className={styles.langOption} onClick={() => {dispatch(setLangReducer('en')); location.reload();}}>🇫🇷</p>
    )
}


let hamburgerDisplay = 'none';

if(openHamburger !== false) {
    hamburgerDisplay = 'flex'
}


        
        return (
            <div className={styles.main}>
                <div className={styles.logoContainer}>
                    <Link className={styles.link} href={`/`}>
                        <p className={styles.petText}>Pet 
                            <span className={styles.foundText}> Found</span>
                        </p>
                    </Link>
                </div>

                <div className={styles.hamburgerMenu}>
                    <span className={styles.hamburgerIcon}>
                        <FontAwesomeIcon icon={faBars} onClick={ () => {setOpenHamburger(!openHamburger)}}/>
                    </span>
                </div>

                <div className={styles.hamburger} style={{'display': hamburgerDisplay}}>
                    <div className={styles.logoContainer}>
                        <div className={styles.logo}>
                                <p className={styles.petText}>Pet 
                                    <span className={styles.foundText}> Found</span>
                                </p>
                        </div>
                            <div className={styles.barIconClose}>
                                <FontAwesomeIcon icon={faBars} onClick={ () => {setOpenHamburger(!openHamburger)}}/>
                            </div>
                    </div>


                    <div className={styles.dedicateBTNS}>
                         <button className={styles.btnFound}>Found</button>
                         <button className={styles.btnLost}>Lost</button>
                     </div>

                    <div className={styles.searchBarDiv}>
                        <select id="pet-select" className={styles.selectBtn}>
                            <option value="announce">Announce</option>
                            <option value="user">User</option>
                        </select>

                        <input 
                         className={styles.searchInput}
                            type="search" 
                            id="site-search" 
                            name="q" 
                            placeholder='Announce/username'
                            value={''} 
                            />
                        <button className={styles.searchBtn}>{lang.header.searchBar.btn}</button>
                    </div>

                        <div className={styles.profileContainerHamburger}>
                            <div className={styles.usernameDiv}>
                                {account.username ? (
                                    <>

                                    <div>
                                    <Link href={`/profile/${encodeURIComponent(account.username)}`}>
                                        <span className={styles.userIconSignIn}>
                                            <FontAwesomeIcon icon={faCircleUser} className={styles.userIcon} />
                                        </span>
                                    </Link>
                                    </div>

                                    <div>
                                        <p className={styles.welcome}>Profile</p>
                                        <Link href={`/profile/${encodeURIComponent(account.username)}`} className={styles.username}>
                                            @{account.username}
                                        </Link>
                                    </div>
                                    </>
                                ) : (
                                    <div>
                                        <p className={styles.welcome}>SignIn | SignUp</p>
                                        <FontAwesomeIcon
                                            icon={faCircleUser}
                                            className={styles.userIcon}
                                            onClick={handleUserIconClick}
                                            />
                                    </div>
                                )}
                            </div>
                        </div>
                            <div>
                                {langDiv}
                            </div>
                </div> {/* END OF HAMBURGER DIV */}


                <div className={styles.searchBarContainer}>
                    <div className={styles.dedicateBTNS}>
                        <button className={styles.btnFound}>Found</button>
                        <button className={styles.btnLost}>Lost</button>
                    </div>

                    <div className={styles.searchBarDiv}>
                        <select id="pet-select" className={styles.selectBtn}>
                            <option value="announce">Announce</option>
                            <option value="user">User</option>
                        </select>

                        <input 
                         className={styles.searchInput}
                            type="search" 
                            id="site-search" 
                            name="q" 
                            placeholder='Announce/username'
                            value={''} 
                            />
                        <button className={styles.searchBtn}>{lang.header.searchBar.btn}</button>
                    </div>
                </div>

                <div className={styles.profileContainer}>
                    <div className={styles.usernameDiv}>
                        {account.username ? (
                            <>
                            <div>
                                <p className={styles.welcome}>{lang.header.about.welcome}</p>
                                <Link href={`/profile/${encodeURIComponent(account.username)}`} className={styles.username}>
                                    @{account.username}
                                </Link>
                            </div>

                            <div>
                            <Link href={`/profile/${encodeURIComponent(account.username)}`}>
                                <span className={styles.userIconSignIn}>
                                    <FontAwesomeIcon icon={faCircleUser} className={styles.userIcon} />
                                </span>
                            </Link>
                            </div>
                            </>
                        ) : (
                            <div>
                                <FontAwesomeIcon
                                    icon={faCircleUser}
                                    className={styles.userIcon}
                                    onClick={handleUserIconClick}
                                    />
                            </div>
                        )}
                    </div>
                    {langDiv}
                </div>
            </div>
    );
}
}