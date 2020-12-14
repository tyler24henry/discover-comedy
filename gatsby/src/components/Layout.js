import React from 'react';
import 'normalize.css';
import { Footer } from './Footer';
import styled from 'styled-components';
import GlobalStyles from '../styles/GlobalStyles';
import Typography from '../styles/Typography';
import { Nav } from './Nav';

const SiteBorderStyles = styled.div`
  width: 80vw;
  margin: 0 auto;
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr auto;
  gap: 6rem;
  a {
    text-decoration: none;
    transition: all 0.6s;
    &:hover {
        text-decoration: none;
        color: #64ffda;
    }
  }
`;

const ContentStyles = styled.div`
  background: #0a1930;
  z-index: 2;
`;

export default function Layout({ children }) {
  return (
    <>
    <GlobalStyles />
    <Typography />
    <SiteBorderStyles>
      <Nav />
      <ContentStyles>
        {children}
      </ContentStyles>
      <Footer />
    </SiteBorderStyles>
    </>
  );
}