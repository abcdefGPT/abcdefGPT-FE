import styles from "./UserChat.module.css"
import React, { useCallback, useRef } from 'react';
import { Routes, Route, Link, BrowserRouter } from 'react-router-dom'
import LeftInfo from './module/LeftInfo/LeftInfo'
import className from "classnames/bind"
import axios from 'axios'
import { useState, useEffect } from 'react';
import SendBtn from "../images/chevron-right.png"

const cx = className.bind(styles)

function UserChat(props) {
    //임시 사용자 정보
    const personData = {
        "name": "홍길동",
        "departure": "개발1팀",
        "position": "대리"
    }
    /*사용자 Info*/
    const [personInfo, setPersonInfo] = useState(null);
    /*채팅 데이터 */
    const [chatData, setChatData] = useState(null);
    const [responseData, setResponseData] = useState([]);

    const textareaRef = useRef(null);
    const bottomRef = useRef(null);

    /* 텍스트 변화 감지 후 저장 */
    const handleTextChange = (event) => {
        setChatData(event.target.value);
        textareaRef.current.style.height = "0px";
        textareaRef.current.style.height = (textareaRef.current.scrollHeight) + "px";
        bottomRef.current.style.height = "0px";
        bottomRef.current.style.height = (textareaRef.current.scrollHeight + 18) + "px";
    }

    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    })
    /*window 사이즈 가져오기 */
    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize)
        };
    }, []);

    const calculateWidth = `${(windowSize.width - 320)}px`;

    const handleEnterPress = (event) => {
        if (event.key === 'Enter') {
            if (event.shiftKey) {
                event.preventDefault();
                const currentArea = textareaRef.current;
                const startArea = currentArea.selectionStart;
                const endArea = currentArea.selectionEnd;
                console.log(startArea);
                if (startArea == 0) {
                    const newChatData = chatData.substring(0, startArea) + '\n' + chatData.substring(endArea);
                    setChatData(newChatData);
                } else {
                    const newChatData = '\n' + chatData.substring(endArea);
                    setChatData(newChatData);
                }

                setTimeout(() => {
                    currentArea.selectionStart = currentArea.selectionEnd = startArea + 1
                }, 0);

            } else {
                event.preventDefault();
                handleSendClick();
            }
        }
    }


    const handleSendClick = async () => {
        const params = {
            query: chatData
        };

        const newEntry = { query: chatData, data: null, error: null };
        setResponseData(prevResponses => [
            ...prevResponses,
            newEntry
        ]);

        setChatData('');
        try {

            const response = await axios.get('http://127.0.0.1:5000', { params });
            console.log(response.data)
            setResponseData(prevResponses =>
                prevResponses.map(item =>
                    item === newEntry ? { ...item, data: response.data } : item
                )
            )
        }
        catch (error) {
            console.log("error")
        }
    };

    useEffect(() => {
        setPersonInfo(personData);
    }, []);

    if (!personInfo) {
        return <div>Loading...</div>;
    }

    return (
        <div className={cx("container")}>
            <div >
                <LeftInfo personInfo={personInfo} location="AIBot" />
            </div>
            <div className={cx("UserChat")} style={{ width: calculateWidth }}>
                <h1>
                    AI 사수
                </h1>
                <div className={cx("Center")}>
                    <div>
                        <div className={cx("Query")}>
                            <p >Query : jfipjaepofijapofijaoiefjawpoifjjopaifjfeopijafoweijfaopiwefjeafipoaejejapoiefjapoiefjapoiejaejfpaoijepoaijefpoajefpoiaefpefjapoiefjaeif</p>
                        </div>
                        <div className={cx("Response")}>
                            <img alt="test"></img>
                            <div style={{display: "flex", alignItems: "end", marginBottom:""}}>
                            <p style={{marginBottom:"0px"}}>Data: akjenalkefjajefopaijefpoiajpeoifjapoeifjap oiefjapoiejpoaijpfeoiajepfoijapweoifjapoiefjapwoiefjawf</p>
                            <a>#time</a>
                            </div>
                            
                        </div>
                        <div className={cx("Query")}>
                            <p >Query : jfipjaepofijapofijaoiefjawpoifjjopaifjfeopijafoweijfaopiwefjeafipoaejejapoiefjapoiefjapoiejaejfpaoijepoaijefpoajefpoiaefpefjapoiefjaeif</p>
                        </div>
                        <div className={cx("Response")}>
                            <img alt="test"></img>
                            <p >Data: akjenalkefjajefopaijefpoiajpeoifjapoeifjap oiefjapoiejpoaijpfeoiajepfoijapweoifjapoiefjapwoiefjawf</p>
                        </div>
                    </div>

                    {responseData.length > 0 ? (
                        <div>
                            {responseData.map((response, index) => (
                                <div key={index} style={{ marginBottom: '10px' }}>
                                    <div className={cx("Query")}>
                                        <p >Query : {response.query}</p>
                                    </div>
                                    <div className={cx("Response")}>
                                        <p >Data: {response.data ? JSON.stringify(response.data.answer) : 'Fetching...'}</p>
                                    </div>
                                    {response.error && <p className={cx("Response")}>Error : {response.error}</p>}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div></div>
                    )}
                    <div ref={bottomRef} className={cx("InputBox")}>
                        <textarea
                            ref={textareaRef}
                            type="text"
                            onKeyDown={handleEnterPress}
                            value={chatData}
                            onChange={handleTextChange}
                            cols="50"
                            placeholder="Enter text here"></textarea>
                        <button onClick={handleSendClick}>
                            <img src={SendBtn} alt="send"></img>
                        </button>
                    </div>
                </div>



            </div>
        </div>
    );
}

export default UserChat;