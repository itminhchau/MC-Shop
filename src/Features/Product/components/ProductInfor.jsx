import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { formatPrice } from 'constants';

ProductInfor.propTypes = {
    product: PropTypes.object.isRequired,
};
const useStyles = makeStyles({
    root: {
        padding: '8px',
    },
    name: {
        marginBottom: '16px!important',
    },
    price: {
        display: 'flex',
        alignItems: 'center'
    }
})

function ProductInfor({ product }) {
    const { name, shortDescription, originalPrice, salePrice, promotionPercent } = product;
    const classes = useStyles()
    return (
        <Box className={classes.root}>
            <Typography component="h1" variant='h4' className={classes.name}>{name}</Typography>
            <Typography>	&nbsp;	&nbsp;{shortDescription}</Typography>
            <Box className={classes.price} sx={{ margin: '16px 0' }}>
                <Typography sx={{ fontSize: '24px', fontWeight: 600, }}>{formatPrice(originalPrice)}&nbsp;</Typography>
                <Typography sx={{ textDecoration: 'line-through' }}>{formatPrice(salePrice)}&nbsp;</Typography>
                <Typography>&nbsp;&nbsp;- {promotionPercent}%</Typography>

            </Box>
        </Box>
    );
}

export default ProductInfor;