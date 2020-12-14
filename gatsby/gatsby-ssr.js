import React from 'react';
import Layout from './src/components/Layout';
import { SearchProvider } from './src/components/SearchContext';

export function wrapPageElement({ element, props }) {
  return <Layout {...props}>{element}</Layout>;
}

export function wrapRootElement({ element }) {
  return <SearchProvider>{element}</SearchProvider>
}