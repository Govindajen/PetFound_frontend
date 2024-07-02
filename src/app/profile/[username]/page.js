'use client';
import { Badge } from 'antd';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw, faAt, faLocationDot, faPaperPlane, faPersonCircleCheck, faBookmark, faIdBadge, faSquarePhoneFlip } from "@fortawesome/free-solid-svg-icons";


import Header from '../../../components/Header'
import styles from '../../../styles/profile.module.css';

import Image from 'next/image';
import Link from 'next/link';
import langJSON from '../../../lib/lang.json'

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';

import { setLogout } from '../../../lib/reducers/account';

export default function Profile( params ) {
  const dispatch = useDispatch();
  
  const routerUsername = params.params.username;
  const account = useSelector((state) => state.account.value);

  const [profileInformations, setProfileInformations] = useState(null);
  const [profileSection, setProfileSection] = useState('default');
  const [lang, setLang] = useState({});

  useEffect( () => {
    fetch(`https://pet-found-backend.vercel.app/users/profileinformations/${routerUsername}`).then( response => response.json()).then( (data) => {
      if(data.result) {
        setProfileInformations(data.user)
      }
    })

    if(account.lang === 'en') {
      setLang(langJSON.EN)
    } else if (account.lang === 'fr') {
      setLang(langJSON.FR)
    }

  }, [])



  const myProfileContentContainer =  () => {

    if(profileSection == 'default') {
      return (
      <p>123</p>
    )
    } else {
      return (
        <p>lol</p>
      )
    }
}





if (profileInformations) {
  let badgeInfoColor = ('blue')
  
  if(profileInformations.rank === 'admin') {
     badgeInfoColor = ('orange')
  } else if (profileInformations.rank === 'user') {
    badgeInfoColor = ('blue')
  } else if (profileInformations.rank === 'association') {
    badgeInfoColor = ('pink')
  }

  if(account.token === profileInformations.token) {
    return (
      
      <main className={styles.main}>
        <div className={styles.headerContainer}>
          <Header />
        </div>

        <div className={styles.container}>
          <div className={styles.side}>

          <div className={styles.profileInfo}>

            <div className={styles.imageContainer}>
              <div className={styles.imageDiv}>
                <Badge.Ribbon text={'@' + profileInformations.username} color={badgeInfoColor}>
                  {( profileInformations.profileImg == null) ? <Image src='/user.png' height={120} width={120}/> : <img src={profileInformations.profileImg} height={150} width={150} className={styles.profileImg}/>}
                </Badge.Ribbon>
              </div>
                  {(profileInformations.rank === 'admin') && 
                    <div className={styles.iconWithUsername}>
                          <FontAwesomeIcon icon={faIdBadge} className={styles.bardgeIcon} alt={'Admin'} title="Admin"/>
                          <p className={styles.rank}>Admin</p>
                    </div>
                  }
                  {(profileInformations.rank === 'association') &&
                    <div className={styles.iconWithUsername}>
                          <FontAwesomeIcon icon={faPersonCircleCheck} className={styles.bardgeIcon} alt={'PublicAdministration'} title="PublicAdministration"/>
                          <p className={styles.rank}>Public Admn. Profile</p>
                    </div>
                  }
                  {(profileInformations.rank === 'user') && 
                      <p className={styles.rank}>
                          User
                      </p>
                  }
            </div>

            <div className={styles.profileAbout}>
              <div className={styles.aboutUser}>
                <div className={styles.profileNames}>
                  <p>{profileInformations.firstname}</p>
                  <p>{profileInformations.lastname}</p>
                </div>

                <p>Location</p>
                <p>Create 10/02/22</p>
              </div>

              <div className={styles.contactList}>
                <Link href='' alt='' className={styles.contactIcon}>
                  <FontAwesomeIcon icon={faPaperPlane} /> Telegram
                </Link>

                <Link href='' alt='' className={styles.contactIcon}>
                  <FontAwesomeIcon icon={faAt} /> E-mail
                </Link>

                <Link href='' alt='' className={styles.contactIcon}>
                  <FontAwesomeIcon icon={faSquarePhoneFlip} /> {lang.profile.side.telephone}
                </Link>
              </div>

            </div>
          </div>

            <div className={styles.accountSettings}>
              <p>{lang.profile.side.accountSettings}</p>
              <p>LEGALS</p>
              <button onClick={() => { dispatch(setLogout()); location.reload();} }>Logout</button>

            </div>
            
          </div>

          <div className={styles.contentContainer}>
            <div className={styles.contentDiv}>
              {myProfileContentContainer()}
            </div>
          </div>

        </div>

      </main>

    )
  } else {
    return (
      
      <main className={styles.main}>
        <div className={styles.headerContainer}>
          <Header />
        </div>

        <div className={styles.container}>

        </div>

      </main>

    );
  }

} else {
  return (
    <>
    
    <main className={styles.main}>
        <div className={styles.headerContainer}>
          <Header />
        </div> 
          <p>If this message is fix, please refresh..</p>
          <button>REFRESH</button>
      </main>

    </>
  )
}
}
  