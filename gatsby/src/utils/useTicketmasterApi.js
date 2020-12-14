import React, { useState, useEffect } from 'react';

export const useTicketmasterApi = (comedian) => {
    const [upcomingShows, setUpcomingShows] = useState(null);

    useEffect(() => {
        const ticketMasterRootUrl = "https://app.ticketmaster.com/discovery/v2/";
        const keyword = `${comedian.firstName.toLowerCase()} ${comedian.lastName.toLowerCase()}`;
        const getTicketMasterChannel = async() => {
            const res = await fetch(`${ticketMasterRootUrl}events.json?keyword=${keyword}&sort=date,asc&size=3&apikey=${process.env.GATSBY_TICKETMASTER_API_KEY}`);
            const body = await res.json();
            const events = body?._embedded?.events;
            if(events){
                const eventsFormatted = events.map(event => {
                    const venues = event._embedded.venues.map(venue => {
                        return {
                            id: venue.id,
                            city: venue.city,
                            country: venue.country,
                            name: venue.name,
                            state: venue.state,
                        }
                    });
                    const dates = {
                        initialStartDate: event.dates.initialStartDate?.localDate,
                        initialStartTime: event.dates.initialStartDate?.localTime,
                        startDate: event.dates.start?.localDate,
                        startTime: event.dates.start?.localTime,
                        status: event.dates.status?.code,
                        dateTBD: event.dates.start?.dateTBD,
                        dateTBA: event.dates.start?.dateTBA,
                    }
                    return {
                        id: event.id,
                        dates,
                        images: event.images,
                        name: event.name,
                        priceRanges: event.priceRanges,
                        url: event.url,
                        pleaseNote: event.pleaseNote,
                        accessibility: event.accessibility,
                        ageRestrictions: event.ageRestrictions,
                        venues,
                    }
                });
                if(eventsFormatted){
                    setUpcomingShows(eventsFormatted);
                }
            }
        }
        getTicketMasterChannel();

    }, []);

    return {
        upcomingShows,
    }
}
