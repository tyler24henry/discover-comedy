import { Link } from 'gatsby';
import React, { useContext, useRef } from 'react';
import styled from 'styled-components';
import { BiSearch } from 'react-icons/bi';
import SearchContext from './SearchContext';
import { useNavigate } from "@reach/router"

const NavStyles = styled.nav`
    position: relative;
    width: calc(80vw - 20px);
    height: 30px;
    .wrapper {
        position: fixed;
        top: 0;
        left: calc(10vw - 10px);
        width: calc(80vw - 20px);
        margin: 0 auto;
        padding: 1rem;
        display: grid;
        grid-template-columns: 1fr auto auto auto;
        align-items: center;
        gap: 3rem;
        #site-name {
            font-size: 1.5rem;
            font-weight: 600;
        }
        .link {
            text-transform: uppercase;
            font-size: 1.2rem;
            @media(max-width: 640px){
                display: none;
            }
        }
        .search-wrapper {
            position: relative;
            grid-column: 4 / span 1;
            input[type="text"]{
                background: #172a45;
                border: none;
                border-radius: 15px;
                padding: 0.7rem 2.5rem 0.7rem 1rem;
                width: 115px;
                color: white;
                font-size: 1.3rem;
            }
            .search-icon {
                color: white;
                position: absolute;
                right: 7px;
                top: 5.5px;
                font-weight: 600;
                font-size: 1.7rem;
            }
        }
    }
`;

export const Nav = () => {
    const [search, setSearch] = useContext(SearchContext);
    const searchRef = useRef(null);
    const navigate = useNavigate();

    const isEnterPressed = e => {
        if(e.keyCode === 13){
            navigate(`/search?s=${search}`);
            setSearch('');
            searchRef.current.blur();
        }
    }

    return (
        <NavStyles>
            <div className="wrapper">
                <div>
                    <Link id="site-name" to="/">Discover Comedy</Link>
                </div>
                <Link className="link" to="/about">About</Link>
                <Link className="link" to="/contact">Contact</Link>
                <div className="search-wrapper">
                    <input type="text" ref={searchRef} autoComplete="off" name="search" value={search} onChange={e => setSearch(e.target.value)} onKeyDown={e => isEnterPressed(e)} />
                    <BiSearch className="search-icon" />
                </div>
            </div>
        </NavStyles>
    )
}
