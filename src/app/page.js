'use client';
import Image from "next/image";
import Link from "next/link";
import moment from 'moment'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";

import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

import langJSON from '../lib/lang.json'
import styles from "../styles/home.module.css";
import PetCard from '../components/Petcard';


import Header from '../components/Header';
import CreatePost from "@/components/newpost";

import { setCoordinates } from '../lib/reducers/account';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";


export default function Home (props) {

  const dispatch = useDispatch();

  const account = useSelector((state) => state.account.value);
  const [posts, setPosts] = useState([''])
  const [lang, setLang] = useState({})
  const [loading, setLoading] = useState(false)

  const [position, setPosition] = useState({ latitude: null, longitude: null });

  const timestamp = Date.now()
  const currentDate = new Date(timestamp)

  useEffect( () => {
    fetch('https://pet-found-backend.vercel.app/posts/getall').then( (response) => response.json()).then( (data) => {
      setPosts(data)
    })

    if(account.lang === 'en') {
      setLang(langJSON.EN)
    } else if (account.lang === 'fr') {
      setLang(langJSON.FR)
    }

    setLoading(true)

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        dispatch(setCoordinates({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }));
      });
    } else {
      console.log("Geolocation is not available in your browser.");
    }


  }, [])

  console.log(timestamp * 1000)
  console.log(currentDate.getMonth())

  const postsData = posts.map( (data) => {
    if(data) {
      return (<PetCard username={data.user.username} rank={data.user.rank} petName={data.petName} imageUrl={data.imageUrl} category={data.category} status={data.status} location={data.location} token={data.token} bookmarks={data.bookmarks} key={data.token} postId={data.postId}/>)
    }
  })

  return (
    <main className={styles.main} key='homeMain'>
      <div className={styles.headerContainer} key='headerContainerHome'>
        <Header />
      </div>


      <div className={styles.container} key='bannerHome'>
        <div>
          <p>Banner</p>
        </div>



        <div className={styles.topbarCards} key='topCardBtns'>
          <div className={styles.leftBarCards}>
            btns filter
          </div>

          <div className={styles.rightBarCards} key='modalCreatePost'>
            <CreatePost lang={lang}/>

          </div>
        </div>
            {(loading) ?
            (
            <div className={styles.cardsContainer} key='cardsContainer'>
                  {postsData}
            </div>
            ) : (
              <div className={styles.loadingContainer} key='loadingDog'>
                <img src='https://i.gifer.com/Xqg8.gif' height={300} width={300} />
                <p>Loading.....</p>
              </div>

          )}

        
      </div>
    </main>
  );
}