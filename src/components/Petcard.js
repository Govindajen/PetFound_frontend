import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw, faCircleUser, faLocationDot, faTrashCan, faPersonCircleCheck, faBookmark, faIdBadge } from "@fortawesome/free-solid-svg-icons";

import Link from "next/link";
import styles from '../styles/cardstyle.module.css'

import { useSelector } from "react-redux";

export default function PetCart ( props ) {

    const account = useSelector((state) => state.account.value);


    
    return (
        
        <main className={styles.main} key={props.token}>
            <div className={styles.imageContainer} key='cardsImageContainer'>
                <div className={styles.type}>
                    <div className={styles.topType}>
                        <p >
                            {(props.type == "found" ) ?
                            (
                            <span className={styles.found}>Found</span>
                                ) : (
                            <span className={styles.Lost}>Lost</span>
                            )
                            }
                        </p>
                    </div>

                    <div className={styles.centerType} onClick={ () => {window.location.replace(`/profile/${encodeURIComponent(props.username)}`)}}>
                        
                    </div>


                </div>
                <img src={props.image} className={styles.theImage}/>
            </div>

            <div className={styles.cardDescription} key='cardsDesc'>

                <div className={styles.cardDescriptionSection}>
                    <div className={styles.descSectionTop}>
                        <FontAwesomeIcon icon={faPaw} className={styles.cardIcon} />
                    </div>
                    <div className={styles.descTextTop}>
                        <p title="Pet name">
                            {props.petname}
                        </p>
                        <div className={styles.bookmarkDiv}>
                            {(account.username === props.username) ? (
                                <FontAwesomeIcon icon={faTrashCan}  className={styles.bookmarkIcon} title='Delete this post'/>
                            ) : (
                                <>
                                <p>0</p>
                                <FontAwesomeIcon icon={faBookmark}  className={styles.bookmarkIcon} title='Save this post'/>
                                </>
                            )}
                        </div>
                    </div>
                </div>                

                <div className={styles.cardDescriptionSection}>
                    <div className={styles.descSection}>
                        <FontAwesomeIcon icon={faLocationDot} className={styles.cardIcon} />
                    </div>
                    <div className={styles.descText}>
                        <p>
                            {props.location}
                        </p>
                    </div>
                </div>

                <div className={styles.cardDescriptionSection}>
                    <div className={styles.descSection}>
                        <FontAwesomeIcon icon={faCircleUser} className={styles.cardIcon} />
                    </div>
                    <div className={styles.descText}>
                            {(props.rank === 'admin') && 
                            <div className={styles.iconWithUsername}>
                                <Link href={`/profile/${encodeURIComponent(props.username)}`} className={styles.username}>
                                    @{props.username}
                                </Link>
                                <FontAwesomeIcon icon={faIdBadge} className={styles.cardIcon} alt={'Admin'} title="Admin"/> 
                            </div>}
                            {(props.rank === 'association') &&
                            <div className={styles.iconWithUsername}>
                                    <Link href={`/profile/${encodeURIComponent(props.username)}`} className={styles.username}>@{props.username}</Link>
                                    <FontAwesomeIcon icon={faPersonCircleCheck} className={styles.cardIcon} alt={'PublicAdministration'} title="PublicAdministration"/>
                            </div>

                            }
                            {(props.rank === 'user') && 
                            <Link href={`/profile/${encodeURIComponent(props.username)}`} className={styles.username}>
                                @{props.username}
                            </Link>
                            }
                    </div>
                </div>


            </div>

        </main>
    )
}