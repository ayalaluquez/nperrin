import React from 'react';
import { Link, StaticQuery, graphql } from 'gatsby';
import { difference } from 'lodash';
import { pipe, map } from 'lodash/fp';

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

const renderLinks = (links, excludedLinks, onHideSideMenu) => pipe(
    map(({ node: { path } }) => path),
    arr => difference(arr, excludedLinks),
    map(link =>
        <Link to={link} activeStyle={activeStyle} onClick={onHideSideMenu} key={link}>
            {link.replace(/^\/(.*)\/$/, '$1')}
        </Link>
    )
)(links);

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
                                {renderLinks(
                                    data.allSitePage.edges,
                                    data.site.siteMetadata.excludedLinks,
                                    onHideSideMenu
                                )}
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
            excludedLinks
        }
    }

    allSitePage(filter: { path: { regex: "/^\/[0-9a-z-]+\/$/i" } }) {
        edges {
            node {
                path
            }
        }
    }
}`;
