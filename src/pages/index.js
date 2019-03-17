import React from 'react';
import { Link } from 'gatsby';

import PastIcon from '../icons/back-to-the-future.svg';
import FutureIcon from '../icons/horse.svg';
import homeStyles from './home.module.sass';

export default () => (
    <section className={homeStyles.container}>
        <h1>You're welcome to see</h1>

        <div className={homeStyles.boxContainer}>
            <Link to="/past-work/" className={homeStyles.box}>
                <h3>Past Work</h3>
                <span role="img" aria-label="back to future time machine">
                    <PastIcon />
                </span>
            </Link>
            <Link to="/future-work/" className={homeStyles.box}>
                <h3>Future work</h3>
                <span role="img" aria-label="chess horse piece">
                    <FutureIcon />
                </span>
            </Link>
        </div>
    </section>
);
