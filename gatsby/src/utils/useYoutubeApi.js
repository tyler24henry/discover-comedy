import React, { useState, useEffect } from 'react';

export const useYoutubeApi = (comedian) => {
    const [youtubeVideos, setYoutubeVideos] = useState([]);

    useEffect(() => {
        const getYoutubeChannel = async() => {
            const YOUTUBE_CHANNEL_API = "https://youtube.googleapis.com/youtube/v3/search";
            const res = await fetch(`${YOUTUBE_CHANNEL_API}?part=snippet&maxResults=5&order=date&channelId=${comedian.youtube}&key=${process.env.GATSBY_YOUTUBE_API_KEY}`)
            const body = await res.json();
            if(body && body.items){
                const data = body.items
                    .filter(item => item.id.videoId)
                    .map(item => item);
                setYoutubeVideos(data);
            }
        }
        getYoutubeChannel();

    }, []);

    return {
        youtubeVideos,
    }
}
