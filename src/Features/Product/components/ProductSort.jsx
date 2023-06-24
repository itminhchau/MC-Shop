import { Box, Tab, Tabs } from '@mui/material';
import PropTypes from 'prop-types';

ProductSort.propTypes = {
    onChange: PropTypes.func.isRequired,
    currentSort: PropTypes.string.isRequired,
};

function ProductSort(props) {
    const { onChange, currentSort } = props

    const handleChange = (event, newValue) => {
        if (onChange) {
            onChange(newValue)
        }
    }
    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={currentSort} onChange={handleChange} aria-label="disabled tabs example" indicatorColor='primary' textColor='primary'>
                    <Tab label="Sắp xếp theo giá tăng dần" value="salePrice:ASC" />
                    <Tab label="Sắp xếp theo giá giảm dần" value="salePrice:DESC" />
                </Tabs>
            </Box>

        </Box>
    );
}

export default ProductSort;