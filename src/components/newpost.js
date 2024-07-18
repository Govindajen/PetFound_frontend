'use client';
import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';

import AvatarEditor from "react-avatar-editor";

import Link from 'next/link';
import langJSON from '../lib/lang.json'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";


import stylesHome from '../styles/home.module.css';
import styles from '../styles/createPost.module.css'


import { Button, Modal } from 'antd';


const CreatePost = ({ lang }) => {

  const account = useSelector((state) => state.account.value);
  const editorRef = useRef(null);
  
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const [petName, setPetName] = useState('');
    const [location, setLocation] = useState({postalCode: 0, km: 0});
    const [create, setCreate] = useState(0);
    const [inDate, setInDate] = useState(0);
    const [category, setCategory] = useState('found');
    const [petType, setPetType] = useState(undefined);
    const [imageUrl, setImageUrl] = useState('');

    const aboutPet = {
      petName: petName,
      location: location,
      create: create,
      inDate: inDate,
      category: category,
      petType: petType,
      imageUrl: imageUrl
    }


    
    const showModal = () => {
      if(account.username) {
        setOpen(true);
      } else {
        window.location.replace("/login");
      }
    };
    
    
    const handleOk = () => {
      console.log(aboutPet)

      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setOpen(false);
      }, 3000);
    };


    const handleCancel = () => {
      setOpen(false);
    };

  /* ------------------------------------------------- INPUT PHOTO -------------------------- */

  const [image, setImage] = useState('');
  const [scale, setScale] = useState(1);
  const handleImageChange = (e) => {

    setImage(e.target.files[0]);

  };

  const handleScaleChange = (e) => {
    setScale(parseFloat(e.target.value));
  };


/* ------------------------------------------------------------------------------------------------ CLOUDINARY */
const uploadToCloudinary = async (imageBlob) => {
    const url = `https://api.cloudinary.com/v1_1/dokf5bxju/image/upload`;
    const formData = new FormData();
    formData.append('file', imageBlob);
    formData.append('public_id', account.token)
    formData.append('upload_preset', 'petfound_profileImage'); // Use your actual unsigned upload preset

    try {
      const response = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Upload failed:', error);
      throw error;
    }

};

const handleUpload = async () => {


  if(image !== '') {
    if (editorRef.current) {
      const canvas = editorRef.current.getImage().toDataURL('image/png');
      const response = await fetch(canvas);
      const blob = await response.blob();

      try {
        const uploadResult = await uploadToCloudinary(blob);
          setImageUrl(uploadResult.url)

      } catch (error) {
        console.error('Upload failed:', error);
      }
    }
  }
};

/* ------------------------------------------------------------------------------------------------ ^^^^^^ CLOUDINARY */






    if (lang.modal) {
      return (
        <>
        <button type="primary" onClick={() => showModal()} className={stylesHome.newPostBtn} key='btnCreatePost'>
            <FontAwesomeIcon icon={faCirclePlus} className={stylesHome.createPostIcon}/> {lang.modal.createPost.btn}
        </button>
        <Modal
          open={open}
          key='ModalPost'
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
        <div className={styles.main}  key='internalModalCreatePost'>
          <div className={styles.photoContainer}>

            <AvatarEditor
              ref={editorRef}
              image={image}
              width={240}
              height={325}
              border={20}
              scale={scale}
              borderRadius={0}
              color={[255, 255, 255, 0.6]} // RGBA
              />
            <input type="file" onChange={handleImageChange} name="avatar" accept="image/png, image/jpeg" className={styles.inputImage} />
            <label>
              Scale:
              <input
                type="range"
                min="1"
                max="3"
                step="0.1"
                value={scale}
                onChange={handleScaleChange}
                />
            </label>
          </div>

          <div className={styles.inputArea}>
            <h2>{lang.modal.createPost.titleInformations}</h2>
            <div className={styles.inputContainer}>
              
              <div className={styles.subInputContainer}>
                <label className={styles.inputLabel}><span>{lang.modal.createPost.petname}</span>
                </label>
                  <input type='text' placeholder='Baguette' 
                              onChange={(e) => setPetName(e.target.value)} value={petName} 
                              className={styles.inputs}/>
              </div>

              <div className={styles.subInputContainer}>
                <label className={styles.inputLabel}><span>{lang.modal.createPost.location}</span>
                </label>
                <div style={{'display': 'flex', 'flexDirection': 'column'}}>
                  <span>
                  {lang.modal.createPost.postalCode}
                  <input type='text'
                              onChange={({ target: { value } }) => setLocation({...location, postalCode: value})}
                              value={location.postalCode}
                              className={styles.numberInput}/>
                  </span>  
                  <span>
                     {lang.modal.createPost.km}
                  <input type='number'
                              onChange={({ target: { value } }) => setLocation({...location, km: value})} min='0' max='25'
                              value={location.km}
                              className={styles.numberInput}/>
                  </span>

                </div>
              </div>

              <div className={styles.subInputContainer}>
                <label className={styles.inputLabel}><span>{lang.modal.createPost.category}</span>
                </label>
                  <select id="pet-select" className={styles.selectInput} onChange={ (e) => setCategory(e.target.value)}>
                              <option value="found">{lang.modal.createPost.found}</option>
                              <option value="lost">{lang.modal.createPost.lost}</option>
                          </select>
              </div>

              <div className={styles.subInputContainer}>
                <label className={styles.inputLabel}><span>{(category == "lost") ? lang.modal.createPost.lost : lang.modal.createPost.found} {lang.modal.createPost.inDate}</span>
                </label>
                  <input type='date' placeholder='Baguette' 
                              onChange={(e) => setCreate(e.target.value)} value={create} 
                              className={styles.inputs}/>
              </div>

              <div className={styles.subInputContainer}>
                <label className={styles.inputLabel}><span>{lang.modal.createPost.petType}</span>
                </label>
                  <select id="pet-select" className={styles.selectInput} onChange={ (e) => setPetType(e.target.value)}>
                              <option value="null">- ?? -</option>
                              <option value="dog">{lang.modal.createPost.type.dog}</option>
                              <option value="cat">{lang.modal.createPost.type.cat}</option>
                              <option value="rabbit">{lang.modal.createPost.type.rabbit}</option>
                              <option value="bird">{lang.modal.createPost.type.bird}</option>
                          </select>
              </div>

            </div>
          </div>

        </div>

          
        </Modal>
      </>
    );
  } else {
    return (
      <>
        <button type="primary" onClick={() => setOpen(!open)} className={stylesHome.newPostBtn} key='btnCreatePostLoadingProcess'>
            loading...
        </button>
        </>
    )
  }
}

export default CreatePost;