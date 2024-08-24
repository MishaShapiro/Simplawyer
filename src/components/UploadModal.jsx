import React from 'react';
import styles from "./UploadModal.module.css"
import { addFile } from '../redux/FilesReducer';
import { useDispatch } from 'react-redux';
import svg from "../images/plus.svg"

const UploadModal = ({onClose}) => {
    const dispatcher = useDispatch()

    function handleFileChange (event) {
        const file = event.target.files[0];
        dispatcher(addFile(file))
        onClose()
    }

    return (
        <div className={styles.container} onClick={(e) => {
            e.stopPropagation()
            onClose()
        }}>
            <div className={styles.content} onClick={(e) => {e.stopPropagation()}}>
                <h3>Загрузить</h3>
                <label className={styles.inputfile}> 
                    <input type="file" onChange={handleFileChange} name="file"></input>
                    <p>
                        <img src={svg} alt="plus.svg" height="150px"/>
                        <span className={styles.imageText}>Загрузка документа</span> 
                    </p>
                </label>
                <button onClick={onClose} className={styles.closeButton}>X</button>
            </div>
        </div>
    );
};

export default UploadModal;