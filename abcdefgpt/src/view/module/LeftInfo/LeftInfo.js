import React, { useEffect, useState } from 'react';
import styles from "./LeftInfo.module.css"
import className from "classnames/bind"
import Button from '../LeftButton/LeftButton'
import Dashboard from "../../../images/pie-chart.png"
import Task from "../../../images/clipboard.png"
import Organization from "../../../images/organization-chart.png"
import Management from "../../../images/user.png"
import Participation from "../../../images/group.png"
import AIBot from "../../../images/technical-support.png"
import Example from "../../../images/person2.png"



const cx = className.bind(styles)




const LeftInfo = ({ personInfo, location }) => {
    return (
        <div className={cx("LeftInfo")}>
            <div className={cx("LeftTop")}>
                <h2>업무 관리</h2>
                <div className={cx("UserImage")}>
                    <img src={Example} alt='사람 이미지' />
                </div>
                <p className={cx("NamePosition")}>{personInfo.name} {personInfo.position}</p>
                <p className={cx("Departure")}>{personInfo.departure}</p>
            </div>
            <div className={cx("LeftBottom")}>
                <Button text = "대시보드" icon={Dashboard} isActive={location==="Dashboard"}></Button>
                <Button text = "나의 작업" icon={Task}></Button>
                <Button text = "조직" icon={Organization}></Button>
                <Button text = "관리중인 목표" icon={Management}></Button>
                <Button text = "참여중인 목표" icon={Participation}></Button>
                <Button text = "AI 사수" icon={AIBot} isActive={location==="AIBot"}></Button>
            </div>
        </div>
    );
};

export default LeftInfo;