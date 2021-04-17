import { useState } from "react";

export default function Dropdown({ value, setValue, items }) {
    const [active, setActive] = useState(false);
    return <div className={'ui dropdown'} onClick={() => setActive(!active)}>
        <div className="text">{items[value]}</div>
        <i className="angle down icon" />
        <div className={'menu'} style={{ display: active ? 'block' : null }}>
            {Object.keys(items).map(k => <div key={k}
                className="item"
                onClick={() => setValue(k)}>{items[k]}</div>)}
        </div>
    </div>
}