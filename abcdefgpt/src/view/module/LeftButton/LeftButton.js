import React from 'react'
import styles from "./LeftButton.module.css"
import className from "classnames/bind"

const cx = className.bind(styles)

const LeftButton = ({text, icon, isActive}) =>{
    const buttonClass = cx('button',{
        blue: isActive,
        default: !isActive,
    });

    return(
        <button className={buttonClass}>
            {icon && (
                <span className={cx("icon")}>
                    <img src={icon} alt='icon'></img>
                </span>
            )}
            {text}
        </button>
    )
}
export default LeftButton