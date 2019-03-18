import React from 'react';
import { graphql, Link } from 'gatsby';
import { times } from 'lodash';

import EnglishIcon from '../icons/united-states.svg';
import SpanishIcon from '../icons/spain.svg';
import MugIcon from '../icons/cup-of-hot-coffee.svg';
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

export default ({ data: { allMarkdownRemark: { edges: posts } } }) => (
    <section className={`${widthStyles.container} ${homesStyle.container}`}>
        <h1>Some of my writings</h1>

        <ul>
            {posts.map(({ node: post }) => {
                const numberOfCafes = Math.ceil(post.timeToRead / 5); // every 5 min a coffee 😱
                const cafes = times(numberOfCafes, (i) =>
                    <span role="img" aria-label="caffee mug" key={i}>
                        <MugIcon />
                    </span>
                );

                return (
                    <li key={post.fields.slug}>
                        <Link to={post.fields.slug}>
                            <h3>{post.frontmatter.language === 'es' ? SpanishSpan : EnglishSpan } {post.frontmatter.title}</h3>
                            <p className={homesStyle.date}>{new Date(post.frontmatter.date).toLocaleDateString()}</p>
                            <p>• Read time: {cafes} <span>{`- ${post.timeToRead} min`}</span></p>
                            <p className={homesStyle.excerpt}>{post.excerpt}</p>
                        </Link>
                    </li>
                );
            })}
        </ul>
    </section>
);

export const pageQuery = graphql `{
    allMarkdownRemark(
        filter: { frontmatter: { type: { eq: "post" } } }
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
                timeToRead
                excerpt
            }
        }
    }
}`;