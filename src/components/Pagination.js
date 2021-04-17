import classNames from "classnames";

export default function Pagination({ data, setPage, page }) {
    const pages = Math.ceil(data.length / 10);
    return <div className="pg">
        <div onClick={() => setPage(Math.max(0, page - 1))}
            className="pg-i">
            <i className="icon angle left"></i>
        </div>
        {[...Array(pages).keys()].map(f => {
            return <div key={f}
            onClick={() => setPage(f)}
            className={classNames('pg-i', { 'a': f === page })}>{f + 1}</div>
        })}
        <div onClick={() => setPage(Math.min(pages - 1, page + 1))}
            className="pg-i">
            <i className="icon angle right"></i>
        </div>
    </div>
}
