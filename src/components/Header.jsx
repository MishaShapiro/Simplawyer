import React, { useState } from 'react';
import styles from "./Header.module.css"
import logo from "../images/logo-simplawyer-one.png"
import { useDispatch, useSelector } from 'react-redux';
import { createPortal } from 'react-dom';
import UploadModal from './UploadModal';
import { setIsDownload } from '../redux/Download';

const Header = () => {

    const dispatcher = useDispatch()

    const changes = useSelector((state) => state.counter.changes)
    const comments = useSelector((state) => state.counter.comments)

    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className={styles.container}>
            <div className={styles.imageWrapper}>
                <img src={logo} alt="" className={styles.logo}/>
            </div>
            <div className={styles.buttonWrapper}>
                <button className={styles.button} onClick={() => {setIsOpen(true)}}>Открыть</button>
                <button className={styles.button} onClick={() => {dispatcher(setIsDownload(true))}}>Сохранить</button>
            </div>
            <div className={styles.infoWrapper}>
                <p className={styles.info}>Количество правок: {changes}</p>
                <p className={styles.info}>Количество комментариев: {comments}</p>
            </div>
            {isOpen && createPortal(
                <UploadModal onClose={() => setIsOpen(false)} />,
            document.body
      )}
        </div>
    );
};

export default Header;