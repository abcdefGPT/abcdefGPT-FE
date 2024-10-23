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
                <Button text = "AI 어시스턴트" icon={AIBot} isActive={location==="AIBot"}></Button>
            </div>
        </div>
    );
};

export default LeftInfo;