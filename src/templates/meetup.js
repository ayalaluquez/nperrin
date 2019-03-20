import React from 'react';
import { graphql } from 'gatsby';

import { HTMLContent } from '../components/Content';
import widthStyles from '../commons/width.module.sass';
import meetupStyles from './meetup.module.sass';
import Photos from '../components/Photos';

export default ({
    pageContext: { title, date, content },
    data: { allFile: { edges: images } }
}) => {
    const photos = images.map(
        ({ node: { childImageSharp: { fluid }, publicURL } }) => ({
            fluid,
            url: publicURL
        })
    );

    return (
        <section className={`${widthStyles.container} ${meetupStyles.container}`}>
            <h1>{title}</h1>

            <p className={meetupStyles.date}>{new Date(date).toLocaleDateString()}</p>
            <HTMLContent content={content} />

            <h3>Photos of the event</h3>
            <Photos images={photos} />
        </section>
    );
};

export const pageQuery = graphql`
    query meetupQuery($imgDirectory: String!) {
        allFile(filter: { relativeDirectory: { eq: $imgDirectory } }) {
            edges {
                node {
                    publicURL
                    childImageSharp {
                        fluid(maxWidth: 1000) {
                            ...GatsbyImageSharpFluid
                        }
                    }
                }
            }
        }
    }
`;