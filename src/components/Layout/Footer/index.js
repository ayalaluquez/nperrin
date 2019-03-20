import React from 'react';
import { Link } from 'gatsby';

import ExtLink from '../../ExtLink';
import TwitterIcon from '../../../icons/twitter-brands.svg';
import LinkedinIcon from '../../../icons/linkedin-in-brands.svg';
import GithubIcon from '../../../icons/github-brands.svg';
import YoutubeIcon from '../../../icons/youtube-brands.svg';

import footerStyles from './footer.module.sass';
import widthStyles from '../../../commons/width.module.sass';

export default ({ twitter, linkedin, github, youtube }) => (
    <footer className={footerStyles.container}>
        <div className={widthStyles.container}>
            <div className={footerStyles.social}>
                <ExtLink href={twitter}>
                    <span role="img" aria-label="twitter">
                        <TwitterIcon />
                    </span>
                </ExtLink>
                <ExtLink href={linkedin}>
                    <span role="img" aria-label="linkedin">
                        <LinkedinIcon />
                    </span>
                </ExtLink>
                <ExtLink href={github}>
                    <span role="img" aria-label="github">
                        <GithubIcon />
                    </span>
                </ExtLink>
                <ExtLink href={youtube}>
                    <span role="img" aria-label="youtube">
                        <YoutubeIcon />
                    </span>
                </ExtLink>
            </div>
            <Link to="/credits" activeStyle={{textDecoration: 'underline'}}>Credits</Link>
        </div>
    </footer>
);
