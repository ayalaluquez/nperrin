import React from 'react';

import widthStyles from '../commons/width.module.sass';

export default ({ location }) => {
    let error = '🤷‍♂️';
    if(/^\?error=.*/i.test(location.search)) {
        error = location.search.replace(/^\?error=(.*)/i, '$1');
    }
    return (
        <section className={widthStyles.container}>
            <h1>Seems there was an error <span role="img" aria-label="smiley with a drop of sweat">😅</span></h1>
            <pre>{error}</pre>
            <p>Norman will be warned, don't worry.</p>
        </section>
    );
};
