import React from 'react';
import PropTypes from 'prop-types';
import DOMPurify from 'dompurify';
import { Paper } from '@mui/material';

ProductDescription.propTypes = {
    product: PropTypes.object,
};

function ProductDescription({ product }) {
    const safeDescription = DOMPurify.sanitize(product.description)
    const mark = { __html: safeDescription }
    return (
        <Paper elevation={0} sx={{ padding: '15px' }}>
            <div dangerouslySetInnerHTML={mark} />
        </Paper>

    );
}

export default ProductDescription;