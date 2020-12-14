import path from 'path';

async function turnComediansIntoPages({ graphql, actions }) {
    const comedianTemplate = path.resolve('./src/templates/Comedian.js');
    const { data } = await graphql(`
        query {
            comedians: allSanityComedian {
                nodes {
                    id
                    slug {
                        current
                    }
                }
            }
        }
    `);
    data.comedians.nodes.forEach(comedian => {
        actions.createPage({
            path: `comedian/${comedian.slug.current}`,
            component: comedianTemplate,
            context: {
                slug: comedian.slug.current,
            }
        })
    })
}

export async function createPages(params) {
    await Promise.all([
        turnComediansIntoPages(params),
    ]);
}