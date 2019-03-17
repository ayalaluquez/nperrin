import React from 'react';

export const HTMLContent = ({ content, ...props }) => (
    <div
        {...props}
        dangerouslySetInnerHTML={{ __html: content }}
        className={`${props.className || ''}`}
    />
);

export default ({ content, ...props }) => (
    <div
        {...props}
        className={`${props.className || ''}`}
    >
        {content}
    </div>
);
