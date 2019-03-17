import React, { Component, cloneElement } from 'react';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';

import Sidebar from '../Sidebar';
import Footer from './Footer';
import Header from './Header';
import '../../commons/all.sass';

class Layout extends Component {
    state = { showSideMenu: false };

    componentDidMount() {
        this.window = window;
    }

    setSideMenu(value) {
        if(value) this.window.document.body.style = 'position: fixed; width: 100%';
        else this.window.document.body.style = '';
        this.setState({ showSideMenu: value });
    }

    render() {
        const { children, location } = this.props;
        const { showSideMenu } = this.state;
        const childrenWithProps = cloneElement(
            children,
            { setSidebarDisplay: value => this.setSideMenu(value) }
        );

        return (
            <StaticQuery
                query={detailsQuery}
                render={({
                    site: { siteMetadata },
                    file: { publicURL: ogImageUrl }
                }) => (
                    <>
                        <Sidebar
                            onHideSideMenu={() => this.setSideMenu(false)}
                            show={showSideMenu}
                            pathname={location.pathname}
                        />
                        <div className="body">
                            <Helmet
                                htmlAttributes={{ lang: 'en' }}
                                titleTemplate={`${siteMetadata.baseTitle} | %s`}
                                title={siteMetadata.title}
                                meta={[
                                    { name: 'description', content: siteMetadata.description },
                                    { name: 'keywords', content: siteMetadata.keywords },
                                    { property: 'og:site_name', content: siteMetadata.title },
                                    { property: 'og:title', content: siteMetadata.title },
                                    { property: 'og:description', content: siteMetadata.description },
                                    { property: 'og:type', content: 'website' },
                                    { property: 'og:image', content: `${siteMetadata.host}${ogImageUrl}` },
                                    { property: 'og:image:type', content: 'image/jpg' },
                                    { property: 'og:url', content: siteMetadata.host },
                                    { name: 'twitter:card', content: 'summary' },
                                    { name: 'twitter:title', content: siteMetadata.title },
                                    { name: 'twitter:description', content: siteMetadata.description },
                                    { name: 'twitter:creator', content: siteMetadata.author },
                                    { name: 'twitter:image', content: ogImageUrl },
                                ]}
                            />
                            <Header
                                onShowSideMenu={() => this.setSideMenu(true)}
                                title={siteMetadata.title}
                            />
                            <main>
                                {childrenWithProps}
                            </main>
                            <Footer
                                twitter={siteMetadata.twitter}
                                linkedin={siteMetadata.linkedin}
                                github={siteMetadata.github}
                                youtube={siteMetadata.youtube}
                            />
                        </div>
                    </>
                )}
            />
        );
    }
}

const detailsQuery = graphql `
    query DefaultSEOQuery {
        site {
            siteMetadata {
                baseTitle
                title
                description
                author
                keywords
                host
                twitter
                linkedin
                github
                youtube
            }
        }

        file(name: { eq: "og-image" }) {
            publicURL
        }
    }
`;

export default Layout;
