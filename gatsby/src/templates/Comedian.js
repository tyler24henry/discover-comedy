import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FiTwitter, FiFacebook, FiInstagram, FiYoutube, FiUser } from 'react-icons/fi';
import { BiArrowBack } from 'react-icons/bi';
import ReactPlayer from 'react-player/lazy'
import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
import { dayMonthCommaYear, dayMonth } from '../utils/dateHelpers';
import { TwitterTimelineEmbed } from 'react-twitter-embed';
import { shuffle } from '../utils/arrayHelpers';
import { useYoutubeApi } from '../utils/useYoutubeApi';
import { useTicketmasterApi } from '../utils/useTicketmasterApi';
import SEO from '../components/SEO';

const ComedianStyles = styled.div`
    position: relative;
   color: #9da8c7;
   .full-description-wrapper {
       z-index: 5;
       position: fixed;
       left: calc(15vw - 10px);
       top: 20vh;
       width: calc(70vw - 80px);
       background: #172a45;
       padding: 3.5rem 4rem 2rem 4rem;
       white-space: pre-wrap;
       .back {
           position: absolute;
           top: 22px;
           left: 10px;
           font-size: 1.6rem;
           color:#ccd6f6;
           transition: all 0.6s;
           &:hover {
               color: #64ffda;
           }
       }
       h2 {
            position: absolute;
            top: 20px;
            left: 40px;
            font-size: 1.6rem;
            text-transform: uppercase;
            color:#ccd6f6;
            padding: 0;
       }
       p {
            font-size: 1.3rem;
            color: #9da8c7;
            line-height: 1.4;
       }
   }
    .wrapper {
        .top {
            position: relative;
            min-height: 460px;
            .background-image {
                width: 100%;
                height: 320px;
                object-fit: cover;
            }
            .comedian-details-grid {
                position: relative;
                width: 90%;
                margin: 0 auto;
                margin-top: -8rem;
                background: #172a45;
                padding: 1.3rem;
                display: grid;
                grid-template-columns: auto 1fr;
                gap: 2.5rem;
                align-items: center;
                font-size: 1.2rem;
                .avatar {
                    width: 130px;
                    height: 130px;
                    object-fit: cover;
                }
                .details {
                    display: grid;
                    grid-template-rows: auto auto 1fr;
                    gap: 1rem;
                    height: 100%;
                    .bio {
                        font-size: 1.3rem;
                        @media(max-width: 730px){
                            display: none;
                        }
                        span {
                            margin-right: 0.4rem;
                        }
                    }
                    .bio-narrow-screen {
                        display: none;
                        @media(max-width: 730px){
                            display: block;
                        }
                        font-size: 1.2rem;
                        span {
                            margin-right: 0.4rem;
                        }
                    }
                    .read-more-btn {
                        padding: 0;
                        transition: all 0.6s;
                        &:hover {
                            color: #64ffda;
                        }
                    }
                    h2 {
                        padding-top: 1rem;
                        font-size: 2rem;
                        font-weight: 600;
                        letter-spacing: 0.1rem;
                        text-transform: uppercase;
                        color:#ccd6f6;
                    }
                    .social {
                        align-self: end;
                        display: flex;
                        gap: 0.8rem;
                        font-size: 1.5rem;
                        a {
                            color: #9da8c7;
                            transition: all 0.6s;
                            &:hover {
                                transform: translateY(-4px);
                                color: #64ffda;
                            }
                        }
                    }
                }
            }
        }
        .body-grid {
            display: grid;
            grid-template-columns: 1fr 1.5fr;
            gap: 4rem;
            @media(max-width: 900px){
                grid-template-columns: 1fr;
                gap: 2rem;
            }
            .left-grid {
                display: grid;
                grid-template-columns: 1fr;
                gap: 2rem;
                padding: 1rem 2rem 2rem 2rem;
                background:#172a45;
            }
            .upcoming-shows {
                width: 100%;
                display: grid;
                grid-template-columns: 1fr 1fr 1fr;
                gap: 1rem;
                justify-items: center;
                background:#172a45;
                a {
                    color: #9da8c7;
                    transition: all 0.6s;
                    &:hover {
                        color: #64ffda;
                    }
                }
                .upcoming-show {
                    width: 100%;
                    overflow-y: hidden;
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 0.5rem;
                    .image-wrapper {
                        position: relative;
                        width: 100%;
                        height: 90px;
                        img {
                            width: 100%;
                            height: 100%;
                        }
                        #date {
                            position: absolute;
                            left: 2px;
                            bottom: 2px;
                            background: #283038;
                            padding: 0.3rem;
                            color: white;
                            font-size: 1.1rem;
                            text-transform: uppercase;
                            border-radius: 2px;
                        }
                    }
                    &:hover {
                        cursor: pointer;
                    }
                    img {
                        width: 100%;
                        object-fit: cover;
                    }
                    #show-details {
                        font-size: 1.2rem;
                        font-weight: 500;
                        word-break: break-word;
                        margin-top: 0.4rem;
                        text-align: center;
                    }
                }
                #no-upcoming-shows {
                    margin-top: 0.3rem;
                    font-size: 1.4rem;
                    text-align: left;
                    justify-self: start;
                    grid-column: 1 / span 4;
                    padding-left: 0.8rem;
                    border-left: 4px solid #9da8c7;
                }
            }
            .twitter-section-wrapper, .soundcloud-section-wrapper {
                width: 100%;
                .twitter-embed-wrapper, .soundcloud-embed-wrapper {
                    width: 100%;
                    height: 350px;
                }
            }
            .soundcloud-section-wrapper {
                align-self: end;
            }
            .section-header {
                padding: 0.8rem 0;
                color: #ccd6f5;
                h2 {
                    font-size: 1.5rem;
                    letter-spacing: 0.1rem;
                }
            }
            .right-grid {
                height: 100%;
                display: grid;
                grid-template-columns: 1fr;
                gap: 2rem;
                .videos-playlist-grid {
                    .selected-video {
                        margin-top: 1rem;
                        padding: 2rem 1.5rem;
                        display: grid;
                        grid-template-columns: 1fr auto;
                        gap: 1rem;
                        background:#172a45;
                        .title {
                            font-size: 1.5rem;
                            color: #ccd6f5;
                        }
                        .date, .description {
                            font-size: 1.2rem;
                        }
                        .description {
                            grid-column: 1 / span 2;
                        }

                    }
                }
                .youtube-playlist, .related-comedians {
                    width: calc(100% - 4rem);
                    display: flex;
                    gap: 1rem;
                    justify-items: center;
                    background:#172a45;
                    padding: 2rem;
                    a {
                        color: #9da8c7;
                        transition: all 0.6s;
                        &:hover {
                            color: #64ffda;
                        }
                    }
                    .youtube-item {
                        width: 100%;
                        overflow-y: hidden;
                        &:hover {
                            cursor: pointer;
                        }
                        img, #related-prof-pic {
                            width: 100%;
                            object-fit: cover;
                        }
                        .video-details {
                            padding-top: 0.1rem;
                        }
                        #title, #show-details {
                            font-size: 1.2rem;
                            font-weight: 500;
                            word-break: break-word;
                            margin-top: 0.4rem;
                            transition: all 0.6s;
                            &:hover {
                                color: #64ffda;
                            }
                        }
                    }
                }
                .related-comedians {
                    display: grid;
                    grid-template-columns: 1fr 1fr 1fr 1fr;
                    justify-items: center;
                }
                .related-comedians {
                    .related-comedian {
                        .image-wrapper {
                            display: grid;
                            grid-template-columns: 1fr;
                            justify-items: center;
                            img {
                                border-radius: 50%;
                                height: 100%;
                                width: 100%;
                            }
                        }
                        #comedian-name {
                            margin-top: 0.5rem;
                            font-size: 1.2rem;
                            font-weight: 500;
                            word-break: break-word;
                        }
                    }
                }
                #comedian-name, #show-details {
                    text-align: center;
                }
            }
        }
    }
    #disabled {
        pointer-events: none;
        cursor: default;
        filter: blur(3px);
        opacity: 0.5;
    }
`;

export default function Comedian({ data }) {
    const [selectedVideoId, setSelectedVideoId] = useState('');
    const [showFullDescription, setShowFullDescription] = useState(false);
    const comedian = data.comedian;
    const comedianId = comedian.id;
    const twitterHref = `https://www.twitter.com/${comedian.twitter}`;
    const instagramHref = `https://www.instagram.com/${comedian.instagram}`;
    const facebookHref = `https://www.facebook.com/${comedian.facebook}`;
    const youtubeHref = `https://www.youtube.com/channel/${comedian.youtube}`;
    const websiteHref = comedian.website;
    const bio = comedian.bio.length > 210 ? `${comedian.bio.slice(0,210)}...` : comedian.bio;
    const bioShortened = comedian.bio.length > 100 ? `${comedian.bio.slice(0,100)}...` : comedian.bio;

    const comedians = data.comedians.nodes;
    const comediansShuffled = shuffle(comedians);

    const embedHeight = '350px';

    const { youtubeVideos } = useYoutubeApi(comedian);
    const { upcomingShows } = useTicketmasterApi(comedian);

    useEffect(() => {
        if(youtubeVideos?.length > 0){
            const videoId = youtubeVideos[0].id.videoId;
            setSelectedVideoId(videoId);
        }
    }, [youtubeVideos]);

    let selectedVideoTitle = '';
    let selectedVideoDate = '';
    let selectedVideoDescription = '';

    if(youtubeVideos){
        const [selectedVideo] = [...youtubeVideos].filter(video => video.id.videoId === selectedVideoId);
    
        if(selectedVideo){
            const regex = /(&)(.*)(;)/s;
            selectedVideoTitle = selectedVideo.snippet.title.length > 75 ? `${selectedVideo.snippet.title.slice(0,75)}...` : selectedVideo.snippet.title;
            selectedVideoTitle = selectedVideoTitle.replace(regex, '');
            selectedVideoDate = dayMonthCommaYear(selectedVideo.snippet.publishedAt);
            selectedVideoDescription = selectedVideo.snippet.description;
            selectedVideoDescription = selectedVideoDescription.replace(regex, '');
        }
    }

    return (
        <>
            <SEO title={`${comedian.firstName} ${comedian.lastName}`} />
            <ComedianStyles>
                {showFullDescription && (
                    <div className="full-description-wrapper">
                        <button type="button" onClick={e => setShowFullDescription(false)}><BiArrowBack className="back" /></button>
                        <h2>About {comedian.firstName} {comedian.lastName}</h2>
                        <p>{comedian.bio}</p>
                    </div>
                )}
                <div className="wrapper" id={showFullDescription ? 'disabled' : ''}>
                    <div className="top">
                        <Img className="background-image" fluid={comedian.bannerPic.asset.fluid} alt="Background image" />
                        <div className="comedian-details-grid">
                            <Img className="avatar" fluid={comedian.profPic.asset.fluid} alt="Comedian avatar" />
                            <div className="details">
                                <h2>{comedian.firstName} {comedian.lastName}</h2>
                                <div className="bio"><span>{bio}</span>
                                    {comedian.bio.length > 210 && <button type="button" className="read-more-btn" onClick={e => setShowFullDescription(true)}>[Read more]</button>}
                                </div>
                                <div className="bio-narrow-screen"><span>{bioShortened}</span>
                                    {comedian.bio.length > 100 && <button type="button" className="read-more-btn" onClick={e => setShowFullDescription(true)}>[Read more]</button>}
                                </div>
                                <div className="social">
                                    {comedian.twitter && (
                                        <a href={twitterHref} target="_blank"><FiTwitter /></a>
                                    )}
                                    {comedian.instagram && (
                                        <a href={instagramHref} target="_blank"><FiInstagram /></a>
                                    )}
                                    {comedian.facebook && (
                                        <a href={facebookHref} target="_blank"><FiFacebook /></a>
                                    )}
                                    {comedian.youtube && (
                                        <a href={youtubeHref} target="_blank"><FiYoutube /></a>
                                    )}
                                    {comedian.website && (
                                        <a href={websiteHref} target="_blank"><FiUser /></a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="body-grid">
                        <div className="left-grid">
                            <div className="upcoming-shows-wrapper">
                                <div className="section-header" id="upcoming-shows-header">  
                                    <h2>Upcoming Shows</h2>
                                </div>
                                {upcomingShows && (
                                    <div className="upcoming-shows">
                                        {upcomingShows.map(show => {
                                            const image = show.images[0].url;
                                            const venueName = show.venues[0].name ? show.venues[0].name : show.venues[0].country.name;
                                            const dateOfShow = dayMonth(show.dates.startDate);
                                            return (
                                                <div className="upcoming-show">
                                                    <div className="image-wrapper">   
                                                        <a href={show.url} target="_blank"><img src={image} alt="Venue thumbnail" /></a>
                                                        <p id="date">{dateOfShow}</p>
                                                    </div>
                                                    <a id="show-details" href={show.url} target="_blank">{venueName}</a>
                                                </div>
                                            )
                                        })}
                                    </div>
                                )}
                                {!upcomingShows && (
                                    <div className="upcoming-shows">
                                        <h2 id="no-upcoming-shows">There are no upcoming shows for {comedian.firstName} {comedian.lastName}.</h2>
                                    </div>
                                )}
                            </div>
                            <div className="twitter-section-wrapper">
                                <div className="section-header"> 
                                    <h2>Tweets</h2>
                                </div>
                                <div className="twitter-embed-wrapper" height={embedHeight}>
                                    <TwitterTimelineEmbed 
                                        sourceType="profile"
                                        id="539487832448843776"
                                        options={{height: embedHeight, width: '100%'}}
                                        noScrollbar
                                        linkColor="#4dc6af"
                                        screenName={comedian.twitter}
                                    />
                                </div>
                            </div>
                            <div className="soundcloud-section-wrapper">
                                <div className="section-header">
                                    <h2>{comedian.soundcloudType}</h2>
                                </div>
                                <div className="soundcloud-embed-wrapper" height={embedHeight}>
                                    <iframe id="sound-cloud-player" style={{border: 'none', height: embedHeight, width: '100%'}} scrolling="no" allow="autoplay" 
                                        src={ `https://w.soundcloud.com/player/?url=${comedian.soundcloudUrl}` }>
                                    </iframe>
                                </div>
                            </div>
                        </div>
                        <div className="right-grid">
                            {youtubeVideos && (
                                <>
                                    <div>
                                        <div className="section-header">  
                                            <h2>Videos</h2>
                                        </div>
                                        <div className="videos-playlist-grid">
                                            <ReactPlayer width="100%" url={`https://www.youtube.com/watch?v=${selectedVideoId}`} />
                                            <div className="selected-video">
                                                <p className="title">{selectedVideoTitle}</p>
                                                <p className="date">{selectedVideoDate}</p>
                                                <p className="description">{selectedVideoDescription}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="section-header" id="related-videos">  
                                            <h2>Related Videos</h2>
                                        </div>
                                        <div className="youtube-playlist">
                                            {[...youtubeVideos].filter(video => video.id.videoId !== selectedVideoId).map((video, index) => {
                                                const videoId = video.id.videoId;
                                                const thumbnail = video.snippet.thumbnails.default.url;
                                                let title = video.snippet.title.length > 35 ? `${video.snippet.title.slice(0,35)}...` : video.snippet.title;
                                                const regex = /(&)(.*)(;)/s;
                                                title = title.replace(regex, '');
                                                return (
                                                    <div className="youtube-item" id={videoId === selectedVideoId ? 'selected' : ''} key={videoId + index} onClick={() => setSelectedVideoId(videoId)}>
                                                        <img src={thumbnail} alt="Video thumbnail" />
                                                        <div className="video-details">
                                                            <p id="title">{title}</p>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </>
                            )}
                            <div>
                                <div className="section-header" id="related-comedians-header">  
                                    <h2>Related Comedians</h2>
                                </div>
                                <div className="related-comedians">
                                    {[...comediansShuffled].filter(comedian => comedian.id !== comedianId).slice(0, 4).map(com => {
                                        return (
                                            <Link className="related-comedian" to={`/comedian/${com.slug.current}`} key={com.id}>
                                                <div className="image-wrapper">
                                                    <Img id="related-comedian" style={{ width: '8vw', height: '8vw'}} fluid={com.profPic.asset.fluid} alt="Comedian thumbnail" />
                                                </div>
                                                <p id="comedian-name">{com.firstName} {com.lastName}</p>
                                            </Link>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ComedianStyles>
        </>
    )
}

export const query = graphql`
  query($slug: String!) {
    comedian: sanityComedian(slug: { current: { eq: $slug } }) {
        id
        firstName
        lastName
        slug {
            current
        }
        profPic {
            asset {
                fluid {
                    ...GatsbySanityImageFluid
                }  
            }
        }
        bio
        bannerPic {
            asset {
                fluid {
                    ...GatsbySanityImageFluid
                }  
            }
        }
        twitter
        instagram
        facebook
        youtube
        website
        soundcloudUrl
        soundcloudType
        joke
        _createdAt
    }
    comedians: allSanityComedian {
        nodes {
            id
            firstName
            lastName
            slug {
                current
            }
            profPic {
                asset {
                    fluid {
                        ...GatsbySanityImageFluid
                    }  
                }
            }
        }
    }
  }
`;