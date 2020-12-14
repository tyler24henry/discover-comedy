import React from 'react';
import { About } from '../components/About';
import SEO from '../components/SEO';
import { graphql } from 'gatsby';

export default function AboutPage({ data }) {
    const comedians = data.comedians.nodes;
    return (
        <>
            <SEO title="About" />
            <About comedians={comedians} />
        </>
    )
}

export const query = graphql`
    query comediansQuery {
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
                joke
            }
        }
    }
`;