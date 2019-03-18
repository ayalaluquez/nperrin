import React from 'react';
import Layout from './src/components/Layout';

export default ({ element, props }) => (
    <Layout {...props}>
        {element}
    </Layout>
);
