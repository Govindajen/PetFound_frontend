'use client';
import Image from "next/image";
import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";

import langJSON from '../lib/lang.json'
import styles from "../styles/home.module.css";
import PetCard from '../components/Petcard';

import Header from '../components/Header';
import CreatePost from "@/components/newpost";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";


export default function Home(props) {

  const account = useSelector((state) => state.account.value);
  const [threads, setThreads] = useState([''])
  const [lang, setLang] = useState({})

  useEffect( () => {
    fetch('https://pet-found-backend.vercel.app/threads/getall').then( (response) => response.json()).then( (data) => {
      setThreads(data)
    })

    if(account.lang === 'en') {
      setLang(langJSON.EN)
    } else if (account.lang === 'fr') {
      setLang(langJSON.FR)
    }


  }, [])

  const threadsData = threads.map( (data) => {
    if(data) {
      return (<PetCard username={data.user.username} rank={data.user.rank} petname={data.petname} image={data.image} type={data.type} status={data.status} location={data.location} token={data.token} savedby={data.savedby}/>)
    }
  })


  return (
    <main className={styles.main} key={'homeMain'}>
      <div className={styles.headerContainer}>
        <Header />
      </div>


      <div className={styles.container} key='homepage'>
        <div>
          <p>Home page</p>
        </div>



        <div className={styles.topbarCards} key='topCardBtns'>
          <div className={styles.leftBarCards}>
            btns filter
          </div>

          <div className={styles.rightBarCards}>
            <CreatePost lang={lang}/>

          </div>
        </div>
        <div className={styles.cardsContainer} key='cardsContainer'>
          {threadsData}
        </div>

        
      </div>
    </main>
  );
}