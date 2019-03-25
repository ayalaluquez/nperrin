import React from 'react';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';

import Footer from './Footer';
import Header from './Header';
import '../../commons/all.sass';

export default ({ children }) => (
    <StaticQuery
        query={detailsQuery}
        render={({ site: { siteMetadata } }) => (
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
                        { property: 'og:image', content: '/og-image.pjg' },
                        { property: 'og:image:type', content: 'image/jpg' },
                        { property: 'og:url', content: siteMetadata.host },
                        { name: 'twitter:card', content: 'summary' },
                        { name: 'twitter:title', content: siteMetadata.title },
                        { name: 'twitter:description', content: siteMetadata.description },
                        { name: 'twitter:creator', content: siteMetadata.author },
                        { name: 'twitter:image', content: '/og-image.jpg' },
                    ]}
                />
                <Header
                    title={siteMetadata.title}
                    base={siteMetadata.rootHost}
                    source={siteMetadata.source}
                />
                <main>
                    {children}
                </main>
                <Footer
                    twitter={siteMetadata.twitter}
                    linkedin={siteMetadata.linkedin}
                    github={siteMetadata.github}
                    youtube={siteMetadata.youtube}
                />
            </div>
        )}
    />
);

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
                rootHost
                twitter
                linkedin
                github
                youtube
                source
            }
        }
    }
`;
