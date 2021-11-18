import React from 'react'
import { Link } from "react-router-dom"
import s from "./styles/Navbarlink.module.scss"
interface Props{
    title: string;
    path : string;
}

const Navbarlink : React.FC<Props> = ({ title, path }) => {
    return (
        <span className={s.container}>
            {
                path.startsWith("http://") || path.startsWith("https://")?
                <a href={path} className={s.link}>
                    <h4 className={s.title}>{title}</h4>
                </a>:            
                <Link to={path} className={s.link}>
                    <h4 className={s.title}>{title}</h4>
                </Link>
            }

        </span>
    )
}

export default Navbarlink
