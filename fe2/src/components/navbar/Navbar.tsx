import React from 'react'
import s from "./styles/Navbar.module.scss"

const Navbar:React.FC = ({children}) => {
    return (
        <header className={s.navbar}>
            <div className={s.inner}>
                <h1 className={s.title}>Teenie</h1>
                <nav className={s.links}>
                    { children }
                </nav>
            </div>
        </header>
    )
}

export default Navbar
