import React from 'react';
import Img from 'gatsby-image';
import { StaticQuery, graphql } from 'gatsby';

const renderImage = ({ node }) => (
    <Img
        fluid={node.childImageSharp.fluid}
        style={node.extension === 'png' ? {objectFit: 'contain'} : null}
    />
);

export default ({ src }) => (
    <StaticQuery
        query={graphql`
            query {
                images: allFile(filter:{ extension: { regex: "/jpeg|jpg|png|gif/"}}) {
                    edges {
                        node {
                            extension
                            relativePath
                            childImageSharp {
                                fluid(maxWidth: 1000) {
                                    ...GatsbyImageSharpFluid
                                }
                            }
                        }
                    }
                }
            }
        `}
        render={({ images }) => renderImage(
            images.edges.find(({ node }) =>
                node.relativePath === src.replace(/\/img\//, '')
            )
        )}
    />
);
