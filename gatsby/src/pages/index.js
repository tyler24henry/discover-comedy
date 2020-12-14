import React from 'react';
import { graphql } from 'gatsby';
import { ComedianList } from '../components/ComedianList';
import SEO from '../components/SEO';

export default function HomePage({ data }) {
    let comedians = data.comedians.nodes;

    return (
        <>
            <SEO title="Home" />
            <ComedianList comedians={comedians} />
        </>
    )
}

export const query = graphql`
    query allComedians {
        comedians: allSanityComedian(sort: {fields: lastName}) {
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
        }
    }
`;