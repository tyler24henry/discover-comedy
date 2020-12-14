import { formatDistance, format } from 'date-fns';

export const timeSince = createdAt => {
    const year = parseInt(createdAt.slice(0,4));
    const month = parseInt(createdAt.slice(5,7)) - 1;
    const day = parseInt(createdAt.slice(8, 10));
    const hour = parseInt(createdAt.slice(11,13)) - 4;
    const minute = parseInt(createdAt.slice(14, 16));

    const date = new Date(year, month, day, hour, minute);
    let formattedCreatedAt = formatDistance(date, Date.now());
    return formattedCreatedAt;
}

export const dayMonthCommaYear = createdAt => {
    const year = parseInt(createdAt.slice(0,4));
    const month = parseInt(createdAt.slice(5,7)) - 1;
    const day = parseInt(createdAt.slice(8, 10));
    const hour = parseInt(createdAt.slice(11,13)) - 4;
    const minute = parseInt(createdAt.slice(14, 16));

    const date = new Date(year, month, day, hour, minute);
    let formattedCreatedAt = format(date, 'MMM do, yyyy');
    return formattedCreatedAt;
}

export const dayMonth = createdAt => {
    const year = parseInt(createdAt.slice(0,4));
    const month = parseInt(createdAt.slice(5,7)) - 1;
    const day = parseInt(createdAt.slice(8, 10));

    const date = new Date(year, month, day);
    let formattedCreatedAt = format(date, 'MMM do');
    return formattedCreatedAt;
}