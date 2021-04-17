import { useEffect, useRef, useState } from "react";

export default function Dropdown({ value, setValue, items }) {
    const ref = useRef();
    const [active, setActive] = useState(false);
    useEffect(() => {
        const listener = (e) => {
            if(!ref.current.contains(e.target)) setActive(false);
        }
        document.addEventListener('click', listener);
        return () => document.removeEventListener('click', listener);
    }, []);
    return <div className={'ui dropdown'} onClick={() => setActive(!active)} ref={ref}>
        <div className="text">{items[value]}</div>
        <i className="angle down icon" />
        <div className={'menu'} style={{ display: active ? 'block' : null }}>
            {Object.keys(items).map(k => <div key={k}
                className="item"
                onClick={() => setValue(k)}>{items[k]}</div>)}
        </div>
    </div>
}