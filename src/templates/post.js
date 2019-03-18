import React from 'react';

import { HTMLContent } from '../components/Content';
import widthStyles from '../commons/width.module.sass';
import postStyles from './post.module.sass';

export default ({ pageContext: { title, date, content } }) => (
    <section className={`${widthStyles.container} ${postStyles.container}`}>
        <h1>{title}</h1>
        <p className={postStyles.date}>{new Date(date).toLocaleDateString()}</p>
        <HTMLContent content={content} />
    </section>
);
