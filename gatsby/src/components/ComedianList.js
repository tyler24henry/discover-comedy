import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import Img from 'gatsby-image';
import { BiSearch } from 'react-icons/bi';

const ComedianListStyles = styled.div`
    .wrapper {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(15vw, 1fr));
        gap: 2rem 1rem;
        @media (max-width: 800px){
            grid-template-columns: repeat(auto-fill, minmax(25vw, 1fr));
        }
        .comedian-wrapper {
            position: relative;
            width: min(15vw, 25vw);
            height: min(15vw, 25vw);
            border-radius: 4px;
            border: 2px solid #0a1930;
            transition: all 0.6s;
            @media (max-width: 800px){
                width: min(25vw, 30vw);
                height: min(25vw, 30vw);
            }
            &:hover {
                border: 2px solid #64ffda;
            }
            .image {
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: 2px;
            }
            .comedian-name-wrapper {
                position: absolute;
                left: 2px;
                bottom: 2px;
                display: flex;
                flex-wrap: wrap;
                span {
                    background: #283038;
                    padding: 0.3rem;
                    font-size: 1.2rem;
                    text-transform: uppercase;
                }
            }
        }
    }
    .no-comedians-found {
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 1rem;
        align-items: center;
        .search-icon {
            font-size: 2rem;
        }
        h2 {
            font-size: 1.8rem;
            padding: 1rem;
            background: #172a45;
        }
    }
`;

export const ComedianList = ({ comedians, searchTerm }) => {
    const isComedians = comedians.length > 0;
    return (
        <ComedianListStyles>
            <div className="wrapper">
                {comedians.map(comedian => {
                    return (
                        <Link to={`/comedian/${comedian.slug.current}`} className="comedian-wrapper" key={comedian.id}>
                            <Img className="image" fluid={comedian.profPic.asset.fluid} alt={`${comedian.firstName} ${comedian.lastName}`} />
                            <div className="comedian-name-wrapper">
                                <span>{comedian.firstName}</span>
                                <span>{comedian.lastName}</span>
                            </div>
                        </Link>
                    )
                })}
            </div>
            {!isComedians && (
                <div className="no-comedians-found">
                    <BiSearch className="search-icon" />
                    <h2>No comedians found{searchTerm ? ` for keyword "${searchTerm}"` : ''}!</h2>
                </div>
            )}
        </ComedianListStyles>
    )
}
