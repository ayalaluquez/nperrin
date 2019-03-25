import React from 'react';
import { Link } from 'gatsby';

import ExtLink from '../../ExtLink';
import GithubIcon from '../../../icons/github-brands.svg';
import BonsaiIcon from '../../../icons/bonsai.svg';
import headerStyles from './header.module.sass';

export default ({ title, base, source }) => (
    <header className={headerStyles.container}>
        <div>
            <Link to="/">{title}</Link>
            <div className={headerStyles.links}>
                <a href={base}>
                    <span role="img" aria-label="root page">
                        <BonsaiIcon />
                    </span>
                </a>
                <ExtLink href={source}>
                    <span role="img" aria-label="github source code">
                        <GithubIcon />
                    </span>
                </ExtLink>
            </div>
        </div>
    </header>
);