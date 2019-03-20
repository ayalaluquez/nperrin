import React from 'react';
import { Link } from 'gatsby';

import widthStyles from '../commons/width.module.sass';

export default () => (
    <section className={widthStyles.container}>
        <h1>Page not found</h1>
        <Link to="/" style={{fontSize: '18px'}}>Go back home</Link>
    </section>
);
