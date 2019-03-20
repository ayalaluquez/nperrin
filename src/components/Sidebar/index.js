import React from 'react';
import { Link, StaticQuery, graphql } from 'gatsby';
import { map } from 'lodash'

import IconButton from '../IconButton';
import ExtLink from '../ExtLink';

import BonsaiIcon from '../../icons/bonsai.svg';
import HamburgerIcon from '../../icons/hamburger-solid.svg';
import GithubIcon from '../../icons/github-brands.svg';
import './sidebar.sass';

const activeStyle = {
    color: '#000',
    textDecoration: 'underline'
};

const renderLinks = (nodes, onHideSideMenu) => map(nodes, ({ node: {
    frontmatter: { title },
    fields: { slug }
}}) => (
    <Link to={slug} activeStyle={activeStyle} onClick={onHideSideMenu} key={slug}>
        {title}
    </Link>
));

export default ({ show, onHideSideMenu }) => (
    <StaticQuery
        query={sidebarQuery}
        render={data => (
            <>
                {show && <div className="sidebar-shadow" onClick={onHideSideMenu} />}
                <div className={`sidebar ${show ? 'opened' : ''}`}>
                    <IconButton description="close menu" onClick={onHideSideMenu} disabled={!show} className="sidebar-icon">
                        <HamburgerIcon />
                    </IconButton>
                    {/* to don't allow focus when component is hidden */}
                    {show && (
                        <>
                            <nav>
                                <Link to="/" activeStyle={activeStyle} onClick={onHideSideMenu}>home</Link>
                                <div className="postLinks">
                                    {renderLinks(
                                        data.allMarkdownRemark.edges,
                                        onHideSideMenu
                                    )}
                                </div>
                                <ExtLink href={data.site.siteMetadata.source}>
                                    <span role="img" aria-label="see the code">
                                        <GithubIcon />
                                    </span>
                                </ExtLink>
                            </nav>
                            <ExtLink href={data.site.siteMetadata.rootHost} className="rootIcon">
                                <span role="img" aria-label="magic bonsai to return to the root page">
                                    <BonsaiIcon />
                                </span>
                            </ExtLink>
                        </>
                    )}
                </div>
            </>
        )}
    />
);

const sidebarQuery = graphql`{
    site {
        siteMetadata {
            rootHost
            source
        }
    }

    allMarkdownRemark(filter: { frontmatter: { type: { eq: "meetup" } } }) {
        edges {
            node {
                frontmatter {
                    title
                }
                fields {
                    slug
                }
            }
        }
    }
}`;
