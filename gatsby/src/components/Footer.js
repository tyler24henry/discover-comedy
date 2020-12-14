import React from 'react';
import styled from 'styled-components';
import { FiTwitter, FiExternalLink, FiGithub } from 'react-icons/fi';

const FooterStyles = styled.footer`
    text-align: center;
    padding: 1rem 0;
    display: grid;
    grid-template-columns: 1fr;
    justify-items: center;
    gap: 0.5rem;
    font-size: 1.3rem;
    .socials {
        font-size: 1.4rem;
        display: flex;
        gap: 2rem;
        align-items: center;
        a {
            color: #9da8c7;
            transition: all 0.4s;
            &:hover {
                transform: translateY(-4px);
            }
        }
    }
`;

export const Footer = () => {
    return (
        <FooterStyles>
            <div className="socials">
                <a href="https://www.twitter.com/ty24henry" target="_blank"><FiTwitter /></a>
                <a href="http://www.tylerhenry.blog" target="_blank"><FiExternalLink /></a>
                <a href="https://github.com/tyler24henry" target="_blank"><FiGithub /></a>
            </div>
            <p>Designed by Dylan Henry &bull; Built by Tyler Henry</p>
        </FooterStyles>
    )
}
