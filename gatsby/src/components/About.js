import React from 'react';
import Img from 'gatsby-image';
import styled from 'styled-components';
import { Link } from 'gatsby';

const AboutStyles = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 30vw;
    gap: 6rem;
    align-items: center;
    .details {
        display: grid;
        grid-template-rows: 1fr auto auto;
        justify-items: center;
        gap: 4rem;
        .about-wrapper {
            align-self: center;
            display: grid;
            grid-template-columns: 1fr;
            h2 {
                text-transform: uppercase;
                font-size: 2.1rem;
                font-weight: 700;
                color:#ccd6f6;
            }
            .about {
                margin-top: 1rem;
            }
        }
        .joke {
            padding: 1rem;
            background: none;
        }
    }
    .comedian-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1rem;
        justify-items: center;
    }
    .avatar {
        width: 30vw;
        height: 30vw;
        object-fit: cover;
        border-radius: 50%;
    }
    p {
        padding: 2rem;
        background: #172a45;
        font-size: 1.4rem;
    }
    .comedian-name {
        text-align: center;
        text-transform: uppercase;
        font-size: 2rem;
        font-weight: 600;
    }
    .joke {
        text-align: center;
    }
    .buy-me-a-coffee {
        background: #172a45;
        width: 190px;
        border-radius: 2px;
        &:hover {
            filter: brightness(120%);
        }
        img {
            padding: 1.5rem 2rem 1rem 2rem;
            width: 150px;
        }
    }
`;

export const About = ({ comedians }) => {
    const random = Math.floor(Math.random() * comedians.length);
    const comedian = comedians[random];
    return (
        <AboutStyles>
            <div className="details">
                <div className="about-wrapper">
                    <h2>About</h2>
                    <p className="about">Discover Comedy is a website created by Tyler and Dylan Henry in 2020.  Its goal is to promote comedians and be a resource for fans of comedy.</p>
                </div>
                <div>
                    <p className="joke">{comedian.joke} - {comedian.firstName} {comedian.lastName}</p>
                </div>
                <a className="buy-me-a-coffee" href="https://www.buymeacoffee.com/tyler24henry" target="_blank"><img src="https://res.cloudinary.com/tyler24henry/image/upload/v1607875031/BMC_logo_wordmark_-_White_i3ooqh.png" alt="Buy Me A Coffee" /></a>
            </div>
            <Link to={`/comedian/${comedian.slug.current}`} className="comedian-grid">
                <Img className="avatar" fluid={comedian.profPic.asset.fluid} alt={`${comedian.firstName} ${comedian.lastName}`} />
                <span className="comedian-name">{comedian.firstName} {comedian.lastName}</span>
            </Link>
        </AboutStyles>
    )
}
