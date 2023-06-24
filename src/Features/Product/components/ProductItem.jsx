import { Box, Typography } from '@mui/material';
import { STATIC_HOST, THUMBNAIL_PLACEHODER } from 'constants';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

ProductItem.propTypes = {
    product: PropTypes.object,
};
ProductItem.defaultProps = {
    product: []
}
function ProductItem({ product }) {
    const thumbnailUrl = product.thumbnail && product.thumbnail?.url ?
        `${STATIC_HOST}${product.thumbnail?.url}` : THUMBNAIL_PLACEHODER
    const history = useHistory()
    const handleOnClick = () => {
        history.push(`/products/${product.id}`)
    }
    return (
        <div onClick={handleOnClick} style={{ cursor: 'pointer' }}>
            <Box p={1} minHeight="215px" >
                <Box p={1}><img src={thumbnailUrl} alt={product.name} width="100%" /></Box>
                <Typography>{product.name}</Typography>
                <Typography>
                    <Box component="span" fontSize="16px" fontWeight="600" >
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.salePrice)}
                    </Box>

                    {product.promotionPercent > 0 ? ` -${product.promotionPercent}%` : ''}</Typography>
            </Box>
        </div>

    );
}

export default ProductItem;