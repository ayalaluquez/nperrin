import React from 'react';
import { Link } from 'gatsby';

import IconButton from '../../IconButton';
import HamburgerIcon from '../../../icons/hamburger-solid.svg';
import headerStyles from './header.module.sass';

export default ({ onShowSideMenu, title }) => (
    <header className={headerStyles.container}>
        <div>
            <Link to="/">{title}</Link>
            <IconButton onClick={onShowSideMenu} description="abrir menú">
                <HamburgerIcon />
            </IconButton>
        </div>
    </header>
);
