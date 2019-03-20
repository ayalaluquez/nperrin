import React from 'react';

import iconButtonStyles from './iconButton.module.sass';

export default ({ children, description, ...props }) => (
    <button
        {...props}
        className={`${iconButtonStyles.container} ${props.className || ''}`}
    >
        <span role="img" aria-label={description}>
            {children}
        </span>
    </button>
);
