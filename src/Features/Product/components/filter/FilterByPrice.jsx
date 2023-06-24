import { Box, Button, TextField, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';

FilterByPrice.propTypes = {
    onChange: PropTypes.func.isRequired,
};

function FilterByPrice({ onChange }) {
    const [values, setValues] = useState({
        salePrice_gte: 0,
        salePrice_lte: 0
    })

    const handleOnchange = (e) => {
        const { name, value } = e.target
        setValues(prevValue => ({
            ...prevValue,
            [name]: value
        }))
    }
    const handleSubmit = () => {
        if (onChange) {
            onChange(values)
        }
    }
    return (
        <Box sx={{ padding: '8px' }}>
            <Typography>Giá</Typography>
            <Box sx={{ display: 'flex', gap: "8px", alignItems: 'center' }}>
                <TextField sx={{ marginBottom: '8px' }} name='salePrice_gte' value={values.salePrice_gte} onChange={handleOnchange} />
                <span>-</span>
                <TextField sx={{ marginBottom: '8px' }} name='salePrice_lte' value={values.salePrice_lte} onChange={handleOnchange} />
            </Box>
            <Button variant='outlined' color='primary' onClick={handleSubmit}>Submit</Button>
        </Box>
    );
}

export default FilterByPrice;