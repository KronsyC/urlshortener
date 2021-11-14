import "./option.css"

const Option = ({title = "TITLE", type="text", onChange, desc=""}) => {
    return (
        <div className="option">
            <h5 className="oTitle">{title}</h5>
            <p className="description">{desc}</p>
            {
                type==="text" ?
                <input type="text" className="textInput" onChange={ onChange } /> :
                type==="number"?
                <input type="slider" className="numberInput" onChange={ onChange } />:
                type==="toggle"?
                <label className="switch">
                    <input type="checkbox" onChange={ onChange } />
                    <span  className="slider"/>
                </label>:
                <input type="text" className="textInput" onChange={ onChange } />
            }
        </div>
    )
}

export default Option
