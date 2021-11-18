import React, { useState } from 'react'
import s from "./styles/Home.module.scss"

const Home = () => {
    const [ url, setUrl ] = useState("")
    const handleLinkCreate = (e : any) => {
        e.preventDefault()
    }
    return (
        <div className={s.page}>
            <section className={s.left}>
                <span className={s.title}>
                    <h2 className={s.name}>Teenie</h2>
                    <h4 className={s.subtext}>Url Shortener</h4>
                </span>
                <form className={s.form} onSubmit={handleLinkCreate}>
                    <input type="text" placeholder="Enter a URL to shorten" className={s.url} onChange={ e => setUrl(e.target.value) } />
                    <input type="submit" className={s.submit} value="Shorten" />
                </form>
            </section>



            <section className={s.right}>
                <div className={s.card}>
                    <h3 className={s.title}>Options</h3>
                    <p>WIP</p>
                </div>
            </section>

        </div>
    )
}

export default Home
