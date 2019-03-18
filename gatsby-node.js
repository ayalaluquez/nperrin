const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
const { fmImagesToRelative } = require('gatsby-remark-relative-images');

exports.createPages = async ({ actions, graphql }) => {
    const { createPage } = actions;

    const posts = await graphql(`{
        allMarkdownRemark(filter: { frontmatter: { type: { eq: "post" } } }) {
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
    posts.data.allMarkdownRemark.edges.forEach(({ node: post }) => {
        createPage({
            path: post.fields.slug,
            component: path.resolve('./src/templates/post.js'),
            context: {
                title: post.frontmatter.title,
                date: post.frontmatter.date,
                content: post.html
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
