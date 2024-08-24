import React, { useState } from 'react';
import styles from "./UploadModal.module.css"
import { addFile } from '../redux/FilesReducer';
import { useDispatch } from 'react-redux';
import svg from "../images/plus.svg"

const UploadModal = ({onClose}) => {
    const dispatcher = useDispatch()

        const [droppedFile, setDroppedFile] = useState(null);
        const [isDragging, setIsDragging] = useState(false);
      
        const handleDragOver = (event) => {
          event.preventDefault(); 
        };
      
        const handleDragEnter = () => {
          setIsDragging(true);
        };
      
        const handleDragLeave = () => {
          setIsDragging(false);
        };
      
        const handleDrop = (event) => {
          event.preventDefault();
          setIsDragging(false);
      
          if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
            const file = event.dataTransfer.files[0];
            setDroppedFile(file);
            dispatcher(addFile(file))
            onClose()
            event.dataTransfer.clearData();
          }
    };

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
            <div className={styles.content} onClick={(e) => {e.stopPropagation()}}
                 onDragOver={handleDragOver}
                 onDragEnter={handleDragEnter}
                 onDragLeave={handleDragLeave}
                 onDrop={handleDrop}
                 >
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