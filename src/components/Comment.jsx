import React from 'react';
import styles from "./Comment.module.css"
import avatar from '../images/avatar.png'

const Comment = ({name}) => {
    return (
        <div className={styles.container}>
            <div className={styles.user}>
                <img src={avatar} alt="User" className={styles.userImage}/>
            </div>
            <p className={styles.text}>{name}</p>
        </div>
    );
};

export default Comment;