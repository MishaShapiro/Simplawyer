import React, { useState } from 'react';
import styles from "./Comments.module.css"
import { useDispatch, useSelector } from 'react-redux';
import { addComment } from '../redux/Comments';
import { incrementComments } from '../redux/CounterSlice';
import Comment from './Comment';
import avatar from '../images/avatar.png'

const Comments = () => {

    const [text, setText] = useState("")
    const dispatcher = useDispatch()
    const comments = useSelector((state) => state.comments.comments)
    const file = useSelector((state) => state.files.file)

    function handleClick () {
        dispatcher(addComment(text))
        setText("")
        dispatcher(incrementComments())
    }

    return (
        <div className={styles.container}>
            <p className={styles.text}>Комментарии</p>
            <div className={styles.commentWrapper}>
                <div className={styles.user}>
                    <img src={avatar} alt="User" className={styles.userImage}/>
                </div>
                <textarea name="" id="" disabled={!file} placeholder='Написать сообщение' value={text} className={styles.textarea} onChange={(e) => {setText(e.target.value)}}></textarea>
                {text && 
                <div className={styles.buttons}>
                    <button className={styles.sendButton} onClick={handleClick}>Отправить</button>
                    <button className={styles.deleteButton} onClick={() => {setText("")}}>x</button>
                </div>
                }
            </div>
            <div className={styles.allComments}>
                {comments &&
                comments.map((comment) => {
                    return <Comment name={comment}/>
                })}
            </div>
        </div>
    );
};

export default Comments;