import React from 'react';
import { graphql, Link } from 'gatsby';

import EnglishIcon from '../icons/united-states.svg';
import SpanishIcon from '../icons/spain.svg';
import widthStyles from '../commons/width.module.sass';
import homesStyle from './home.module.sass';

const EnglishSpan = (
    <span role="img" aria-label="english language">
        <EnglishIcon />
    </span>
);

const SpanishSpan = (
    <span role="img" aria-label="spanish language">
        <SpanishIcon />
    </span>
);

export default ({ data: { allMarkdownRemark: { edges: meetups } } }) => (
    <section className={`${widthStyles.container} ${homesStyle.container}`}>
        <h1>Meetups I participated</h1>

        <ul>
            {meetups.map(({ node: meetup }) => {
                return (
                    <li key={meetup.fields.slug}>
                        <Link to={meetup.fields.slug}>
                            <h3>{meetup.frontmatter.language === 'es' ? SpanishSpan : EnglishSpan } {meetup.frontmatter.title}</h3>
                            <p className={homesStyle.date}>
                                {new Date(meetup.frontmatter.date).toLocaleDateString()}
                            </p>
                        </Link>
                    </li>
                );
            })}
        </ul>
    </section>
);

export const pageQuery = graphql`{
    allMarkdownRemark(
        filter: { frontmatter: { type: { eq: "meetup" } } }
        sort: { fields: frontmatter___date, order: DESC }
    ) {
        edges {
            node {
                frontmatter {
                    title
                    language
                    date
                }
                fields {
                    slug
                }
            }
        }
    }
}`;