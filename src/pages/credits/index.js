import React from 'react';
import { graphql } from 'gatsby';
import { pipe, filter, map } from 'lodash/fp';

import ExtLink from '../../components/ExtLink';
import widthStyles from '../../commons/width.module.sass';
import creditsStyles from './credits.module.sass';

export default ({ data: { allFile: { edges: icons } } }) => {
    const fontAwesomeIcons = pipe(
        map(({ node: { relativePath } }) => relativePath),
        filter(iconName => /.*(solid|brands)\.svg$/i.test(iconName)),
        map(iconName => iconName.replace(/-[a-z]+\.svg$/i, ''))
    )(icons);

    return (
        <section className={`${widthStyles.container} ${creditsStyles.container}`}>
            <div>
                <h1>It's important to say thanks</h1>

                <h3>Main resources</h3>
                <p>Made with <ExtLink href="https://www.gatsbyjs.org">Gatsby</ExtLink> and hosted on <ExtLink href="https://netlify.com">Netlify</ExtLink>.</p>

                <h3>FontAwesome Icons</h3>
                <ul>
                    {fontAwesomeIcons.map(iconName =>
                        <li key={iconName}>
                            <ExtLink href={`https://fontawesome.com/icons/${iconName}`}>
                                {iconName}
                            </ExtLink>
                        </li>
                    )}
                </ul>

                <h3>Flaticon Icons</h3>
                <ul>
                    <li><ExtLink href="https://www.flaticon.com/free-icon/back-to-the-future_86503#term=back%20to%20future&page=1&position=1/">back to future</ExtLink></li>
                    <li><ExtLink href="https://www.flaticon.com/free-icon/horse_114789/">chess horse</ExtLink></li>
                    <li><ExtLink href="https://www.flaticon.com/free-icon/bonsai_1471230#term=bonsai&page=1&position=3/">bonsai</ExtLink></li>
                </ul>
            </div>
        </section>
    );
};

export const pageQuery = graphql`{
    allFile(filter: { extension: { eq: "svg" } }) {
        edges {
            node {
                relativePath
            }
        }
    }
}`;
