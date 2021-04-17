import { createContext, useContext, useEffect, useMemo, useState } from "react";
import moment from 'moment';
import spinner from '../../spinner.gif';
import api from "lib/api";
import Dropdown from "components/Dropdown";
import Datepicker from "components/Datepicker";
import Pagination from "components/Pagination";

function Loading() {
    return <tr className="emp">
        <td colSpan="7">
            <div className="c">
                <img src={spinner} alt="loading" />
            </div>
        </td>
    </tr>
}

function Empty() {
    return <tr className="emp">
        <td colSpan="7">
            <div className="c">
                No Results found for the specified filter
            </div>
        </td>
    </tr>
}

function statusLabel(launch) {
    if(launch.upcoming) return 'Upcoming';
    return launch.launch_success ? 'Success' : 'Failure';
}

function Status({ launch }) {
    const classes = ['st']
    if(launch.upcoming) classes.push('y');
    else classes.push(launch.launch_success ? 'g' : 'r');
    return <div className={classes.join(' ')}>{statusLabel(launch)}</div>
}

function Row({ no, launch }) {
    return <tr>
        <td>{no}</td>
        <td>{moment(launch.launch_date_utc).utc().format('DD MMMM Y HH:mm')}</td>
        {/* <td>{launch.launch_date_utc}</td> */}
        <td>{launch.launch_site.site_name}</td>
        <td>{launch.mission_name}</td>
        <td>{launch.orbit}</td>
        <td><Status launch={launch} /></td>
        <td>{launch.rocket.rocket_name}</td>
    </tr>
}

function Content() {
    const { data, busy, page } = useContext(LaunchContext);
    if(busy) return <Loading />
    if(data.length === 0) return <Empty />
    return data.slice(page * 10, page * 10 + 10).map(launch => {
        const no = data.indexOf(launch) + 1;
        return <Row key={no} no={no} launch={launch} />
    })
}

function Table() {
    return <table className="ui table">
        <thead>
            <tr>
                <th>No:</th>
                <th>Launched (UTC)</th>
                <th>Location</th>
                <th>Mission</th>
                <th>Orbit</th>
                <th>Launch Status</th>
                <th>Rocket</th>
            </tr>
        </thead>
        <tbody>
            <Content />
        </tbody>
    </table>
}

function Toolbar() {
    const { type, setType, time, setTime } = useContext(LaunchContext);
    const dropdownItems = {
        'all': 'All Launches',
        'upcoming': 'Upcoming Launches',
        'success': 'Successful Launches',
        'failed': 'Failed Launches',
    }
    return <div className="tb">
        <div className="tb-l">
            <Datepicker {...{ time, setTime }} />
        </div>
        <Dropdown items={dropdownItems} value={type} setValue={setType} />
    </div>
}

const LaunchContext = createContext();

export default function Launches() {
    const [busy, setBusy] = useState(true);
    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);
    const [type, setType] = useState('all');
    const [time, setTime] = useState([
        moment().subtract(6, 'month').startOf('month').format('YYYY-MM-DD'),
        moment().subtract(1, 'month').endOf('month').format('YYYY-MM-DD'),
        'Past 6 Months',
    ]);
    useEffect(() => {
        setBusy(true);
        const params = time ? '?start=' + time[0] + '&end=' + time[1] : ''
        api('launches' + params).then(rsp => {
            setData(rsp || [])
            setBusy(false);
        })
    }, [time]);
    const filteredData = useMemo(() => data.filter(d => {
        if(type === 'all') return true;
        if(type === 'upcoming') return d.upcoming;
        if(type === 'success') return d.launch_success;
        if(type === 'failed') return !d.launch_success && !d.upcoming;
        return false;
    }).filter(d => {
        if(time) {
            const start = moment(time[0], 'YYYY-MM-DD')
            const end = moment(time[1], 'YYYY-MM-DD')
            return moment(d.launch_date_utc) >= start && moment(d.launch_date_utc) <= end;
        }
        return true;
    }), [data, type, time])
    function changeTime(time) {
        setTime(time);
        setPage(0)
    }
    function changeType(type) {
        setType(type);
        setPage(0);
    }
    return <LaunchContext.Provider value={{ data: filteredData, busy, page, setPage, setType: changeType, type, time, setTime: changeTime }}>
        <div className="ui container">
            <Toolbar />
            <Table />
            <div className="pg-c">
                <Pagination {...{ data: filteredData, setPage, page }} />
            </div>
        </div>
    </LaunchContext.Provider>
}
