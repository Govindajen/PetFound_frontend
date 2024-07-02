'use client';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Link from 'next/link';
import langJSON from '../lib/lang.json'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";


import styles from '../styles/home.module.css';
import styleModal from '../styles/createPost.module.css'

import { Button, Modal } from 'antd';


const CreatePost = ({ lang }) => {

  const account = useSelector((state) => state.account.value);
  
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    
    const showModal = () => {
      setOpen(true);
    };
    
    
    const handleOk = () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setOpen(false);
      }, 3000);
    };


    const handleCancel = () => {
      setOpen(false);
    };



    if (lang.modal) {
      return (
        <>
        <button type="primary" onClick={() => setOpen(true)} className={styles.newPostBtn} key='btnCreatePost'>
            <FontAwesomeIcon icon={faCirclePlus} className={styles.createPostIcon}/> {lang.modal.createPost.btn}
        </button>
        <Modal
          open={open}
          key='Modal'
          title={lang.modal.createPost.titleModal}
          onOk={handleOk}
          onCancel={handleCancel}
          width={1000}
          height={250}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Return
            </Button>,
            <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
              Submit
            </Button>
          ]}
        >

          
        </Modal>
      </>
    );
  } else {
    return (
      <>
        <button type="primary" onClick={() => setOpen(!open)} className={styles.newPostBtn} key='btnCreatePostLoadingProcess'>
            loading...
        </button>
        </>
    )
  }
}

export default CreatePost;