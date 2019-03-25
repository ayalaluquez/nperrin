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
                    <li><ExtLink href="https://www.flaticon.com/free-icon/cup-of-hot-chocolate_15234#term=coffee&page=1&position=9/">coffee cup</ExtLink></li>
                    <li><ExtLink href="https://www.flaticon.com/free-icon/bonsai_1471230/">bonsai</ExtLink></li>
                    <li><ExtLink href="https://www.flaticon.com/free-icon/spain_197593#term=spain&page=1&position=1/">spain flag</ExtLink></li>
                    <li><ExtLink href="https://www.flaticon.com/free-icon/united-states-of-america_197484#term=united%20states&page=1&position=1/">usa flag</ExtLink></li>
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
