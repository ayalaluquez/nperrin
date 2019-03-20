const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
const { fmImagesToRelative } = require('gatsby-remark-relative-images');

exports.createPages = async ({ actions, graphql }) => {
    const { createPage } = actions;

    const meetups = await graphql(`{
        allMarkdownRemark(filter: { frontmatter: { type: { eq: "meetup" } } }) {
            edges {
                node {
                    frontmatter {
                        title
                        date
                    }
                    fields {
                        slug
                    }
                    html
                }
            }
        }
    }`);
    meetups.data.allMarkdownRemark.edges.forEach(({ node: meetup }) => {
        const { slug } = meetup.fields;
        console.log(`${slug.replace('/', '')}img`);

        createPage({
            path: slug,
            component: path.resolve('./src/templates/meetup.js'),
            context: {
                title: meetup.frontmatter.title,
                date: meetup.frontmatter.date,
                content: meetup.html,
                imgDirectory: `${slug.replace('/', '')}img`
            }
        });
    });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
    const { createNodeField } = actions;
    fmImagesToRelative(node); // convert image paths for gatsby images

    if(node.internal.type === `MarkdownRemark`) {
        const value = createFilePath({ node, getNode });
        createNodeField({
            name: `slug`,
            node,
            value
        });
    }
};
