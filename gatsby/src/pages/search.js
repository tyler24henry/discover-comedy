import React from 'react';
import { graphql } from 'gatsby';
import { ComedianList } from '../components/ComedianList';
import SEO from '../components/SEO';

export default function SearchPage({ data, location }) {
    let comedians = data.comedians.nodes;

    let searchTerm = location.search;
    if(searchTerm.length > 3 && searchTerm.charAt(2) === '='){
        searchTerm = searchTerm.slice(3);
    } else {
        searchTerm = null;
    }

    if(searchTerm){
        comedians = comedians.filter(comedian => {
            const regex = new RegExp(searchTerm.toLowerCase());
            const match = regex.test(comedian.firstName.toLowerCase()) || regex.test(comedian.lastName.toLowerCase());
            return match;
        })
    }

    return (
        <>
            <SEO title="Search" />
            <ComedianList comedians={comedians} searchTerm={searchTerm} />
        </>
    )
}

export const query = graphql`
    query searchComedians {
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
            }
        }
    }
`;