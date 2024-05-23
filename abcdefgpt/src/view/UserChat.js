import styles from "./UserChat.module.css"
import React from 'react';
import { Routes, Route, Link, BrowserRouter } from 'react-router-dom'
import LeftInfo from './module/LeftInfo/LeftInfo'
import className from "classnames/bind"
import axios from 'axios'
import { useState, useEffect } from 'react';

const cx = className.bind(styles)

function UserChat(props) {
    const personData = {
        "name": "홍길동",
        "departure": "개발1팀",
        "position": "대리"
    }

    const [personInfo, setPersonInfo] = useState(null);
    const [chatData, setChatData] = useState(null);
    const handleSendClick = async() =>{
        try{
            const response = await axios.post('https://klas.kw.ac.kr',{
                title: 'hello'
            });
            console.log(response.data)
            setChatData(response.data);
        }
        catch(error){
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
            <div className={cx("UserChat")}>
                <button onClick={handleSendClick} className={cx("InputBox")}>userchat test</button>
            </div>
        </div>
    );
}

export default UserChat;