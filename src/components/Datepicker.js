import moment from 'moment';
import $ from 'jquery';
import 'daterangepicker';
import 'daterangepicker/daterangepicker.css'
import { useEffect, useRef } from 'react';

export default function Datepicker({ setTime, time }) {
    const ref = useRef();
    useEffect(() => {
        $(ref.current).daterangepicker({
            ranges: {
                'Past week': [moment().subtract(1, 'week').startOf('week'), moment().subtract(1, 'week').endOf('week')],
                'Past Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
                'Past 3 Months': [moment().subtract(3, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
                'Past 6 Months': [moment().subtract(6, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
                'Past year': [moment().subtract(1, 'year').startOf('year'), moment().subtract(1, 'year').endOf('year')],
                'Past 2 years': [moment().subtract(2, 'year').startOf('year'), moment().subtract(1, 'year').endOf('year')],
            },
            alwaysShowCalendars: true,
        }, function(start, end, label) {
            setTime([start.format('YYYY-MM-DD'), end.format('YYYY-MM-DD'), label]);
        });
        return () => $('.daterangepicker').remove();
    }, [setTime]);
    return <div ref={ref}>
        <div className="text">{time[2]} <i className="angle down icon" /></div>
    </div>
}