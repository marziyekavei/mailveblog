import { formatDistanceToNow } from 'date-fns-jalali';

const ShowTime = ({ timestamp }) => {
    if (!timestamp || isNaN(new Date(timestamp))) {
        console.error("Invalid timestamp:", timestamp);
        return <span>تاریخ نامعتبر</span>;
    }

    const timeAgo = formatDistanceToNow(new Date(timestamp));

    return (
        <span>
            {timeAgo} پیش  &nbsp;
        </span>
    );
};

export default ShowTime;
