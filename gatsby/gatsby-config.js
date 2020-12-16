import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export default {
    pathPrefix: '/discover-comedy',
    siteMetadata: {
      title: `Discover Comedy`,
      siteUrl: 'https://discovercomedy.netlify.app/',
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
      {
        resolve: `gatsby-plugin-google-analytics`,
        options: {
          trackingId: 'UA-142485528-9',
        },
      },
      {
        resolve: `gatsby-plugin-hotjar`,
        options: {
          includeInDevelopment: true, // optional parameter to include script in development
          id: 2159087,
          sv: 6,
        },
      },
      {
        resolve: `gatsby-plugin-disqus`,
        options: {
          shortname: `discover-comedy`
        }
      },
    ],
  };