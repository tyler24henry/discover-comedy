import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export default {
    pathPrefix: '/discover-comedy',
    siteMetadata: {
      title: `Discover Comedy`,
      siteUrl: 'http://www.discover-comedy.com',
      description: `Discover your next favorite comedian.`,
      image: '/favicon.svg',
      twitter: '@ty24henry',
    },
    plugins: [
      'gatsby-plugin-react-helmet',
      'gatsby-plugin-styled-components',
      {
        // this is the name of the plugin you are adding
        resolve: 'gatsby-source-sanity',
        options: {
          projectId: 'baqa90qc',
          dataset: 'production',
          watchMode: true,
          token: process.env.SANITY_TOKEN,
        },
      },
    ],
  };