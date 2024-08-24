import React, { useEffect, useRef, useState } from 'react';
import styles from "./TextArea.module.css"
import { findDifferences, downloadFile } from "../utils"
import { useDispatch, useSelector } from 'react-redux';
import { incrementChanges, setChangesCount, setCommentsCount } from '../redux/CounterSlice';
import { setComments } from '../redux/Comments';
import { setIsDownload } from '../redux/Download';

const TextArea = () => {

    const dispatcher = useDispatch()
    const file = useSelector((state) => state.files.file)
    const comments = useSelector((state) => state.comments.comments)
    const changes = useSelector((state) => state.counter.changes)
    const download = useSelector((state) => state.download.isDownload)
    
    const ref = useRef(null)

    const [content, setContent] = useState("")
    const [oldContent, setOldContent] = useState("")
    const [fileUrl, setFileUrl] = useState(null);
    const [timeoutId, setTimeoutId] = useState(null)

    const startTimer = (delay) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        const newTimeoutId = setTimeout(() => {
            handleClick()
        }, delay);
        setTimeoutId(newTimeoutId);
    };

    useEffect(() => {
        const iframe = ref.current;

        const setupIframeListeners = () => {
            const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
            const editableDiv = iframeDocument.querySelector('[contenteditable]');
            const style = iframeDocument.querySelector('style')
            style.innerHTML = style.innerHTML + `
                    .add {text-decoration: underline; position: relative; color: darkgreen}
                    .remove {text-decoration: line-through; position: relative; color: darkred}
                    .add[data-title]:hover::after, .remove[data-title]:hover::after {
                        color: black;
                        font-size: 12px;
                        padding: 3px;
                        border-radius: 5px;
                        content: attr(data-title);
                        position: absolute;
                        top: -100%;
                        left: 0;
                        z-index: 100;
                        background-color: #acacac;
                        width: 250px;`
        
            if (editableDiv) {
                editableDiv.addEventListener('input', () => {setContent(editableDiv.innerHTML)});
            } else {
                const body = iframeDocument.querySelector('body')
                body.setAttribute("contenteditable", true)
                body.addEventListener('input', () => {setContent(body.innerHTML)});
            }
        };
            
        const onIframeLoad = () => {
          setupIframeListeners();
        };

        iframe.addEventListener('load', onIframeLoad);
        return () => {
          iframe.removeEventListener('load', onIframeLoad);
        };
      }, []);

    useEffect(() => {
        const mockData = `<head>
        <meta charset="UTF-8" />
            <title>title</title>
            <style>
                p {font-size: 1.3333rem;font-family: var(--ff4);margin-bottom:0.800rem;}
                .c1p1 {font-size: 2rem; font-weight: bold;}
                .c1c11 {margin-left:0.000rem;}
                .c1c11>tbody>tr>td {padding: 0.000rem 0 0.000rem 0.720rem;}
                table {margin-left:0.000rem;}
                table>tbody>tr>td {padding: 0.000rem 0 0.000rem 0.720rem;}
                .c1c16 {font-size: max(var(--fscale), 1.067rem);}
                .c1c18 {font-size: max(var(--fscale), 1.067rem);}
                .c1c22 {color:#FF0000;}
                .c1c23 {font-style: italic;}
            </style>
        </head>
        <body contenteditable="false">
            
        </body>`
        const doc = ref.current.contentDocument
        doc.open();
        doc.write(mockData);
        doc.close();

        const editableDiv = doc.querySelector('[contenteditable]');
        setOldContent(editableDiv.innerHTML)
        setContent(editableDiv.innerHTML)
    }, [])

    function handleClick() {
        console.log("OLD:", oldContent, "CONT", content)
        if (content !== oldContent) {
            dispatcher(incrementChanges())
            const text = findDifferences(oldContent, content)
        
            const doc = ref.current.contentDocument
            const editableDiv = doc.querySelector('[contenteditable]');
            editableDiv.innerHTML = text
            setOldContent(editableDiv.innerHTML)
            setContent(editableDiv.innerHTML)
        }
    }

    useEffect(() => {
        if (file) {
            const url = URL.createObjectURL(file);
            setFileUrl(url)
            const reader = new FileReader();

            reader.onload = (e) => {
                const content = e.target.result;

                const parser = new DOMParser();
                const doc = parser.parseFromString(content, "text/html");

                const bodyContent = doc.body.innerHTML;
                dispatcher(setChangesCount(+doc.body.getAttribute("changes")))
                const commentsFromAttribute = JSON.parse(doc.body.getAttribute("comments"))
                dispatcher(setComments(commentsFromAttribute))
                dispatcher(setCommentsCount(commentsFromAttribute ? commentsFromAttribute.length : 0))
                setOldContent(bodyContent);
                setContent(bodyContent)
            };

            reader.readAsText(file)
        }
    }, [file])

    useEffect(() => {
        if (download) {
            downloadFile(ref.current, changes, comments)
            dispatcher(setIsDownload(false))
        }
    }, [download])

    useEffect(() => {
        startTimer(1000)

        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [content])

    return (
        <div className={styles.iframeWrapper}>
            <iframe className={styles.iframe} ref={ref} src={fileUrl}></iframe>
        </div>
    );
};

export default TextArea;